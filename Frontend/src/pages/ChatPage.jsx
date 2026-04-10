import { useEffect, useRef, useState, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import Sidebar from '../components/chat/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
const apiRequest = async () => ({ chats: [], messages: [], chat: { id: Date.now().toString(), title: 'New Chat' } });
import '../styles/ChatPage.css';

// ─── ChatPage ─────────────────────────────────────────────────────────────────
// Manages sidebar state, active chat, and message flow.
// All chats and messages are persisted to Supabase via the backend.
export default function ChatPage() {
  const { getToken } = useAuth();

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messagesByChat, setMessagesByChat] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);        // mobile drawer
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop collapse
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 960px)').matches);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Track viewport changes (mobile vs desktop)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 960px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Mobile: lock scroll when sidebar drawer is open
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 960px)').matches;
    document.body.style.overflow = mobile && sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  // ─── Load chats from DB on mount ────────────────────────────────────────────
  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoadingChats(true);
        const { chats: dbChats } = await apiRequest(getToken, '/api/chats');
        // Normalize for the UI: add a preview placeholder
        const normalized = (dbChats || []).map((c) => ({
          id: c.id,
          title: c.title,
          preview: 'Click to load messages…',
          updated: new Date(c.created_at).toLocaleDateString(),
        }));
        setChats(normalized);
      } catch (err) {
        console.error('Failed to load chats:', err.message);
      } finally {
        setLoadingChats(false);
      }
    };

    fetchChats();
  }, [getToken]);

  // ─── Load messages when active chat changes ──────────────────────────────────
  useEffect(() => {
    if (!activeChatId) return;

    // If messages already cached in state, skip fetch
    if (messagesByChat[activeChatId]) return;

    const fetchMessages = async () => {
      try {
        setLoadingMessages(true);
        const { messages: dbMessages } = await apiRequest(
          getToken,
          `/api/messages/${activeChatId}`
        );
        const normalized = (dbMessages || []).map((m) => ({
          id: m.id,
          role: m.role,
          text: m.content,
          timestamp: new Date(m.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }));
        setMessagesByChat((prev) => ({ ...prev, [activeChatId]: normalized }));
      } catch (err) {
        console.error('Failed to load messages:', err.message);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [activeChatId, getToken]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeChat = chats.find((chat) => chat.id === activeChatId) ?? null;
  const messages = activeChatId ? (messagesByChat[activeChatId] ?? []) : [];

  // ─── Select chat (mobile: close drawer) ─────────────────────────────────────
  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setSidebarOpen(false);
  };

  // ─── Create new chat in DB ───────────────────────────────────────────────────
  const handleNewChat = async () => {
    try {
      const { chat } = await apiRequest(getToken, '/api/chats', {
        method: 'POST',
        body: JSON.stringify({ title: 'New Chat' }),
      });

      const newChat = {
        id: chat.id,
        title: chat.title,
        preview: 'Start asking your doubt…',
        updated: 'Now',
      };

      setChats((prev) => [newChat, ...prev]);
      setMessagesByChat((prev) => ({ ...prev, [chat.id]: [] }));
      setActiveChatId(chat.id);
      setSidebarOpen(false);
    } catch (err) {
      console.error('Failed to create chat:', err.message);
    }
  };

  // ─── Rename chat ─────────────────────────────────────────────────────────────
  const handleRenameChat = useCallback(async (id, newTitle) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    // Optimistic UI update first
    setChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: trimmed } : c))
    );

    try {
      await apiRequest(getToken, `/api/chats/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title: trimmed }),
      });
    } catch (err) {
      console.error('Failed to rename chat:', err.message);
      // No rollback needed — it's a title, user can retry
    }
  }, [getToken]);

  // ─── Delete chat ─────────────────────────────────────────────────────────────
  const handleDeleteChat = useCallback(async (id) => {
    // Optimistic UI update
    setChats((prev) => prev.filter((c) => c.id !== id));
    setMessagesByChat((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (activeChatId === id) setActiveChatId(null);

    try {
      await apiRequest(getToken, `/api/chats/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete chat:', err.message);
    }
  }, [getToken, activeChatId]);

  // ─── Toggle sidebar ──────────────────────────────────────────────────────────
  const handleToggleSidebar = () => {
    if (isMobile) setSidebarOpen((prev) => !prev);
    else setSidebarCollapsed((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    if (isMobile) setSidebarOpen(false);
    else setSidebarCollapsed(true);
  };

  // ─── Send message ─────────────────────────────────────────────────────────────
  const handleSendMessage = async (content, semester, model) => {
    const text = content.trim();
    if (!text || isAiTyping) return;

    // Auto-create a chat if none is active
    let chatId = activeChatId;
    if (!chatId) {
      try {
        const title = text.length > 30 ? text.slice(0, 30) + '…' : text;
        const { chat } = await apiRequest(getToken, '/api/chats', {
          method: 'POST',
          body: JSON.stringify({ title }),
        });
        chatId = chat.id;
        const newChat = {
          id: chat.id,
          title: chat.title,
          preview: text,
          updated: 'Now',
        };
        setChats((prev) => [newChat, ...prev]);
        setMessagesByChat((prev) => ({ ...prev, [chat.id]: [] }));
        setActiveChatId(chat.id);
      } catch (err) {
        console.error('Failed to auto-create chat:', err.message);
        return;
      }
    }

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message to UI immediately
    const userMsg = {
      id: `local-user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: now,
    };

    setMessagesByChat((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] ?? []), userMsg],
    }));
    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, preview: text, updated: 'Now' } : c))
    );
    setIsAiTyping(true);

    const selectedModel = model || 'qwen3:8b';

    try {
      // 1. Get AI reply (no auth needed for the AI route)
      const aiRes = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, model: selectedModel }),
      });
      const aiData = await aiRes.json();

      if (!aiRes.ok) {
        throw new Error(aiData.error || 'AI service error');
      }

      const aiReply = aiData.reply;
      const aiTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // 2. Add AI message to UI
      const aiMsg = {
        id: `local-ai-${Date.now()}`,
        role: 'assistant',
        text: aiReply,
        timestamp: aiTimestamp,
      };
      setMessagesByChat((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] ?? []), aiMsg],
      }));

      // 3. Persist both messages to Supabase (fire-and-forget, don't block UI)
      Promise.all([
        apiRequest(getToken, '/api/messages', {
          method: 'POST',
          body: JSON.stringify({ chat_id: chatId, role: 'user', content: text }),
        }),
        apiRequest(getToken, '/api/messages', {
          method: 'POST',
          body: JSON.stringify({ chat_id: chatId, role: 'assistant', content: aiReply }),
        }),
      ]).catch((err) => console.error('Failed to persist messages:', err.message));

      // 4. Update chat title if it was auto-titled (backend also does this, but keep UI in sync)
      const currentChat = chats.find((c) => c.id === chatId);
      if (currentChat?.title === 'New Chat' || currentChat?.title?.endsWith('…')) {
        const autoTitle = text.length > 30 ? text.slice(0, 30) + '…' : text;
        setChats((prev) =>
          prev.map((c) => (c.id === chatId ? { ...c, title: autoTitle } : c))
        );
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errMsg = {
        id: `local-err-${Date.now()}`,
        role: 'assistant',
        text: `⚠️ ${error.message || 'Something went wrong. Please try again.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessagesByChat((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] ?? []), errMsg],
      }));
    } finally {
      setIsAiTyping(false);
    }
  };

  return (
    <main className={`chat-page ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        isOpen={sidebarOpen}
        isDesktopCollapsed={sidebarCollapsed}
        loadingChats={loadingChats}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onClose={handleCloseSidebar}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
      />

      <button
        type="button"
        className={`chat-page-overlay ${sidebarOpen ? 'show' : ''}`}
        aria-label="Close menu overlay"
        onClick={() => setSidebarOpen(false)}
      />

      <section className="chat-main">
        <ChatWindow
          chatTitle={activeChat?.title ?? ''}
          messages={messages}
          onSendMessage={handleSendMessage}
          onToggleSidebar={handleToggleSidebar}
          isAiTyping={isAiTyping || loadingMessages}
          isSidebarOpen={isMobile ? sidebarOpen : !sidebarCollapsed}
        />
      </section>
    </main>
  );
}

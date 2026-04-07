import { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/chat/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import '../styles/ChatPage.css';


// Chat page: manages sidebar state, active chat and message simulation
export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messagesByChat, setMessagesByChat] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);        // mobile drawer
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop collapse
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 960px)').matches);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Track viewport changes (mobile vs desktop)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 960px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  const chatCounterRef = useRef(1);

  // Mobile: lock scroll when sidebar drawer is open
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 960px)').matches;
    document.body.style.overflow = isMobile && sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const activeChat = chats.find((chat) => chat.id === activeChatId) ?? null;
  const messages = activeChatId ? (messagesByChat[activeChatId] ?? []) : [];

  // Mobile: close drawer on chat switch
  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setSidebarOpen(false);
  };

  const handleNewChat = () => {
    const id = `chat-${Date.now()}`;
    const title = `New Chat ${chatCounterRef.current}`;
    chatCounterRef.current += 1;

    setChats((prev) => [
      { id, title, preview: 'Start asking your doubt...', updated: 'Now' },
      ...prev,
    ]);
    setMessagesByChat((prev) => ({ ...prev, [id]: [] }));
    setActiveChatId(id);
    setSidebarOpen(false);
  };

  // Toggle sidebar: mobile = open drawer, desktop = collapse
  const handleToggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  const handleCloseSidebar = () => {
    // On desktop: collapse the sidebar. On mobile: close the drawer.
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarCollapsed(true);
    }
  };

  // Send message to actual backend via fetch
  const handleSendMessage = async (content, semester) => {
    const text = content.trim();
    if (!text || isAiTyping) return;

    // Auto-create a chat if none is active
    let chatId = activeChatId;
    if (!chatId) {
      chatId = `chat-${Date.now()}`;
      const title = text.length > 30 ? text.slice(0, 30) + '…' : text;
      chatCounterRef.current += 1;
      setChats((prev) => [
        { id: chatId, title, preview: text, updated: 'Now' },
        ...prev,
      ]);
      setMessagesByChat((prev) => ({ ...prev, [chatId]: [] }));
      setActiveChatId(chatId);
    }

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage = {
      id: `${chatId}-user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: now,
    };

    setMessagesByChat((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] ?? []), userMessage],
    }));
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, preview: text, updated: 'Now' } : chat,
      ),
    );

    setIsAiTyping(true);

    try {
      const response = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to fetch response from backend");
      }

      const aiMessage = {
        id: `${chatId}-assistant-${Date.now()}`,
        role: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessagesByChat((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] ?? []), aiMessage],
      }));
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage = {
        id: `${chatId}-error-${Date.now()}`,
        role: 'assistant',
        text: `Error: ${error.message}. Please try again later.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessagesByChat((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] ?? []), errorMessage],
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
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onClose={handleCloseSidebar}
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
          isAiTyping={isAiTyping}
          isSidebarOpen={isMobile ? sidebarOpen : !sidebarCollapsed}
        />
      </section>
    </main>
  );
}

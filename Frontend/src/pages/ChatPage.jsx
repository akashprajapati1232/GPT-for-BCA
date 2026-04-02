import { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/chat/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import '../styles/ChatPage.css';

// Mock AI reply based on keywords (backend integration aane par replace hoga)
function buildMockReply(question, semester) {
  const text = question.toLowerCase();
  const semInfo = semester ? ` (Semester ${semester})` : '';

  if (text.includes('mcq')) {
    return `Great choice${semInfo}! I can generate topic-wise MCQs with answers and short explanations to help you with quick revision. Which subject should I start with?`;
  }

  if (text.includes('syllabus') || text.includes('semester')) {
    return `I can map your questions semester-wise and subject-wise${semInfo}. Tell me your semester and I will break the syllabus into daily study goals.`;
  }

  if (text.includes('notes') || text.includes('short')) {
    return `Here are concise notes-style responses: definition, key points, example, and the likely exam question pattern. What subject${semInfo}?`;
  }

  if (text.includes('dbms') || text.includes('database')) {
    return `DBMS covers Normalization (1NF→BCNF), ER Diagrams, SQL queries, and Transaction management${semInfo}. Which topic do you want to dive into?`;
  }

  if (text.includes('java') || text.includes('oop')) {
    return `Java OOP pillars: Encapsulation, Inheritance, Polymorphism, and Abstraction${semInfo}. I can give exam-focused definitions, code examples, or MCQs. Where should we start?`;
  }

  if (text.includes('network') || text.includes('osi')) {
    return `Computer Networks key topics${semInfo}: OSI model (7 layers), TCP/IP, IP addressing, routing protocols. Want a quick-revision table or detailed notes?`;
  }

  if (text.includes('os') || text.includes('operating')) {
    return `Operating Systems covers CPU scheduling (FCFS, SJF, Round Robin), memory management, deadlocks, and file systems${semInfo}. Which area do you want covered?`;
  }

  return `Nice question${semInfo}! I will keep the explanation simple, accurate, and focused on what matters most for your BCA exams. Could you share a bit more context?`;
}

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

  // Send message + delayed mock AI response with typing state
  const handleSendMessage = (content, semester) => {
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

    // Simulate AI delay (600–900ms)
    const delay = 600 + Math.random() * 300;
    window.setTimeout(() => {
      const aiMessage = {
        id: `${chatId}-assistant-${Date.now()}`,
        role: 'assistant',
        text: buildMockReply(text, semester),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessagesByChat((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] ?? []), aiMessage],
      }));
      setIsAiTyping(false);
    }, delay);
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

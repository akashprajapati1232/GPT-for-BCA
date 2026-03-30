import { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/chat/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import '../styles/ChatPage.css';

// Starter history taaki UI first load par empty na lage.
const starterChats = [
  {
    id: 'chat-1',
    title: 'Operating Systems Revision',
    preview: 'CPU scheduling, deadlocks, and memory management',
    updated: '2m ago',
  },
  {
    id: 'chat-2',
    title: 'DBMS Practice Session',
    preview: 'Normalization forms and SQL query planning',
    updated: '15m ago',
  },
  {
    id: 'chat-3',
    title: 'Java OOP Doubts',
    preview: 'Encapsulation, abstraction, and inheritance',
    updated: '1h ago',
  },
  {
    id: 'chat-4',
    title: 'Computer Networks Quick Notes',
    preview: 'OSI vs TCP/IP and top exam-ready points',
    updated: 'Yesterday',
  },
];

const starterMessages = {
  'chat-1': [
    {
      id: 'c1-m1',
      role: 'assistant',
      text: 'Hi! I can help you revise Operating Systems quickly. Which topic should we start with?',
      timestamp: '10:01 AM',
    },
    {
      id: 'c1-m2',
      role: 'user',
      text: 'Explain CPU scheduling in simple words with key algorithms.',
      timestamp: '10:02 AM',
    },
    {
      id: 'c1-m3',
      role: 'assistant',
      text: 'CPU scheduling decides which process gets CPU time next. For exams, remember FCFS, SJF, Priority, and Round Robin with one-line pros/cons.',
      timestamp: '10:02 AM',
    },
  ],
  'chat-2': [
    {
      id: 'c2-m1',
      role: 'assistant',
      text: 'Ready for DBMS practice. Ask me for MCQs, short notes, or SQL examples.',
      timestamp: '9:45 AM',
    },
  ],
  'chat-3': [
    {
      id: 'c3-m1',
      role: 'assistant',
      text: 'Let us clear Java OOP step by step. Want concept definitions or practical examples first?',
      timestamp: '9:10 AM',
    },
  ],
  'chat-4': [
    {
      id: 'c4-m1',
      role: 'assistant',
      text: 'I prepared quick CN notes. Ask any topic and I will keep answers exam-focused.',
      timestamp: 'Yesterday',
    },
  ],
};

// Dummy AI reply helper jo keyword ke basis par quick response deta hai.
function buildMockReply(question) {
  const text = question.toLowerCase();

  if (text.includes('mcq')) {
    return 'Great choice. I can generate topic-wise MCQs with answers and short explanations to help quick revision.';
  }

  if (text.includes('syllabus') || text.includes('semester')) {
    return 'I can map your question semester-wise and subject-wise. Tell me your semester and I will break the syllabus into daily study goals.';
  }

  if (text.includes('notes') || text.includes('short')) {
    return 'Here are concise notes style responses: definition, key points, example, and likely exam question pattern.';
  }

  return 'Nice question. I will keep the explanation simple, accurate, and focused on what matters most for your BCA exams.';
}

// Chat page me sidebar state, active chat aur message simulation manage hota hai.
export default function ChatPage() {
  const [chats, setChats] = useState(starterChats);
  const [activeChatId, setActiveChatId] = useState(starterChats[0].id);
  const [messagesByChat, setMessagesByChat] = useState(starterMessages);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatCounterRef = useRef(starterChats.length + 1);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 960px)').matches;
    document.body.style.overflow = isMobile && sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const activeChat = chats.find((chat) => chat.id === activeChatId) ?? chats[0];
  const messages = messagesByChat[activeChatId] ?? [];

  // Chat switch karte hi mobile drawer close kar dete hain.
  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setSidebarOpen(false);
  };

  const handleNewChat = () => {
    const id = `chat-${Date.now()}`;
    const title = `New Chat ${chatCounterRef.current}`;
    const welcomeMessage = {
      id: `${id}-welcome`,
      role: 'assistant',
      text: 'New chat started. Ask me anything from your BCA subjects and I will help you step by step.',
      timestamp: 'Now',
    };

    chatCounterRef.current += 1;

    setChats((prev) => [
      {
        id,
        title,
        preview: 'Start asking your doubt...',
        updated: 'Now',
      },
      ...prev,
    ]);
    setMessagesByChat((prev) => ({
      ...prev,
      [id]: [welcomeMessage],
    }));
    setActiveChatId(id);
    setSidebarOpen(false);
  };

  // User message append + delayed mock AI response ka flow.
  const handleSendMessage = (content) => {
    const text = content.trim();
    if (!text) {
      return;
    }

    const chatId = activeChatId;
    const userMessage = {
      id: `${chatId}-user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: 'Now',
    };

    setMessagesByChat((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] ?? []), userMessage],
    }));
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
            ...chat,
            preview: text,
            updated: 'Now',
          }
          : chat,
      ),
    );

    window.setTimeout(() => {
      const aiMessage = {
        id: `${chatId}-assistant-${Date.now()}`,
        role: 'assistant',
        text: buildMockReply(text),
        timestamp: 'Now',
      };

      setMessagesByChat((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] ?? []), aiMessage],
      }));
    }, 650);
  };

  return (
    <main className="chat-page">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />

      <button
        type="button"
        className={`chat-page-overlay ${sidebarOpen ? 'show' : ''}`}
        aria-label="Close menu overlay"
        onClick={() => setSidebarOpen(false)}
      />

      <section className="chat-main">
        <ChatWindow
          chatTitle={activeChat?.title ?? 'GPT for BCA'}
          messages={messages}
          onSendMessage={handleSendMessage}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
      </section>
    </main>
  );
}

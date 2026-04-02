import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import MessageInput from './MessageInput';
import faviconImg from '../../assets/favicon.png';
import '../../styles/ChatWindow.css';

// Typing animation hook — reveals text word-by-word
function useTypingEffect(text, isActive, onDone) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(!isActive);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    setDisplayed('');
    setDone(false);

    const words = text.split(' ');
    let idx = 0;
    let acc = '';

    const step = () => {
      if (idx < words.length) {
        acc += (idx === 0 ? '' : ' ') + words[idx];
        idx += 1;
        setDisplayed(acc);
        rafRef.current = window.setTimeout(step, 38);
      } else {
        setDone(true);
        onDone?.();
      }
    };

    rafRef.current = window.setTimeout(step, 60);

    return () => {
      if (rafRef.current) clearTimeout(rafRef.current);
    };
  }, [text, isActive]);

  return { displayed, done };
}

// A single AI message bubble with typing animation
function AssistantBubble({ message, animateTyping }) {
  const { displayed, done } = useTypingEffect(message.text, animateTyping, undefined);

  return (
    <article className="chat-message-row assistant">
      <span className="chat-avatar">
        <img src={faviconImg} alt="GPT for BCA" className="chat-avatar-img" />
      </span>
      <div className="chat-bubble">
        <p>
          {displayed}
          {animateTyping && !done && <span className="typing-cursor" aria-hidden="true" />}
        </p>
        {done && <span className="chat-time">{message.timestamp}</span>}
      </div>
    </article>
  );
}

// Typing indicator dots while waiting for AI response
function TypingIndicator() {
  return (
    <article className="chat-message-row assistant">
      <span className="chat-avatar">
        <img src={faviconImg} alt="GPT for BCA" className="chat-avatar-img" />
      </span>
      <div className="chat-bubble">
        <div className="typing-dots" aria-label="AI is thinking">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </article>
  );
}

// Prompt chips for the empty state
const SUGGESTION_CHIPS = [
  'Explain DBMS normalization',
  'Java OOP concepts with examples',
  'OS scheduling algorithms',
  'Computer Networks OSI layers',
  'Data Structures for BCA exams',
];

// Chat window: header + messages + input area
export default function ChatWindow({
  chatTitle,
  messages,
  onSendMessage,
  onToggleSidebar,
  isAiTyping,
  isSidebarOpen,
}) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const endRef = useRef(null);
  // Track which message id is the latest AI message to animate
  const lastAssistantIdRef = useRef(null);
  const [animatingId, setAnimatingId] = useState(null);

  const displayName =
    user?.fullName ||
    user?.firstName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    'BCA Student';

  const nameParts = displayName.trim().split(/\s+/).filter(Boolean);
  const initials = nameParts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'US';

  const handleLogout = async () => {
    setDropdownOpen(false);
    await signOut({ redirectUrl: '/' });
  };

  const handleProfile = () => {
    setDropdownOpen(false);
    navigate('/chat/profile');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // When a new assistant message arrives, flag it for animation
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.role === 'assistant' && lastMsg.id !== lastAssistantIdRef.current) {
      lastAssistantIdRef.current = lastMsg.id;
      setAnimatingId(lastMsg.id);
    }
  }, [messages]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isAiTyping]);

  const isEmpty = messages.length === 0 && !isAiTyping;

  return (
    <section className="chat-window">
      {/* Header */}
      <header className="chat-window-header">
        {/* Toggle button — hidden when sidebar is open */}
        {!isSidebarOpen && (
          <button
            type="button"
            id="sidebar-toggle-btn"
            className="chat-window-toggle-btn"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
        )}
        <div className="chat-window-heading">
          <h1>{chatTitle || 'GPT for BCA'}</h1>
          <p>Your AI-powered BCA study assistant</p>
        </div>

        {/* User avatar + dropdown on the right */}
        <div className="chat-user-menu chat-header-user-menu" ref={dropdownRef}>
          <button
            type="button"
            className="chat-user-avatar-btn"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-label="User menu"
            aria-expanded={dropdownOpen}
          >
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt={displayName} className="chat-user-avatar-img" />
            ) : (
              <span className="chat-user-avatar-initials">{initials}</span>
            )}
            <span className="chat-user-avatar-caret" aria-hidden="true">
              {dropdownOpen ? '▲' : '▼'}
            </span>
          </button>

          {dropdownOpen && (
            <div className="chat-user-dropdown" role="menu">
              <div className="chat-user-dropdown-header">
                <span className="chat-user-dropdown-name">{displayName}</span>
                <span className="chat-user-dropdown-role">BCA Student</span>
              </div>
              <div className="chat-user-dropdown-divider" />
              <button
                type="button"
                className="chat-user-dropdown-item"
                role="menuitem"
                onClick={handleProfile}
              >
                <span className="chat-user-dropdown-icon">👤</span>
                Profile
              </button>
              <button
                type="button"
                className="chat-user-dropdown-item logout"
                role="menuitem"
                onClick={handleLogout}
              >
                <span className="chat-user-dropdown-icon">🚪</span>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Messages */}
      <div className="chat-window-messages" role="log" aria-live="polite">
        {isEmpty ? (
          <div className="chat-empty-state">
            <img src={faviconImg} alt="GPT for BCA" className="chat-empty-logo" />
            <h2 className="chat-empty-title">How can I help you today?</h2>
            <p className="chat-empty-subtitle">
              Ask me anything from your BCA subjects — notes, MCQs, concepts, or exam tips.
            </p>
            <div className="chat-empty-chips">
              {SUGGESTION_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="chat-empty-chip"
                  onClick={() => onSendMessage(chip, '')}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => {
            if (message.role === 'user') {
              return (
                <article key={message.id} className="chat-message-row user">
                  <div className="chat-bubble">
                    <p>{message.text}</p>
                    <span className="chat-time">{message.timestamp}</span>
                  </div>
                  <span className="chat-avatar user">👨‍🎓</span>
                </article>
              );
            }

            return (
              <AssistantBubble
                key={message.id}
                message={message}
                animateTyping={message.id === animatingId}
              />
            );
          })
        )}

        {isAiTyping && <TypingIndicator />}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={onSendMessage} isAiTyping={isAiTyping} />
    </section>
  );
}

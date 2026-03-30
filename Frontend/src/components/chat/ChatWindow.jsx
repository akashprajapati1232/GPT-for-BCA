import { useEffect, useRef } from 'react';
import MessageInput from './MessageInput';
import '../../styles/ChatWindow.css';

// Chat header + messages list + input wrapper ka main layout component.
export default function ChatWindow({
  chatTitle,
  messages,
  onSendMessage,
  onToggleSidebar,
}) {
  const endRef = useRef(null);

  // Naya message aate hi auto-scroll latest message tak le jaata hai.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  return (
    <section className="chat-window">
      <header className="chat-window-header">
        <button
          type="button"
          className="chat-window-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar menu"
        >
          ☰
        </button>
        <div className="chat-window-heading">
          <h1>{chatTitle}</h1>
          <p>GPT for BCA Assistant</p>
        </div>
      </header>

      <div className="chat-window-messages" role="log" aria-live="polite">
        {messages.map((message) => (
          <article
            key={message.id}
            className={`chat-message-row ${message.role === 'user' ? 'user' : 'assistant'}`}
          >
            {message.role !== 'user' && <span className="chat-avatar">🤖</span>}
            <div className="chat-bubble">
              <p>{message.text}</p>
              <span className="chat-time">{message.timestamp}</span>
            </div>
            {message.role === 'user' && <span className="chat-avatar user">👨‍🎓</span>}
          </article>
        ))}
        <div ref={endRef} />
      </div>

      <MessageInput onSend={onSendMessage} />
    </section>
  );
}

import { useState } from 'react';
import '../../styles/MessageInput.css';

// Bottom input bar jahan se user message send karta hai.
export default function MessageInput({ onSend }) {
  const [message, setMessage] = useState('');

  // Empty message block karke valid text parent ko bhejte hain.
  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      return;
    }

    onSend(trimmed);
    setMessage('');
  };

  return (
    <div className="chat-input-wrap">
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input-field"
          placeholder="Ask anything about your BCA subjects..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-label="Type your message"
        />
        <button type="submit" className="chat-send-btn" aria-label="Send message">
          Send
        </button>
      </form>
    </div>
  );
}

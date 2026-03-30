import '../../styles/ChatItem.css';

export default function ChatItem({ chat, isActive, onClick }) {
  return (
    <button
      type="button"
      className={`chat-history-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
      aria-label={`Open ${chat.title}`}
    >
      <span className="chat-history-title">{chat.title}</span>
      <span className="chat-history-preview">{chat.preview}</span>
      <span className="chat-history-time">{chat.updated}</span>
    </button>
  );
}

import ChatItem from './ChatItem';
import faviconImg from '../../assets/favicon.png';
import '../../styles/Sidebar.css';

// Chat sidebar: history, quick actions, and close button.
export default function Sidebar({
  chats,
  activeChatId,
  isOpen,
  isDesktopCollapsed,
  loadingChats,
  onNewChat,
  onSelectChat,
  onClose,
  onRenameChat,
  onDeleteChat,
}) {

  return (
    <aside
      className={[
        'chat-sidebar',
        isOpen ? 'open' : '',
        isDesktopCollapsed ? 'desktop-collapsed' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Top: Brand + Close button */}
      <div className="chat-sidebar-top">
        <div className="chat-sidebar-brand">
          <img src={faviconImg} alt="GPT for BCA" className="chat-sidebar-brand-logo" />
          <span className="chat-sidebar-brand-text">GPT for BCA</span>
        </div>

        {/* Close sidebar button */}
        <button
          type="button"
          className="chat-sidebar-close-btn"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      {/* New Chat button */}
      <button type="button" className="chat-sidebar-new-btn" onClick={onNewChat}>
        <span>＋</span> New Chat
      </button>

      {/* Middle: MCQ + chat list */}
      <div className="chat-sidebar-middle">
        <button type="button" className="chat-sidebar-mcq-btn">
          🎯 Practice MCQs
        </button>

        {loadingChats ? (
          <div className="chat-sidebar-loading">
            <span className="chat-sidebar-loading-dot" />
            <span className="chat-sidebar-loading-dot" />
            <span className="chat-sidebar-loading-dot" />
          </div>
        ) : chats.length > 0 ? (
          <>
            <div className="chat-sidebar-section-head">
              <span>Recent Chats</span>
            </div>
            <div className="chat-sidebar-chat-list">
              {chats.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === activeChatId}
                  onClick={() => onSelectChat(chat.id)}
                  onRename={(newTitle) => onRenameChat(chat.id, newTitle)}
                  onDelete={() => onDeleteChat(chat.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="chat-sidebar-empty">No chats yet. Start a new one!</p>
        )}
      </div>
    </aside>
  );
}

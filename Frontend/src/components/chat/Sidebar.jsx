import ChatItem from './ChatItem';
import { useClerk, useUser } from '@clerk/clerk-react';
import '../../styles/Sidebar.css';

export default function Sidebar({
  chats,
  activeChatId,
  isOpen,
  onClose,
  onNewChat,
  onSelectChat,
}) {
  const { user } = useUser();
  const { signOut } = useClerk();

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
    await signOut({ redirectUrl: '/' });
  };

  return (
    <aside className={`chat-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="chat-sidebar-top">
        <div className="chat-sidebar-brand">
          <span className="chat-sidebar-brand-dot" />
          <span>GPT for BCA</span>
        </div>
        <button
          type="button"
          className="chat-sidebar-close"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      <button type="button" className="chat-sidebar-new-btn" onClick={onNewChat}>
        + New Chat
      </button>

      <div className="chat-sidebar-middle">
        <button type="button" className="chat-sidebar-mcq-btn">
          Practice MCQs
        </button>

        <div className="chat-sidebar-section-head">
          <span>All Chats</span>
        </div>

        <div className="chat-sidebar-chat-list">
          {chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isActive={chat.id === activeChatId}
              onClick={() => onSelectChat(chat.id)}
            />
          ))}
        </div>
      </div>

      <div className="chat-sidebar-bottom">
        <div className="chat-profile">
          <div className="chat-profile-avatar">{initials}</div>
          <div className="chat-profile-meta">
            <span className="chat-profile-name">{displayName}</span>
            <span className="chat-profile-role">Student</span>
          </div>
        </div>
        <button type="button" className="chat-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

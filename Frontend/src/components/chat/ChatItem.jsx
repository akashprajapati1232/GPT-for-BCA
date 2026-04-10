import { useState, useRef, useEffect } from 'react';
import '../../styles/ChatItem.css';

// Single chat row in the sidebar with hover 3-dot menu (rename / delete).
export default function ChatItem({ chat, isActive, onClick, onRename, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(chat.title);

  const menuRef = useRef(null);
  const inputRef = useRef(null);
  const dotsBtnRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) &&
          dotsBtnRef.current && !dotsBtnRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [menuOpen]);

  // Focus input when rename mode opens
  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  // Keep rename value in sync if parent updates title (e.g. auto-title)
  useEffect(() => {
    if (!isRenaming) setRenameValue(chat.title);
  }, [chat.title, isRenaming]);

  const handleDotsClick = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleRenameClick = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    setIsRenaming(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    onDelete();
  };

  const submitRename = () => {
    const trimmed = renameValue.trim();
    if (trimmed && trimmed !== chat.title) {
      onRename(trimmed);
    }
    setIsRenaming(false);
  };

  const handleRenameKeyDown = (e) => {
    if (e.key === 'Enter') submitRename();
    if (e.key === 'Escape') {
      setRenameValue(chat.title);
      setIsRenaming(false);
    }
  };

  return (
    <div className={`chat-history-item ${isActive ? 'active' : ''}`}>
      {/* Main click area */}
      <button
        type="button"
        className="chat-history-content"
        onClick={onClick}
        aria-label={`Open ${chat.title}`}
      >
        {isRenaming ? (
          <input
            ref={inputRef}
            className="chat-history-rename-input"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onBlur={submitRename}
            onKeyDown={handleRenameKeyDown}
            onClick={(e) => e.stopPropagation()}
            maxLength={100}
            aria-label="Rename chat"
          />
        ) : (
          <span className="chat-history-title">{chat.title}</span>
        )}
        <span className="chat-history-preview">{chat.preview}</span>
        <span className="chat-history-time">{chat.updated}</span>
      </button>

      {/* 3-dot menu button */}
      {!isRenaming && (
        <button
          ref={dotsBtnRef}
          type="button"
          className="chat-history-dots-btn"
          onClick={handleDotsClick}
          aria-label="Chat options"
          aria-expanded={menuOpen}
        >
          ⋮
        </button>
      )}

      {/* Dropdown menu */}
      {menuOpen && (
        <div ref={menuRef} className="chat-history-menu" role="menu">
          <button
            type="button"
            className="chat-history-menu-item"
            onClick={handleRenameClick}
            role="menuitem"
          >
            ✏️ Rename
          </button>
          <button
            type="button"
            className="chat-history-menu-item chat-history-menu-item--danger"
            onClick={handleDeleteClick}
            role="menuitem"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}

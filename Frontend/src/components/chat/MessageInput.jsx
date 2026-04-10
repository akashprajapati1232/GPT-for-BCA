import { useState } from 'react';
import '../../styles/MessageInput.css';

const SEMESTERS = [
  { value: '', label: 'All Semesters' },
  { value: '1', label: 'Semester 1' },
  { value: '2', label: 'Semester 2' },
  { value: '3', label: 'Semester 3' },
  { value: '4', label: 'Semester 4' },
  { value: '5', label: 'Semester 5' },
  { value: '6', label: 'Semester 6' },
];

const AI_MODELS = [
  { value: 'qwen3:8b', label: '⚡ Qwen3' },
  { value: 'phi3',     label: '🔬 Phi-3' },
];

// Bottom input bar with semester selector, model switcher and send button.
export default function MessageInput({ onSend, isAiTyping }) {
  const [message, setMessage]   = useState('');
  const [semester, setSemester] = useState('');
  const [model, setModel]       = useState('qwen3:8b'); // default model

  // Shift+Enter = newline, Enter = send
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  };

  const submitMessage = () => {
    const trimmed = message.trim();
    if (!trimmed || isAiTyping) return;
    onSend(trimmed, semester, model);
    setMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitMessage();
  };

  return (
    <div className="chat-input-wrap">
      <div className="chat-input-toolbar">
        {/* Semester filter */}
        <select
          id="semester-selector"
          className="chat-semester-select"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          aria-label="Select semester"
          title="Filter by semester"
        >
          {SEMESTERS.map((sem) => (
            <option key={sem.value} value={sem.value}>
              {sem.label}
            </option>
          ))}
        </select>

        {/* Model switcher */}
        <select
          id="model-selector"
          className="chat-model-select"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          aria-label="Select AI model"
          title="Switch AI model"
        >
          {AI_MODELS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit} id="chat-input-form">
        <input
          type="text"
          id="chat-message-input"
          className="chat-input-field"
          placeholder={
            semester
              ? `Ask anything about Semester ${semester}...`
              : 'Ask anything about your BCA subjects...'
          }
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Type your message"
          disabled={isAiTyping}
          autoComplete="off"
        />
        <button
          type="submit"
          id="chat-send-btn"
          className="chat-send-btn"
          aria-label="Send message"
          disabled={!message.trim() || isAiTyping}
        >
          Send ↑
        </button>
      </form>

      <p className="chat-input-hint">
        GPT for BCA may make mistakes — verify important answers.
        &nbsp;·&nbsp; Using <span className="chat-model-badge">{AI_MODELS.find(m => m.value === model)?.label ?? model}</span>
      </p>
    </div>
  );
}

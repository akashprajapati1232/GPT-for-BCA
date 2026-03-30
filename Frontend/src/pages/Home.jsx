import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ProtectedChatLink from '../components/auth/ProtectedChatLink';
import '../styles/Home.css';

const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Learning',
    desc: 'Get intelligent explanations, summaries, and Q&A assistance for every BCA topic across all 6 semesters.',
  },
  {
    icon: '📚',
    title: 'Full BCA Syllabus',
    desc: 'Semester-wise structured syllabus with subject details, unit breakdowns, and downloadable PDF resources.',
  },
  {
    icon: '🎯',
    title: 'Exam-Focused Content',
    desc: 'Study smarter with curated notes, important topics, and previous year question patterns for each subject.',
  },
  {
    icon: '💡',
    title: 'Concept Clarity',
    desc: 'Complex programming and theory concepts explained with examples, diagrams, and real-world analogies.',
  },
  {
    icon: '🚀',
    title: 'Career Guidance',
    desc: 'Explore career paths in software development, data science, cloud, and more — directly from your syllabus.',
  },
  {
    icon: '🔒',
    title: 'Always Available',
    desc: 'Access your study resources anytime, anywhere with a fully responsive platform built for students.',
  },
];

const steps = [
  { num: '01', title: 'Choose Your Semester', desc: 'Select from Semester 1 to 6 to access your relevant content.' },
  { num: '02', title: 'Pick a Subject', desc: 'Browse through all subjects with unit-wise breakdowns.' },
  { num: '03', title: 'Study with AI', desc: 'Get smart explanations and answers powered by GPT.' },
  { num: '04', title: 'Ace Your Exams', desc: 'Practice, revise and download syllabus PDFs to excel.' },
];

const TYPING_PHRASES = [
  'Explain recursion in C with examples.',
  'What are the topics in BCA Sem 3?',
  'Summarize DBMS normalization forms.',
  'Give me key points for OS scheduling.',
  'Explain OOP concepts with diagrams.',
];

const chatMessages = [
  { role: 'user', text: 'Explain recursion in C with an example.' },
  {
    role: 'ai',
    text: 'Recursion is when a function calls itself. Here\'s a factorial example:\n\nint fact(int n) {\n  if (n == 0) return 1;\n  return n * fact(n-1);\n}\n\nfact(4) → 4×3×2×1 = 24',
  },
  { role: 'user', text: 'What are BCA Sem 3 subjects?' },
  { role: 'ai', text: 'BCA Sem 3 includes: Data Structures, DBMS, Computer Networks, OOP with Java, and Mathematics III.' },
];

function TypingText() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIdx];
    const speed = isDeleting ? 35 : 65;

    if (!isDeleting && displayed === phrase) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setPhraseIdx((i) => (i + 1) % TYPING_PHRASES.length);
    } else {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(isDeleting ? phrase.slice(0, displayed.length - 1) : phrase.slice(0, displayed.length + 1));
      }, speed);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, isDeleting, phraseIdx]);

  return (
    <span className="typing-text">
      {displayed}
      <span className="typing-cursor" />
    </span>
  );
}

export default function Home() {
  return (
    <main className="page-wrapper">
      {/* ===== HERO ===== */}
      <section className="hero">
        {/* Background */}
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
          <div className="hero-grid" />
          <div className="hero-noise" />
        </div>

        <div className="container">
          <div className="hero-content">
            {/* ===== LEFT ===== */}
            <div className="hero-left">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                AI-Powered Education Platform
              </div>

              <h1 className="hero-title">
                Learn Smarter with{' '}
                <span className="hero-title-gradient">GPT for BCA</span>
              </h1>

              <p className="hero-description">
                Your intelligent study companion for the complete BCA curriculum.
                Access semester-wise syllabus, AI explanations, and curated resources
                to excel in every subject.
              </p>

              <div className="hero-actions">
                <ProtectedChatLink className="btn-primary" id="hero-get-started">
                  🚀 Get Started Free
                </ProtectedChatLink>
                <Link to="/about" className="btn-outline" id="hero-learn-more">
                  Learn More →
                </Link>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-num">6</div>
                  <div className="hero-stat-label">Semesters</div>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat">
                  <div className="hero-stat-num">30+</div>
                  <div className="hero-stat-label">Subjects</div>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat">
                  <div className="hero-stat-num">150+</div>
                  <div className="hero-stat-label">Topics</div>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat">
                  <div className="hero-stat-num">100%</div>
                  <div className="hero-stat-label">Free</div>
                </div>
              </div>
            </div>

            {/* ===== RIGHT — AI Chat Panel ===== */}
            <div className="hero-right">
              <div className="ai-panel">
                <div className="ai-panel-inner">
                  {/* Panel header */}
                  <div className="ai-panel-header">
                  <div className="ai-panel-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <div className="ai-panel-title">
                    <span className="ai-panel-icon">🤖</span>
                    GPT for BCA Assistant
                  </div>
                  <div className="ai-panel-status">
                    <span className="status-dot" />
                    Online
                  </div>
                </div>

                {/* Chat messages */}
                <div className="ai-chat-body">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`ai-msg ai-msg-${msg.role}`}>
                      {msg.role === 'ai' && (
                        <div className="ai-avatar">🤖</div>
                      )}
                      <div className="ai-bubble">
                        <pre className="ai-bubble-text">{msg.text}</pre>
                      </div>
                      {msg.role === 'user' && (
                        <div className="ai-avatar ai-avatar-user">👨‍🎓</div>
                      )}
                    </div>
                  ))}

                  {/* Typing indicator */}
                  <div className="ai-msg ai-msg-ai ai-typing-indicator">
                    <div className="ai-avatar">🤖</div>
                    <div className="ai-bubble">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                </div>

                {/* Input bar */}
                <div className="ai-panel-input">
                  <div className="ai-input-field">
                    <span className="ai-input-placeholder">
                      <TypingText />
                    </span>
                  </div>
                  <button className="ai-send-btn" aria-label="Send">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
                </div>

                {/* Floating badges */}
                <div className="ai-badge ai-badge-1">
                  <span>✅</span> Sem 1 Complete
                </div>
                <div className="ai-badge ai-badge-2">
                  <span>📥</span> PDF Ready
                </div>
                <div className="ai-badge-glow ai-glow-1" />
                <div className="ai-badge-glow ai-glow-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="features section">
        <div className="container">
          <div className="features-header">
            <div className="section-tag">Why GPT for BCA?</div>
            <h2 className="section-title">Everything You Need to <span className="gradient-text">Succeed</span></h2>
            <p className="section-subtitle">
              A complete ecosystem for BCA students — from structured syllabus to AI-powered learning assistance.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="how-it-works">
        <div className="container">
          <div className="how-header">
            <div className="section-tag">How It Works</div>
            <h2 className="section-title">Start Learning in <span className="gradient-text">4 Simple Steps</span></h2>
            <p className="section-subtitle">
              No complicated setup. Just open, choose your semester, and start learning smarter today.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((s, i) => (
              <div className="step-card" key={i}>
                <div className="step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="home-cta section">
        <div className="container">
          <div className="home-cta-inner">
            <div className="section-tag" style={{ margin: '0 auto 16px' }}>Ready?</div>
            <h2 className="section-title">
              Begin Your <span className="gradient-text">BCA Journey</span> Today
            </h2>
            <p className="section-subtitle">
              Explore the complete BCA syllabus, download PDFs, and power up your studies with AI.
            </p>
            <div className="home-cta-actions">
              <ProtectedChatLink className="btn-primary" id="cta-explore-syllabus">
                🤖 Ask AI Now
              </ProtectedChatLink>
              <Link to="/syllabus" className="btn-outline" id="cta-contact-us">
                📚 Explore Syllabus
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

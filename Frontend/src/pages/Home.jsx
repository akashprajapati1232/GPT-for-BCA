import { Link } from 'react-router-dom';
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

export default function Home() {
  return (
    <main className="page-wrapper">
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
          <div className="hero-grid"></div>
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                AI-Powered Education Platform
              </div>

              <h1 className="hero-title">
                Learn Smarter with{' '}
                <span className="hero-title-line2">GPT for BCA</span>
              </h1>

              <p className="hero-description">
                Your intelligent study companion for the complete BCA curriculum.
                Access semester-wise syllabus, AI explanations, and curated resources
                to excel in every subject.
              </p>

              <div className="hero-actions">
                <Link to="/syllabus" className="btn-primary" id="hero-get-started">
                  🚀 Get Started Free
                </Link>
                <Link to="/about" className="btn-outline" id="hero-learn-more">
                  Learn More →
                </Link>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-num">6</div>
                  <div className="hero-stat-label">Semesters</div>
                </div>
                <div className="hero-stat-divider"></div>
                <div className="hero-stat">
                  <div className="hero-stat-num">30+</div>
                  <div className="hero-stat-label">Subjects</div>
                </div>
                <div className="hero-stat-divider"></div>
                <div className="hero-stat">
                  <div className="hero-stat-num">150+</div>
                  <div className="hero-stat-label">Topics</div>
                </div>
                <div className="hero-stat-divider"></div>
                <div className="hero-stat">
                  <div className="hero-stat-num">100%</div>
                  <div className="hero-stat-label">Free</div>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-visual">
                <div className="hero-visual-ring"></div>
                <div className="hero-visual-ring hero-visual-ring-2"></div>
                <div className="hero-visual-center">
                  <div className="hero-visual-emoji">🤖</div>
                  <div className="hero-visual-label">AI ASSISTANT</div>
                </div>

                {/* Floating chips */}
                <div className="hero-chip hero-chip-1">
                  <span className="hero-chip-icon">✅</span>
                  Sem 1 Complete
                </div>
                <div className="hero-chip hero-chip-2">
                  <span className="hero-chip-icon">💡</span>
                  AI Explanation
                </div>
                <div className="hero-chip hero-chip-3">
                  <span className="hero-chip-icon">📥</span>
                  PDF Ready
                </div>
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
              <Link to="/syllabus" className="btn-primary" id="cta-explore-syllabus">
                📚 Explore Syllabus
              </Link>
              <Link to="/contact" className="btn-outline" id="cta-contact-us">
                📬 Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

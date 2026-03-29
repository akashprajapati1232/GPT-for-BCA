import { Link } from 'react-router-dom';
import '../styles/About.css';

const visionCards = [
  {
    icon: '🎯',
    title: 'Our Mission',
    desc: 'To make BCA education more accessible, structured, and effective by combining AI assistance with a well-organized syllabus platform.',
  },
  {
    icon: '🔭',
    title: 'Our Vision',
    desc: 'To be the go-to study companion for every BCA student in India — simplifying complex concepts and empowering academic success.',
  },
  {
    icon: '💡',
    title: 'Our Approach',
    desc: 'We blend AI-powered tools with a clean, intuitive design so students can focus on learning, not on searching for resources.',
  },
];

const teamMembers = [
  {
    initials: 'AP',
    name: 'Akash Prajapati',
    role: 'Full Stack Developer & Project Lead',
    roll: 'Roll No: 237092010005',
    bio: 'Passionate developer and tech enthusiast building AI-driven tools to make learning easier for BCA students.',
    socials: [
      { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/akash-prajapati1232/' },
      { icon: '💻', label: 'GitHub', href: 'https://github.com/akashprajapati1232' },
      { icon: '📸', label: 'Instagram', href: 'https://www.instagram.com/akash.prajapati1232/' },
      { icon: '🌐', label: 'Portfolio', href: 'https://akashprajapati.rf.gd/?i=1' },
    ],
  },
  {
    initials: 'VY',
    name: 'Vivek Yadav',
    role: 'UI/UX Designer & Developer',
    roll: 'Roll No: 237092010053',
    bio: 'Creative designer and developer focused on crafting intuitive, beautiful interfaces that enhance the student experience.',
    socials: [
      { icon: '💼', label: 'LinkedIn', href: '#' },
      { icon: '💻', label: 'GitHub', href: '#' },
      { icon: '📸', label: 'Instagram', href: '#' },
    ],
  },
];

const stats = [
  { num: '6', label: 'Semesters Covered' },
  { num: '30+', label: 'Subjects Listed' },
  { num: '150+', label: 'Topics & Units' },
  { num: '100%', label: 'Free to Use' },
];

export default function About() {
  return (
    <main className="page-wrapper">
      {/* ===== HERO ===== */}
      <section className="about-hero">
        <div className="about-hero-bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-tag">About the Project</div>
          <h1>
            Built for Students,{' '}
            <span className="gradient-text">By Students</span>
          </h1>
          <p>
            GPT for BCA is a student-driven initiative to bring the power of AI and structured
            resources together for the complete Bachelor of Computer Applications curriculum.
          </p>
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section className="about-story section-sm">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-visual">
              <div className="about-story-img-box animate-float">
                🎓
              </div>
            </div>
            <div className="about-story-content">
              <div className="section-tag">Our Story</div>
              <h2 className="section-title">
                The Problem We <span className="gradient-text">Solved</span>
              </h2>
              <p>
                As BCA students ourselves, we noticed a common frustration — the syllabus was
                scattered, notes were hard to find, and understanding complex topics took hours of
                searching across unreliable sources.
              </p>
              <p>
                We decided to build <strong style={{ color: 'var(--color-primary-light)' }}>GPT for BCA</strong> — a single platform
                that organizes the entire BCA curriculum semester-wise and gives students access
                to AI-powered explanations for every topic.
              </p>
              <p>
                From basic C programming in Semester 1 to cloud computing and data mining in
                Semester 6, we've structured everything so you can spend less time searching
                and more time learning.
              </p>
              <div style={{ marginTop: '28px' }}>
                <Link to="/syllabus" className="btn-primary">📚 Explore Syllabus</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VISION / MISSION ===== */}
      <section className="about-vision">
        <div className="container">
          <div className="about-vision-header">
            <div className="section-tag">What Drives Us</div>
            <h2 className="section-title">
              Mission, Vision & <span className="gradient-text">Approach</span>
            </h2>
            <p className="section-subtitle">
              We're committed to creating an educational experience that is simple, effective, and empowering.
            </p>
          </div>

          <div className="vision-cards">
            {visionCards.map((v, i) => (
              <div className="vision-card" key={i}>
                <div className="vision-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="about-stats">
        <div className="container">
          <div className="about-stats-grid">
            {stats.map((s, i) => (
              <div className="about-stat" key={i}>
                <div className="about-stat-num">{s.num}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="about-team section">
        <div className="container">
          <div className="about-team-header">
            <div className="section-tag">The Team</div>
            <h2 className="section-title">
              Meet the <span className="gradient-text">Builders</span>
            </h2>
            <p className="section-subtitle">
              Two BCA students who turned a study problem into a solution for thousands.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <div className="team-card" key={i}>
                <div className="team-avatar">
                  {member.initials}
                  <div className="team-avatar-ring"></div>
                </div>
                <h3>{member.name}</h3>
                <div className="team-role">{member.role}</div>
                <div className="team-roll">{member.roll}</div>
                <p className="team-bio">{member.bio}</p>
                <div className="team-socials">
                  {member.socials.map((s, j) => (
                    <a
                      key={j}
                      href={s.href}
                      className="team-social-link"
                      title={s.label}
                      target={s.href !== '#' ? '_blank' : undefined}
                      rel={s.href !== '#' ? 'noopener noreferrer' : undefined}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

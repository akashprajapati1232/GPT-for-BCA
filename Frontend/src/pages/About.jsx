import { Link } from 'react-router-dom';
import ProtectedChatLink from '../components/auth/ProtectedChatLink';
import '../styles/About.css';
import akashImg from '../assets/akash-prajapati.webp';
import vivekImg from '../assets/vivek-yadav.webp';

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
    image: akashImg,
    initials: 'AP',
    name: 'Akash Prajapati',
    role: 'Full Stack Developer & Project Lead',
    roll: 'Roll No: 237092010005',
    year: 'BCA 3rd Year',
    bio: 'Passionate developer and tech enthusiast building AI-driven tools to make learning easier for BCA students.',
    socials: [
      { icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/akash-prajapati1232/' },
      { icon: 'fa-brands fa-github', label: 'GitHub', href: 'https://github.com/akashprajapati1232' },
      { icon: 'fa-brands fa-instagram', label: 'Instagram', href: 'https://www.instagram.com/akash.prajapati1232/' },
      { icon: 'fa-solid fa-globe', label: 'Portfolio', href: 'https://akashprajapati.rf.gd/?i=1' },
    ],
  },
  {
    image: vivekImg,
    initials: 'VY',
    name: 'Vivek Yadav',
    role: 'UI/UX Designer & Developer',
    roll: 'Roll No: 237092010053',
    year: 'BCA 3rd Year',
    bio: 'Creative designer and developer focused on crafting intuitive, beautiful interfaces that enhance the student experience.',
    socials: [
      { icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn', href: '#' },
      { icon: 'fa-brands fa-github', label: 'GitHub', href: '#' },
      { icon: 'fa-brands fa-instagram', label: 'Instagram', href: '#' },
    ],
  },
];

const stats = [
  { num: '6', label: 'Semesters Covered', icon: 'fa-solid fa-layer-group' },
  { num: '30+', label: 'Subjects Listed', icon: 'fa-solid fa-book-open' },
  { num: '150+', label: 'Topics & Units', icon: 'fa-solid fa-list-check' },
  { num: '100%', label: 'Free to Use', icon: 'fa-solid fa-heart' },
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
                As BCA students, we faced a common problem. The syllabus was not in one place,
                good notes were difficult to find, and understanding some topics took a lot of
                time because we had to search on many different websites.
              </p>
              <p>
                So, we created <strong style={{ color: 'var(--color-primary-light)' }}>GPT for BCA</strong>. This platform brings the full BCA syllabus
                in one place, organized semester-wise, and helps students understand topics
                with simple AI-based explanations.
              </p>
              <p>
                From basic C programming in Semester 1 to advanced subjects like cloud computing
                and data mining in Semester 6, our aim is simple — to help students spend less
                time searching and more time learning.
              </p>
              <div style={{ marginTop: '28px' }}>
                <ProtectedChatLink className="btn-primary">🤖 Ask AI Now</ProtectedChatLink>
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
                <div className="about-stat-icon">
                  <i className={s.icon}></i>
                </div>
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
              Meet the <span className="gradient-text">Developers</span>
            </h2>
            <p className="section-subtitle">
              Two BCA students who turned a study problem into a solution for thousands.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <div className="team-card" key={i}>
                <div className="team-avatar-wrap">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-avatar-img"
                  />
                  <div className="team-avatar-ring"></div>
                </div>
                <h3>{member.name}</h3>
                <div className="team-role">{member.role}</div>
                <div className="team-year">{member.year}</div>
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
                      <i className={s.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECT GUIDE ===== */}
      <section className="about-guide section">
        <div className="container">
          <div className="about-team-header">
            <div className="section-tag">Project Guide</div>
            <h2 className="section-title">
              Our <span className="gradient-text">Mentor</span>
            </h2>
            <p className="section-subtitle">
              Guided and mentored by an experienced faculty member from the Department of Computer Science.
            </p>
          </div>

          <div className="guide-card-wrapper">
            <div className="guide-card">
              <div className="guide-icon">👨‍🏫</div>
              <div className="guide-info">
                <h3>Mr. Ashish Sharma</h3>
                <div className="guide-role">Project Guide &amp; Mentor</div>
                <div className="guide-dept">Department of Computer Science Engineering &amp; Application</div>
                <div className="guide-inst">Bhagwant Institute of Technology, Muzaffarnagar</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

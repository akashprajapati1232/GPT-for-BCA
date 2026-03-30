import { Link } from 'react-router-dom';
import ProtectedChatLink from './auth/ProtectedChatLink';
import faviconImg from '../assets/favicon.png';
import '../styles/Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Upar wali thin gradient line footer ko visual separation deti hai. */}
      <div className="footer-accent-line" />

      <div className="container">
        <div className="footer-grid">

          {/* Brand intro + social links ka primary footer column. */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <img src={faviconImg} alt="GPT for BCA Logo" className="footer-logo-img" />
              <span className="footer-logo-text">GPT for BCA</span>
            </Link>
            <p className="footer-tagline">
              An AI-powered platform helping BCA students master their curriculum with smart,
              structured learning resources — built by students, for students.
            </p>
            {/* External social profiles yahan grouped hain. */}
            <div className="footer-socials">
              <a
                href="https://github.com/akashprajapati1232"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="GitHub"
              >
                <i className="fa-brands fa-github" />
              </a>
              <a
                href="https://www.linkedin.com/in/akash-prajapati1232/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in" />
              </a>
              <a
                href="https://www.instagram.com/akash.prajapati1232/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="Instagram"
              >
                <i className="fa-brands fa-instagram" />
              </a>
              <a
                href="https://akashprajapati.rf.gd/?i=1"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="Portfolio"
              >
                <i className="fa-solid fa-globe" />
              </a>
            </div>
          </div>

          {/* Internal quick navigation links. */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-link-list">
              <li><Link to="/">🏠 Home</Link></li>
              <li><Link to="/about">✨ About Us</Link></li>
              <li><Link to="/syllabus">📚 Syllabus</Link></li>
              <li><Link to="/contact">📬 Contact</Link></li>
            </ul>
          </div>

          {/* Semester/resource related shortcuts. */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Resources</h4>
            <ul className="footer-link-list">
              <li><Link to="/syllabus">Semester 1 &amp; 2</Link></li>
              <li><Link to="/syllabus">Semester 3 &amp; 4</Link></li>
              <li><Link to="/syllabus">Semester 5 &amp; 6</Link></li>
              <li><Link to="/syllabus">Download PDFs</Link></li>
            </ul>
          </div>

          {/* AI chat CTA jo auth flow handle karta hai. */}
          <div className="footer-cta-col">
            <h4 className="footer-col-title">Get AI Help</h4>
            <p className="footer-cta-desc">
              Ask our AI assistant anything about your BCA syllabus — for free.
            </p>
            <ProtectedChatLink className="footer-cta-btn">
              <i className="fa-solid fa-robot" />
              Ask AI Now
            </ProtectedChatLink>
          </div>

        </div>

        {/* Divider footer content aur bottom copyright bar ko alag karta hai. */}
        <div className="footer-divider" />

        {/* Bottom legal + maker credit section. */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} <span className="footer-brand-name">GPT for BCA</span>. All rights reserved.
          </p>
          <p className="footer-made-with">
            Made with <span className="footer-heart">❤️</span> by BCA Students
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import faviconImg from '../assets/favicon.png';
import '../styles/Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={faviconImg} alt="GPT for BCA Logo" className="footer-logo-img" />
              <span className="footer-logo-text">GPT for BCA</span>
            </Link>
            <p className="footer-tagline">
              An AI-powered platform helping BCA students master their curriculum with smart, structured learning resources.
            </p>
          </div>

          {/* Quick Navigation */}
          <nav className="footer-nav" aria-label="Footer navigation">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/syllabus">Syllabus</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom */}
        <div className="footer-bottom">
          <p>© {year} GPT for BCA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

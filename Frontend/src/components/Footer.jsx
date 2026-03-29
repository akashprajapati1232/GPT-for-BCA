import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">🤖</div>
              <span className="footer-logo-text">GPT for BCA</span>
            </div>
            <p className="footer-tagline">
              An AI-powered platform helping BCA students master their curriculum with smart, structured learning resources.
            </p>
            <div className="footer-social">
              <a href="https://github.com/akashprajapati1232" target="_blank" rel="noopener noreferrer" title="GitHub">
                💻
              </a>
              <a href="https://www.linkedin.com/in/akash-prajapati1232/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                💼
              </a>
              <a href="https://www.instagram.com/akash.prajapati1232/" target="_blank" rel="noopener noreferrer" title="Instagram">
                📸
              </a>
              <a href="https://akashprajapati.rf.gd/?i=1" target="_blank" rel="noopener noreferrer" title="Portfolio">
                🌐
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/syllabus">Syllabus</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Semesters */}
          <div className="footer-col">
            <h4>Semesters</h4>
            <ul>
              {[1, 2, 3, 4, 5, 6].map(n => (
                <li key={n}>
                  <Link to="/syllabus">Semester {n}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="/pdfs/all-semesters.pdf" download>Full Syllabus PDF</a></li>
              <li><Link to="/about">Our Team</Link></li>
              <li><Link to="/contact">Get Help</Link></li>
              <li><a href="https://akashprajapati.rf.gd/?i=1" target="_blank" rel="noopener noreferrer">Developer</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} GPT for BCA. Built with ❤️ for BCA students.</p>
          <div className="footer-bottom-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <a href="/pdfs/all-semesters.pdf" download>Download Syllabus</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Logo */}
            <Link to="/" className="navbar-logo" onClick={handleNavClick}>
              <div className="navbar-logo-icon">🤖</div>
              <span className="navbar-logo-text">GPT for BCA</span>
            </Link>

            {/* Desktop Links */}
            <div className="navbar-links">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                Home
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                About
              </NavLink>
              <NavLink to="/syllabus" className={({ isActive }) => isActive ? 'active' : ''}>
                Syllabus
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
                Contact
              </NavLink>
              <NavLink to="/syllabus" className="navbar-cta">
                Get Started
              </NavLink>
            </div>

            {/* Hamburger */}
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              id="hamburger-btn"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>
          🏠 Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>
          ℹ️ About
        </NavLink>
        <NavLink to="/syllabus" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>
          📚 Syllabus
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>
          📬 Contact
        </NavLink>
        <NavLink to="/syllabus" className="mobile-cta" onClick={handleNavClick}>
          🚀 Get Started
        </NavLink>
      </div>
    </>
  );
}

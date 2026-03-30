import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ProtectedChatLink from './auth/ProtectedChatLink';
import faviconImg from '../assets/favicon.png';
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Logo */}
            <Link to="/" className="navbar-logo" onClick={handleNavClick}>
              <img src={faviconImg} alt="GPT for BCA Logo" className="navbar-logo-img" />
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
              <ProtectedChatLink className="navbar-cta">
                Get Started
              </ProtectedChatLink>
            </div>

            {/* Hamburger */}
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              id="hamburger-btn"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? 'open' : ''}`}
        onClick={handleNavClick}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="navigation" aria-label="Mobile navigation">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>
          About
        </NavLink>
        <NavLink to="/syllabus" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>
          Syllabus
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>
          Contact
        </NavLink>
        <ProtectedChatLink className="mobile-cta" onClick={handleNavClick}>
          Get Started →
        </ProtectedChatLink>
      </div>
    </>
  );
}

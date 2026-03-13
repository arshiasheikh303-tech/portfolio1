import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll tracking for active section
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      setScrolled(scroll > 50);

      const sections = ['about', 'skills', 'projects', 'contact'];
      let current = '';
      
      sections.forEach(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 100 && rect.bottom > 100) {
            current = section;
          }
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Logo animation
  const logoSpring = useSpring({
    opacity: scrolled ? 1 : 1,
    scale: scrolled ? 1 : 1.1,
    config: { tension: 300, friction: 30 }
  });

  // Mobile menu animation
  const menuSpring = useSpring({
    opacity: mobileMenuOpen ? 1 : 0,
    transform: mobileMenuOpen ? 'translateX(0%)' : 'translateX(100%)',
    config: { tension: 300, friction: 30 }
  });

  const navItems = [
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  return (
    <>
      {/* Fixed Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <animated.div 
            className="logo-wrapper" 
            style={logoSpring}
          >
            <div className="logo">
              <span className="logo-primary">ARSHIA</span>
              <span className="logo-glow"></span>
            </div>
          </animated.div>

          {/* Desktop Menu */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                  <span className="nav-underline"></span>
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a href="#contact" className="cta-button" onClick={() => scrollToSection('contact')}>
            <span>Let's Talk</span>
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <animated.div 
          className="mobile-menu-overlay"
          style={menuSpring}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="mobile-menu">
            <div className="mobile-menu-inner">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  style={{ 
                    '--delay': `${index * 0.1}s`,
                    opacity: mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(30px)'
                  }}
                >
                  <span className="mobile-nav-icon">{item.icon}</span>
                  <span className="mobile-nav-text">{item.label}</span>
                </button>
              ))}
              <div className="mobile-cta">
                <button 
                  className="mobile-cta-btn"
                  onClick={() => scrollToSection('contact')}
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </>
  );
};

export default Navbar;
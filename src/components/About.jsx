import React, { useEffect, useState, useRef } from "react";
import "./About.css";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const statsRef = useRef([]);

  const stats = [
    { label: "Projects", value: 25, suffix: "+" },
    { label: "Clients", value: 12, suffix: "+" },
    { label: "Years Exp", value: 3, suffix: "+" },
    { label: "Commits", value: 1500, suffix: "+" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const animateStats = (index) => {
    statsRef.current[index]?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  };

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        {/* Animated Background Grid */}
        <div className="grid-bg">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="grid-item"
              style={{ 
                '--delay': `${i * 0.05}s`,
                opacity: scrollProgress
              }}
            />
          ))}
        </div>

        <div className="about-content">
          {/* Profile Card */}
          <div className={`profile-card ${isVisible ? 'visible' : ''}`}>
            <div className="profile-image">
              <div className="image-placeholder">
                <span>👨‍💻</span>
              </div>
              <div className="status-ring">
                <div className="status-dot" />
              </div>
            </div>
            
            <div className="profile-info">
              <div className="badge">Full Stack Developer</div>
              <h1 className="hero-name">
                Hi, I'm <span className="gradient-name">Arshia</span>
              </h1>
              <p className="hero-subtitle">
                Crafting exceptional digital experiences with modern technologies
              </p>
              
              <div className="social-links">
                <a href="https://github.com/arshiasheikh303-tech" className="social-link" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.058-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.176 2.873.171 3.177.768.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/arshia-firdous6809" className="social-link" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1。729v20。542C0 23。２２７。79２ ２４ １。７７１ ２４h２０。４５１C２３。２ ２４ ２４ ２３。２２７ ２４ ２２。２７１V１。７２９C２４ 。７７４ ２３。２ ０ ２２。２２２ ０h。００３z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`stat-card ${isVisible ? 'visible' : ''}`}
                onClick={() => animateStats(index)}
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className="stat-number" data-value={stat.value}>
                  <span>{stat.value.toLocaleString()}</span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className={`bio-section ${isVisible ? 'visible' : ''}`}>
            <h2 className="section-title">A bit about me</h2>
            <div className="bio-content">
              <p>
                I'm a passionate <strong>Full Stack Developer</strong> with a keen eye for detail and a love for 
                creating seamless user experiences. I specialize in building scalable web applications using 
                modern JavaScript frameworks and cloud technologies.in plus i am also an future data analyst
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open source, 
                or diving deep into UI/UX design principles to create pixel-perfect interfaces.
              </p>
              <div className="cta-buttons">
                <a href="#contact" className="btn-primary">Let's Work Together</a>
                <a href="#portfolio" className="btn-secondary">View My Work</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
import React, { useEffect, useState, useCallback, useRef } from "react";
import "./Projects.css";

const PROJECTS_DATA = [
  {
    id: 1,
    name: "Cyber Portfolio",
    desc: "Interactive futuristic portfolio with advanced React animations, scroll-triggered effects, and cyberpunk aesthetics",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["React", "CSS3", "GSAP"],
    link: "#",
    github: "#",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    name: "Game Dashboard",
    desc: "Real-time gaming analytics dashboard with live data visualization and interactive charts",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Chart.js", "Node.js"],
    link: "#",
    github: "#",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    name: "E-commerce Platform",
    desc: "Full-stack e-commerce solution with payment integration, admin panel, and real-time inventory management",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["MERN", "Stripe", "Socket.io"],
    link: "#",
    github: "#",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 4,
    name: "Task Management App",
    desc: "Collaborative task manager with drag & drop, real-time updates, and team collaboration features",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Next.js", "Prisma", "Tailwind"],
    link: "#",
    github: "#",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  },
  {
    id: 5,
    name: "Weather Dashboard",
    desc: "Advanced weather forecasting app with animated UI, geolocation, and 7-day predictions",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Vue.js", "OpenWeather", "PWA"],
    link: "#",
    github: "#",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    id: 6,
    name: "Social Media Analytics",
    desc: "Comprehensive social media analytics platform with AI-powered insights and growth tracking",
    image: "https://images.unsplash.com/photo-1613478223706-e3f4e1e05586?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["React", "D3.js", "Python"],
    link: "#",
    github: "#",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  }
];

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const projectsRef = useRef([]);

  const filters = ["all", "React", "Node.js", "Next.js", "Vue.js"];

  const filteredProjects = PROJECTS_DATA.filter(project => 
    filter === "all" || project.tags.includes(filter)
  );

  const handleScroll = useCallback(() => {
    projectsRef.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
      
      if (isVisible && !visibleProjects.has(index)) {
        setVisibleProjects(prev => new Set([...prev, index]));
      }
    });
  }, [visibleProjects]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-line">Latest</span> Projects
          </h2>
          <p className="section-subtitle">
            Showcasing my best work with modern technologies
          </p>
        </div>

        {/* Filters */}
        <div className="filters-container">
          <div className="filters">
            {filters.map(tag => (
              <button
                key={tag}
                className={`filter-btn ${filter === tag ? 'active' : ''}`}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => {
            const globalIndex = PROJECTS_DATA.findIndex(p => p.id === project.id);
            
            return (
              <article
                key={project.id}
                className={`project-card ${visibleProjects.has(globalIndex) ? 'visible' : ''}`}
                ref={el => { projectsRef.current[globalIndex] = el; }}
                style={{ '--project-gradient': project.gradient }}
              >
                <div className="project-media">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="project-image"
                  />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href={project.link} className="link-demo" aria-label="Live Demo">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14.219 21.935c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm-4.95-10.134l3.180-2.462-3.180-2.462v-1.489l4.664 3.584-4.664 3.584v-1.489z"/>
                        </svg>
                      </a>
                      <a href={project.github} className="link-github" aria-label="Source Code">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.058-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.176 2.873.171 3.177.768.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="project-content">
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  
                  <h3 className="project-title">{project.name}</h3>
                  <p className="project-desc">{project.desc}</p>
                  
                  <div className="project-stats">
                    <span className="stat-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Featured
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
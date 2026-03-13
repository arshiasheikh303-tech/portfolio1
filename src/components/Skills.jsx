import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./Skills.css"; // We'll create this CSS file for better styling

const SKILLS_DATA = [
  { name: "React", category: "Frontend", icon: "⚛️" },
  { name: "JavaScript", category: "Frontend", icon: "📜" },
  { name: "HTML", category: "Frontend", icon: "🌐" },
  { name: "CSS", category: "Frontend", icon: "🎨" },
  { name: "Node.js", category: "Backend", icon: "⚡" },
  { name: "Express", category: "Backend", icon: "🚀" },
  { name: "MongoDB", category: "Database", icon: "🗄️" },
];

const Skills = () => {
  const [visibleSkills, setVisibleSkills] = useState(new Set());
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillsByCategory = useMemo(() => {
    const categories = {};
    SKILLS_DATA.forEach(skill => {
      const category = skill.category;
      if (!categories[category]) categories[category] = [];
      categories[category].push(skill);
    });
    return categories;
  }, []);

  const handleScroll = useCallback(() => {
    const skillElements = document.querySelectorAll(".skill-card");
    const newVisible = new Set(visibleSkills);

    skillElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      
      if (isVisible && !visibleSkills.has(index)) {
        newVisible.add(index);
      }
    });

    setVisibleSkills(newVisible);
  }, [visibleSkills]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            Technologies I work with
          </p>
        </div>

        <div className="skills-grid">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h3 className="category-title">{category}</h3>
              <div className="skills-list">
                {skills.map((skill, index) => {
                  const globalIndex = SKILLS_DATA.findIndex(s => s.name === skill.name);
                  const isVisible = visibleSkills.has(globalIndex);
                  
                  return (
                    <div
                      key={skill.name}
                      className={`skill-card ${isVisible ? 'visible' : ''} ${hoveredSkill === skill.name ? 'hovered' : ''}`}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="skill-icon">{skill.icon}</div>
                      <h4 className="skill-name">{skill.name}</h4>
                      <div className="skill-progress">
                        <div 
                          className="progress-fill"
                          style={{ 
                            width: `${90 + Math.random() * 10}%`,
                            transitionDelay: `${index * 0.1}s`
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
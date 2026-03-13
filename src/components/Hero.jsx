import React, { useEffect, useState } from "react";
import "./Hero.css";
function Hero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 300);
  }, []);

  return (
    <section id="hero">
      <div className={`fade-in ${show ? "active" : ""}`}>
        <h1 className="primary"><strong><strong>Hi, I'm Arshia</strong></strong></h1><br></br>
          
        <h2 className="secondary">Full Stack Developer</h2>
        <p className="accent">I build futuristic web apps with React, Node.js, and more.</p>
        <button className="button">Explore Projects</button>
      </div>
    </section>
  );
}

export default Hero;
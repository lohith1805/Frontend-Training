import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero" id="home">
      {/* Full-bleed background image with dark overlay blend */}
      <div className="hero__bg-image" aria-hidden="true" />
      <div className="hero__bg-overlay" aria-hidden="true" />

      <div className="container hero__layout">
        {/* LEFT — Text content */}
        <div className="hero__left">
          <div className="hero__badge">🚀 Now building the future</div>
          <h1 className="hero__title">
            We craft digital<br />
            <span className="hero__title--accent">experiences</span><br />
            that matter.
          </h1>
          <p className="hero__subtitle">
            TechNova is a full-stack product studio. We design, develop, and deploy
            web applications that are fast, beautiful, and built to scale.
          </p>
          <div className="hero__actions">
            <a href="#services" className="btn-primary">Explore Our Work →</a>
            <a href="#about" className="btn-outline">Meet the Team</a>
          </div>
          <div className="hero__stats">
            {[
              { value: '120+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '6+', label: 'Years in Business' },
            ].map(s => (
              <div className="hero__stat" key={s.label}>
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Side picture */}
        <div className="hero__right">
          <div className="hero__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&q=80&auto=format&fit=crop"
              alt="Team working on digital projects"
              className="hero__img"
            />
            {/* Floating badge on the image */}
            <div className="hero__img-badge">
              <span className="hero__img-badge-dot" />
              <span>Currently taking projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

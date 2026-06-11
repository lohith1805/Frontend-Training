import React from 'react';
import './About.css';

const team = [
  { name: 'Arjun Mehta', role: 'Founder & CEO', initials: 'AM', color: '#6c63ff' },
  { name: 'Priya Sharma', role: 'Lead Designer', initials: 'PS', color: '#00d4aa' },
  { name: 'Rohan Das', role: 'Backend Engineer', initials: 'RD', color: '#f97316' },
  { name: 'Sneha Iyer', role: 'Frontend Lead', initials: 'SI', color: '#e91e8c' },
];

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <p className="section-label">Who We Are</p>
        <h2 className="section-title">Built by builders,<br />for builders.</h2>
        <p className="about__desc">
          We're a remote-first team of engineers, designers, and strategists who believe
          great software is equal parts craft and empathy. Based across India, we've
          shipped products for startups and enterprises alike.
        </p>

        <div className="about__values">
          {[
            { icon: '⚡', title: 'Speed', desc: 'We ship fast without cutting corners on quality.' },
            { icon: '🎯', title: 'Precision', desc: 'Every pixel and every line of code is intentional.' },
            { icon: '🤝', title: 'Partnership', desc: 'We treat your product like it\'s our own.' },
          ].map(v => (
            <div className="about__value-card" key={v.title}>
              <span className="about__value-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="about__team">
          <p className="section-label">The Team</p>
          <div className="about__team-grid">
            {team.map(member => (
              <div className="about__team-card" key={member.name}>
                <div
                  className="about__avatar"
                  style={{ background: `${member.color}22`, border: `2px solid ${member.color}55`, color: member.color }}
                >
                  {member.initials}
                </div>
                <div>
                  <p className="about__member-name">{member.name}</p>
                  <p className="about__member-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

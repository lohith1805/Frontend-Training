import React from 'react';
import './Services.css';

const services = [
  {
    icon: '🖥️',
    title: 'Web Development',
    desc: 'Full-stack React & Node.js applications built for performance and scale.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    icon: '📱',
    title: 'Mobile Apps',
    desc: 'Cross-platform iOS & Android apps with React Native.',
    tags: ['React Native', 'Expo', 'Firebase'],
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    desc: 'User-centered design systems that balance aesthetics with usability.',
    tags: ['Figma', 'Design Systems', 'Prototyping'],
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    desc: 'CI/CD pipelines, containerization, and cloud infrastructure.',
    tags: ['AWS', 'Docker', 'GitHub Actions'],
  },
  {
    icon: '🔒',
    title: 'Security Audits',
    desc: 'Thorough code review and penetration testing for peace of mind.',
    tags: ['OWASP', 'Pen Testing', 'Auth'],
  },
  {
    icon: '📊',
    title: 'Analytics & BI',
    desc: 'Data pipelines and dashboards that turn numbers into decisions.',
    tags: ['Python', 'Tableau', 'SQL'],
  },
];

function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <p className="section-label">What We Do</p>
        <h2 className="section-title">Services built for<br />modern products.</h2>
        <div className="services__grid">
          {services.map(s => (
            <div className="services__card" key={s.title}>
              <span className="services__icon">{s.icon}</span>
              <h3 className="services__name">{s.title}</h3>
              <p className="services__desc">{s.desc}</p>
              <div className="services__tags">
                {s.tags.map(t => <span className="services__tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;

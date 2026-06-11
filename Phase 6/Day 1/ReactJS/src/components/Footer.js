import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__logo">Tech<span>Nova</span></p>
            <p className="footer__tagline">Building the web, one component at a time.</p>
          </div>
          <div className="footer__links-group">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#home">Home</a></li>
            </ul>
          </div>
          <div className="footer__links-group">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@technova.dev">hello@technova.dev</a></li>
              <li><a href="tel:+919876543210">+91 98765 43210</a></li>
              <li><span>Hyderabad, India</span></li>
            </ul>
          </div>
          <div className="footer__cta">
            <h4>Start a project</h4>
            <p>Ready to build something great?</p>
            <a href="mailto:hello@technova.dev" className="btn-primary" style={{marginTop:'16px',display:'inline-flex'}}>
              Let's Talk →
            </a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2024 TechNova. Built with React ⚛️</p>
          <div className="footer__socials">
            {['GitHub', 'LinkedIn', 'Twitter'].map(s => (
              <a key={s} href="#home">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

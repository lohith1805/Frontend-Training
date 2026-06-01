/* ============================================================
   NEXORA — Main JavaScript
   Features: Sticky nav, mobile menu, scroll reveal, form handler
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Navbar — scroll style ---------- */
  const navbar  = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  /* ---------- 2. Hamburger — mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ---------- 3. Scroll Reveal ---------- */
  // Add .reveal class to target elements
  const revealTargets = [
    '.service-card',
    '.about-images',
    '.about-content',
    '.contact-card',
    '.footer-brand',
    '.footer-links',
  ];
  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- 4. Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.45 }
  );
  sections.forEach(s => sectionObserver.observe(s));

  /* ---------- 5. Smooth scroll offset (for fixed nav) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h'), 10) || 72;
      window.scrollTo({
        top: target.offsetTop - navH,
        behavior: 'smooth'
      });
    });
  });

});

/* ---------- 6. Form submission handler (global) ---------- */
function handleSubmit(e) {
  e.preventDefault();
  const btn  = e.target.querySelector('button[type="submit"]');
  const orig = btn.textContent;

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  // Simulate async submission
  setTimeout(() => {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
    e.target.reset();

    setTimeout(() => {
      btn.textContent    = orig;
      btn.style.background = '';
      btn.disabled        = false;
    }, 3500);
  }, 1400);
}

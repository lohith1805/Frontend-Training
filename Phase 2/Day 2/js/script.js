document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const delay = entry.target.dataset.delay || '0ms';

      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = delay;
        entry.target.classList.add('visible');
      } else {
        // Reset the element after it leaves the screen so the fly-up animation
        // can play again when the user scrolls back to this section.
        entry.target.style.transitionDelay = '0ms';
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((element, index) => {
    const groupDelay = (index % 6) * 80;
    element.dataset.delay = `${groupDelay}ms`;
    observer.observe(element);
  });

  // Close the Bootstrap mobile menu after clicking a nav link.
  document.querySelectorAll('.navbar-collapse .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const navMenu = document.querySelector('.navbar-collapse.show');
      if (navMenu && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
      }
    });
  });
});

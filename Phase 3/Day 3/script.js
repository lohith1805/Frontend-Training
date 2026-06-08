// ---- Navbar scroll effect ----
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- Testimonial carousel manual controls ----
const testiCarousel = document.getElementById('testimonialCarousel');
if (testiCarousel) {
  document.querySelectorAll('[data-bs-target="#testimonialCarousel"]').forEach(btn => {
    btn.addEventListener('click', function () {
      const dir = this.getAttribute('data-bs-slide');
      const bsCarousel = bootstrap.Carousel.getOrCreateInstance(testiCarousel);
      dir === 'prev' ? bsCarousel.prev() : bsCarousel.next();
    });
  });
}

// ---- Pricing toggle (monthly ↔ annual) ----
const billingToggle = document.getElementById('billingToggle');
if (billingToggle) {
  billingToggle.addEventListener('change', function () {
    const isAnnual = this.checked;
    document.querySelectorAll('.amount').forEach(el => {
      const val = isAnnual ? el.dataset.annual : el.dataset.monthly;
      el.textContent = val;
    });
    document.getElementById('lblMonthly').style.opacity = isAnnual ? '0.5' : '1';
    document.getElementById('lblAnnual').style.opacity  = isAnnual ? '1'   : '0.5';
  });
}

// ---- Contact Modal form submission ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = document.getElementById('modalSubmitBtn');
    btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
    btn.style.background = '#43d9a2';
    btn.disabled = true;
    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
      modal.hide();
      contactForm.reset();
      btn.innerHTML = '<i class="bi bi-send me-2"></i>Send Message';
      btn.style.background = '';
      btn.disabled = false;
    }, 2000);
  });
}

// ---- Smooth scroll for nav links ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav if open
      const navCollapse = document.getElementById('navLinks');
      if (navCollapse && navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navCollapse)?.hide();
      }
    }
  });
});

// ---- Animate feature cards on scroll (Intersection Observer) ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.feat-card, .testi-card, .pricing-card, .stat-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

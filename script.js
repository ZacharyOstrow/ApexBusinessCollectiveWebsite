const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => document.body.classList.add('is-loaded'));
});

// Restore fade-in state when returning via browser back/forward cache
window.addEventListener('pageshow', () => {
  document.body.classList.remove('is-leaving');
  document.body.classList.add('is-loaded');
});

const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Page-to-page fade transition for internal links
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  const isInternalPage = href && /\.html(#.*)?$/.test(href) && !link.target;
  if (!isInternalPage) return;

  link.addEventListener('click', (e) => {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;
    e.preventDefault();
    document.body.classList.remove('is-loaded');
    document.body.classList.add('is-leaving');
    setTimeout(() => { window.location.href = href; }, 320);
  });
});

// Scroll-reveal animations
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
if (revealEls.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// FAQ / founder accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');
    const group = item.closest('.faq-list');

    if (group) {
      group.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
    }

    if (isOpen) {
      item.classList.remove('open');
      answer.style.maxHeight = null;
    } else {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Contact form (mailto handoff)
const form = document.getElementById('contact-form');
if (form) {
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Free Consultation Request - ${data.get('business') || data.get('name')}`);
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\n` +
      `Business: ${data.get('business')}\n` +
      `Email: ${data.get('email')}\n` +
      `Phone: ${data.get('phone')}\n\n` +
      `Message:\n${data.get('message')}`
    );
    window.location.href = `mailto:apexbusinesscollective@gmail.com?subject=${subject}&body=${body}`;
    status.textContent = "Opening your email client to send your request...";
  });
}

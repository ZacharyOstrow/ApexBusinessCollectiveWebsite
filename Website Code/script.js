document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

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

const form = document.getElementById('contact-form');
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

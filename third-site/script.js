const header = document.querySelector('.header');
const menuBtn = document.querySelector('.menu-btn');

menuBtn.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelector('#lead-form').addEventListener('submit', event => {
  event.preventDefault();
  event.currentTarget.querySelector('.form-success').classList.add('show');
  event.currentTarget.querySelector('button').textContent = 'Заявка отправлена ✓';
});

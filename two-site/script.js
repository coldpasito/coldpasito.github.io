const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
reveals.forEach(el => observer.observe(el));

const reviews = [...document.querySelectorAll('.review')];
const count = document.querySelector('.slider-controls span b');
let current = 0;
function showReview(index) {
  current = (index + reviews.length) % reviews.length;
  reviews.forEach((review, i) => review.classList.toggle('active', i === current));
  count.textContent = String(current + 1).padStart(2, '0');
}
document.querySelector('.next').addEventListener('click', () => showReview(current + 1));
document.querySelector('.prev').addEventListener('click', () => showReview(current - 1));

const form = document.querySelector('#bookingForm');
form.addEventListener('submit', event => {
  event.preventDefault();
  form.classList.add('sent');
  form.querySelector('button').textContent = 'Заявка отправлена ✓';
});

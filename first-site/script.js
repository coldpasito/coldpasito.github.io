const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

const menuBtn = qs('.menu-btn');
const mobileMenu = qs('.mobile-menu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
});
qsa('.mobile-menu a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: .12 });
qsa('.reveal').forEach(el => observer.observe(el));

qsa('.filters button').forEach(button => button.addEventListener('click', () => {
  qsa('.filters button').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  qsa('.project-card').forEach(card => card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter));
}));

const prices = { design: 4500, repair: 38000, full: 62000 };
const areaRange = qs('#areaRange');
function updateCalculator() {
  const area = Number(areaRange.value);
  const packageName = qs('input[name="package"]:checked').value;
  const total = area * prices[packageName];
  qs('#areaValue').textContent = area;
  qs('#calcTotal').textContent = `${new Intl.NumberFormat('ru-RU').format(total)} ₽`;
  const months = packageName === 'design' ? Math.max(1, Math.ceil(area / 55)) : Math.max(3, Math.ceil(area / 16));
  qs('#calcDuration').textContent = packageName === 'design' ? `Срок: около ${months} мес.` : `Срок: около ${months} месяцев`;
}
areaRange.addEventListener('input', updateCalculator);
qsa('input[name="package"]').forEach(input => input.addEventListener('change', updateCalculator));

qsa('.accordion article button').forEach(button => button.addEventListener('click', () => {
  const item = button.closest('article');
  qsa('.accordion article').forEach(article => { if (article !== item) article.classList.remove('open'); });
  item.classList.toggle('open');
}));

const modal = qs('.modal');
const openModal = () => { modal.classList.add('active'); modal.setAttribute('aria-hidden', 'false'); document.body.classList.add('no-scroll'); setTimeout(() => qs('.modal input').focus(), 200); };
const closeModal = () => { modal.classList.remove('active'); modal.setAttribute('aria-hidden', 'true'); document.body.classList.remove('no-scroll'); };
qsa('.open-modal').forEach(button => button.addEventListener('click', openModal));
qs('.modal-close').addEventListener('click', closeModal);
qs('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

function handleForm(event) {
  event.preventDefault();
  event.currentTarget.reset();
  closeModal();
  const toast = qs('.toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3800);
}
qsa('form').forEach(form => form.addEventListener('submit', handleForm));

const glow = qs('.cursor-glow');
document.addEventListener('pointermove', event => { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; });

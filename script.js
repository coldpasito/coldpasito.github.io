const toggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Открыть меню');
  }));
}

const serviceData = {
  mask: {
    category: 'Косметология / Уходовые процедуры',
    title: 'Маска по типу кожи',
    description: 'Уходовая процедура с маской, подобранной по типу кожи.',
    forWhom: ['для тех, кто выбирает регулярный уход за лицом', 'когда хочется дополнить привычную бьюти-рутину', 'для знакомства с уходовыми процедурами'],
    how: 'Сначала специалист уточняет ожидания от ухода. Затем подбирается маска по типу кожи, и процедура проходит в спокойной обстановке.',
    price: '1 000–1 500 ₽'
  },
  intro: {
    category: 'Косметология',
    title: 'Визит-знакомство',
    description: 'Первичное знакомство со специалистом и подбор дальнейшего ухода.',
    forWhom: ['для первого визита в центр', 'для тех, кто хочет сориентироваться в доступных процедурах', 'когда нужен спокойный разговор о дальнейшем уходе'],
    how: 'На визите можно обсудить текущий уход и ожидания. Специалист поможет сориентироваться в доступных процедурах и дальнейших шагах.',
    price: '999 ₽'
  },
  massage90: {
    category: 'Массаж',
    title: 'Ручной массаж — 90 минут',
    description: 'Комплексный сеанс массажа продолжительностью 90 минут.',
    forWhom: ['для тех, кто хочет расслабиться', 'при ощущении усталости и напряжения', 'для комплексного ухода за телом'],
    how: 'Перед сеансом можно обсудить комфорт и пожелания. Мастер проводит ручной массаж в течение указанного времени, после чего можно спокойно завершить визит.',
    duration: '90 минут',
    price: '3 190 ₽'
  },
  massage120: {
    category: 'Массаж',
    title: 'Ручной массаж — 120 минут',
    description: 'Продолжительный сеанс массажа для комплексного ухода за телом.',
    forWhom: ['для тех, кто хочет выделить больше времени на уход', 'при ощущении усталости и напряжения', 'для спокойного комплексного ухода за телом'],
    how: 'Перед сеансом можно обсудить комфорт и пожелания. Мастер проводит ручной массаж в течение указанного времени, после чего можно спокойно завершить визит.',
    duration: '120 минут',
    price: '3 890 ₽'
  },
  pedicure: {
    category: 'Педикюр',
    title: 'Аппаратный педикюр',
    description: 'Аккуратный уход за стопами и ногтями с покрытием.',
    forWhom: ['для регулярного ухода за стопами и ногтями', 'когда хочется аккуратного покрытия', 'для тех, кто ценит ухоженный вид'],
    how: 'Мастер последовательно выполняет процедуру и оформление покрытия. Состав услуги можно уточнить перед записью.',
    price: '2 800 ₽'
  },
  pedicureExtra: {
    category: 'Педикюр',
    title: 'Педикюр — дополнительные услуги',
    description: 'Дополнительный уход и аккуратное оформление ногтей.',
    forWhom: ['для дополнения основной процедуры', 'когда нужен отдельный формат ухода', 'для аккуратного оформления ногтей'],
    how: 'Перед процедурой можно уточнить нужный формат дополнительных услуг. Мастер выполняет выбранный уход и аккуратное оформление.',
    price: '1 500 ₽'
  }
};

const cards = [...document.querySelectorAll('[data-service]')];
const tabs = [...document.querySelectorAll('[data-filter]')];
const search = document.querySelector('[data-service-search]');
const emptyState = document.querySelector('[data-catalog-empty]');
let activeFilter = 'all';

function updateCatalog() {
  const query = search?.value.trim().toLowerCase() || '';
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesCategory = activeFilter === 'all' || card.dataset.categories.split(' ').includes(activeFilter);
    const matchesSearch = !query || card.dataset.search.includes(query);
    const isVisible = matchesCategory && matchesSearch;
    card.classList.toggle('is-hidden', !isVisible);

    if (isVisible) {
      visibleCount += 1;
      card.classList.remove('is-revealing');
      requestAnimationFrame(() => card.classList.add('is-revealing'));
    }
  });

  if (emptyState) emptyState.hidden = visibleCount !== 0;
}

tabs.forEach((tab) => tab.addEventListener('click', () => {
  activeFilter = tab.dataset.filter;
  tabs.forEach((item) => {
    const isActive = item === tab;
    item.classList.toggle('is-active', isActive);
    item.setAttribute('aria-selected', String(isActive));
  });
  updateCatalog();
}));

search?.addEventListener('input', updateCatalog);

const drawer = document.querySelector('[data-drawer]');
const backdrop = document.querySelector('[data-drawer-backdrop]');
const closeDrawerButton = document.querySelector('[data-drawer-close]');
const drawerCategory = document.querySelector('[data-drawer-category]');
const drawerTitle = document.querySelector('[data-drawer-title]');
const drawerDescription = document.querySelector('[data-drawer-description]');
const drawerFor = document.querySelector('[data-drawer-for]');
const drawerHow = document.querySelector('[data-drawer-how]');
const drawerMeta = document.querySelector('[data-drawer-meta]');
const drawerPrice = document.querySelector('[data-drawer-price]');
const drawerBook = document.querySelector('[data-drawer-book]');
let selectedService = null;
let previousFocus = null;

function openDrawer(id, origin) {
  const service = serviceData[id];
  if (!service || !drawer) return;

  selectedService = id;
  previousFocus = origin || document.activeElement;
  drawerCategory.textContent = service.category;
  drawerTitle.textContent = service.title;
  drawerDescription.textContent = service.description;
  drawerFor.replaceChildren(...service.forWhom.map((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    return li;
  }));
  drawerHow.textContent = service.how;
  drawerMeta.replaceChildren();
  drawerMeta.hidden = !service.duration;

  if (service.duration) {
    const durationLabel = document.createElement('dt');
    const durationValue = document.createElement('dd');
    durationLabel.textContent = 'Продолжительность';
    durationValue.textContent = service.duration;
    drawerMeta.append(durationLabel, durationValue);
  }

  drawerPrice.textContent = service.price;
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  backdrop?.classList.add('is-visible');
  document.body.classList.add('is-locked');
  closeDrawerButton?.focus();
}

function closeDrawer() {
  if (!drawer) return;
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  backdrop?.classList.remove('is-visible');
  document.body.classList.remove('is-locked');
  previousFocus?.focus();
}

document.querySelectorAll('[data-detail]').forEach((button) => button.addEventListener('click', () => openDrawer(button.dataset.detail, button)));
closeDrawerButton?.addEventListener('click', closeDrawer);
backdrop?.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && drawer?.classList.contains('is-open')) closeDrawer();
});

const bookingToast = document.querySelector('[data-booking-toast]');
let toastTimer;

function startBooking(id) {
  const service = serviceData[id];
  if (!service || !bookingToast) return;
  bookingToast.textContent = `Выбрана услуга: «${service.title}». Переходим к записи.`;
  bookingToast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => bookingToast.classList.remove('is-visible'), 3600);
}

document.querySelectorAll('[data-book]').forEach((button) => button.addEventListener('click', () => startBooking(button.dataset.book)));
drawerBook?.addEventListener('click', () => {
  if (selectedService) startBooking(selectedService);
});

document.querySelector('.catalog-more-button')?.addEventListener('click', () => {
  if (!bookingToast) return;
  bookingToast.textContent = 'Полный каталог услуг будет добавлен на следующем этапе.';
  bookingToast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => bookingToast.classList.remove('is-visible'), 3600);
});

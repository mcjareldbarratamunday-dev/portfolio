const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.addEventListener('click', (e) => {
    const target = e.target;
    if (target instanceof HTMLAnchorElement) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const links = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
const sections = links
  .map((a) => {
    const id = a.getAttribute('href');
    if (!id) return null;
    return document.querySelector(id);
  })
  .filter(Boolean);

const setActive = () => {
  const y = window.scrollY;
  const offset = 120;

  let activeIndex = -1;
  for (let i = 0; i < sections.length; i += 1) {
    const s = sections[i];
    if (!s) continue;
    const top = s.getBoundingClientRect().top + window.scrollY;
    if (y + offset >= top) activeIndex = i;
  }

  links.forEach((a, idx) => {
    a.classList.toggle('active', idx === activeIndex);
  });
};

window.addEventListener('scroll', setActive, { passive: true });
setActive();

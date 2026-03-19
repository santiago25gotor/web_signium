/* ═══════════════════════════════════════════════════════
   SIGNIUM — main.js
   ═══════════════════════════════════════════════════════ */

/* ── Language switcher ───────────────────────────────── */
function setLang(lang) {
  document.body.setAttribute('data-active-lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem('signium-lang', lang);
}

/* ── Nav scroll shadow ───────────────────────────────── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Intersection Observer (scroll reveal) ───────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Stagger delays ──────────────────────────────────── */
document.querySelectorAll('.step-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12}s`;
  card.classList.add('reveal');
  revealObserver.observe(card);
});

document.querySelectorAll('.team-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12}s`;
  card.classList.add('reveal');
  revealObserver.observe(card);
});

document.querySelectorAll('.gesture-chip').forEach((chip, i) => {
  chip.style.transitionDelay = `${i * 0.06}s`;
  chip.classList.add('reveal');
  revealObserver.observe(chip);
});

/* ── Counter animation for stats ────────────────────── */
function animateCount(el, target, suffix, duration) {
  const start = performance.now();
  const isDecimal = target % 1 !== 0;
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = isDecimal
      ? (eased * target).toFixed(1)
      : Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-number');
      nums.forEach(n => {
        const raw    = n.dataset.value;
        const suffix = n.dataset.suffix || '';
        const target = parseFloat(raw);
        animateCount(n, target, suffix, 1200);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

/* ── Init lang from localStorage ────────────────────── */
const savedLang = localStorage.getItem('signium-lang') || 'es';
setLang(savedLang);
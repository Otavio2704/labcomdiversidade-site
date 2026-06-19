(function () {
  'use strict';

  // Respeita prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── HERO: dispara imediatamente com delays ───────────────────────────────
  function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.animate-hero');

    if (prefersReduced) {
      heroElements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    heroElements.forEach(function (el) {
      const delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(function () {
        el.classList.add('visible');
      }, delay);
    });
  }

  // ─── SCROLL: IntersectionObserver para seções ─────────────────────────────
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    if (prefersReduced) {
      elements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      // Fallback para browsers sem suporte
      elements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target); // anima apenas uma vez
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ─── MANIFESTO: delays escalonados ────────────────────────────────────────
  function initManifestoAnimations() {
    const paragraphs = document.querySelectorAll('.manifesto__texto .animate-on-scroll');

    paragraphs.forEach(function (p, i) {
      p.dataset.delay = String((i + 1) * 100);
      p.style.transitionDelay = ((i + 1) * 0.1) + 's';
    });
  }

  // ─── CARDS: delays escalonados ────────────────────────────────────────────
  function initCardDelays() {
    const cards = document.querySelectorAll('.mae-card');
    cards.forEach(function (card, i) {
      card.style.transitionDelay = (i * 0.08) + 's';
    });
  }

  // Init
  initHeroAnimations();
  initManifestoAnimations();
  initCardDelays();

  // Aguarda DOM estar pronto para o observer
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
})();

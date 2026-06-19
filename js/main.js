(function () {
  'use strict';

  // ─── CARDS: Quem é a Mãe Atípica ──────────────────────────────────────────
  const cards = [
    {
      icone: '🗓️',
      titulo: 'Gestora de rotina',
      texto: 'Conhece de cor os nomes das terapias, os CIDs, os horários — e ainda assim encontra tempo para sonhar.'
    },
    {
      icone: '💜',
      titulo: 'Defensora de direitos',
      texto: 'Negocia com planos de saúde, pesquisa profissionais e luta pelo filho todos os dias. Sem parar.'
    },
    {
      icone: '🌱',
      titulo: 'Empreendedora por propósito',
      texto: 'Criou seu próprio caminho quando o mercado não respeitou sua realidade. E esse caminho virou missão.'
    },
    {
      icone: '💡',
      titulo: 'Pesquisadora permanente',
      texto: 'Aprendeu um idioma novo — o da atipicidade — e hoje o ensina com paciência e generosidade.'
    },
    {
      icone: '❤️',
      titulo: 'Exemplo vivo',
      texto: 'Seu filho vê uma mulher que adaptou, reinventou e construiu. Isso não tem preço.'
    }
  ];

  function renderCards() {
    const grid = document.getElementById('cards-mae');
    if (!grid) return;

    cards.forEach(function (card) {
      const el = document.createElement('article');
      el.className = 'mae-card';
      el.setAttribute('role', 'listitem');

      el.innerHTML =
        '<span class="mae-card__icone" aria-hidden="true">' + card.icone + '</span>' +
        '<h3 class="mae-card__titulo">' + card.titulo + '</h3>' +
        '<p class="mae-card__texto">' + card.texto + '</p>';

      grid.appendChild(el);
    });

    // Após inserir no DOM, ativa animação de entrada com delay escalonado
    observeCards();
  }

  function observeCards() {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var cardEls = document.querySelectorAll('.mae-card');

    if (prefersReduced) return;
    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('mae-card--visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cardEls.forEach(function (card, i) {
      card.style.transitionDelay = (i * 0.08) + 's';
      observer.observe(card);
    });
  }

  // ─── ACTIVE LINK no scroll ─────────────────────────────────────────────────
  function initActiveLinks() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.navbar__link');

    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            link.classList.toggle('navbar__link--active', href === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // ─── ANO DINÂMICO no footer ────────────────────────────────────────────────
  function updateYear() {
    var copy = document.querySelector('.footer__copy');
    if (!copy) return;
    copy.textContent = copy.textContent.replace('2025', new Date().getFullYear());
  }

  // ─── INIT ──────────────────────────────────────────────────────────────────
  function init() {
    renderCards();
    initActiveLinks();
    updateYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

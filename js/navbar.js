(function () {
  'use strict';

  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClose  = document.getElementById('menu-close');
  const menuOverlay = document.getElementById('menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  // Scroll: adiciona classe .scrolled após 60px
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // estado inicial

  // Abre o menu mobile
  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Fechar menu de navegação');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Foco no botão de fechar para acessibilidade
    setTimeout(() => menuClose.focus(), 50);
  }

  // Fecha o menu mobile
  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);

  // Fecha ao clicar em qualquer link do drawer
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Fecha com Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Smooth scroll nos links da navbar
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();

(function () {
  'use strict';

  const maes = [
    {
      foto: './assets/maes/mae-01.jpg',
      relato: 'Tenho um filho autista nível 1 de suporte e acompanho suas terapias. Minha rotina precisa se adaptar a isso, e o maior desafio é conciliar o trabalho com os cuidados dele.',
      nome: 'Karina Mayla',
      empresa: 'Consultora de beleza',
      instagram: '@karinamaila_marykay',
      instagramUrl: 'https://www.instagram.com/karinamaila_marykay/'
    },
    {
      foto: './assets/maes/mae-02.jpg',
      relato: 'Eu tinha uma filha na condição especial... entre cuidar dela e cuidar de mim, fui desenvolvendo algo para lidar com tudo isso. Depois de tanto tempo dedicada a ela, precisei reconstruir minha vida.',
      nome: 'Maria do Socorro',
      empresa: 'Artesã (Bolsas e ecobags)',
      instagram: '@brazabolsasartesanais',
      instagramUrl: 'https://www.instagram.com/brazabolsasartesanais/#'
    },
    {
      foto: './assets/maes/mae-03.jpg',
      relato: 'Tenho um filho autista nível 2 de suporte. Por causa da rotina de terapias, precisei adaptar minha vida e até minha forma de trabalhar. Hoje empreendo de casa para conseguir conciliar o cuidado com ele.',
      nome: 'Giselle Moraes',
      empresa: 'Artesã/Empreendedora (Velas e aromatizadores)',
      instagram: '@ateliebrilhoearoma',
      instagramUrl: 'https://www.instagram.com/ateliebrilhoearoma/'
    },
    {
      foto: './assets/maes/mae-04.jpg',
      relato: 'Eu comecei porque viajava muito com a minha filha, que tem síndrome de Down, e percebi que as pessoas têm dificuldade em viajar com pessoas com deficiência. Então comecei a adaptar roteiros para ajudar essas famílias.',
      nome: 'Leny Reiff',
      empresa: 'Agente de viagens/Guia de turismo',
      instagram: '@atipcoviagens',
      instagramUrl: 'https://www.instagram.com/atipcoviagens/'
    },
    {
      foto: './assets/maes/mae-05.jpg',
      relato: 'De começo foi bem difícil até descobrir o diagnóstico de autismo do meu filho. Foi todo um processo... e os desafios são diários, principalmente para conciliar tudo.',
      nome: 'Nena Gomes',
      empresa: 'Artesão/Empreendedora (marca de artesanato)',
      instagram: '@euquefiz.25',
      instagramUrl: 'https://www.instagram.com/euquefiz.25/'
    }
  ];

  const track       = document.getElementById('carrossel-track');
  const dotsContainer = document.getElementById('carrossel-dots');
  const btnPrev     = document.getElementById('carrossel-prev');
  const btnNext     = document.getElementById('carrossel-next');
  const carrossel   = document.getElementById('carrossel');

  if (!track) return;

  let currentIndex = 0;
  let visibleCount = getVisibleCount();
  let touchStartX = 0;
  let touchEndX = 0;

  // Inicializa iniciais com placeholder se não existir imagem real
  function getInitials(nome) {
    return nome
      .replace(/\[|\]/g, '')
      .split(' ')
      .slice(0, 2)
      .map(function (n) { return n[0] || ''; })
      .join('')
      .toUpperCase() || 'M';
  }

  // Renderiza os cards
  function renderCards() {
    track.innerHTML = '';
    maes.forEach(function (mae, i) {
      const card = document.createElement('article');
      card.className = 'historia-card';
      card.setAttribute('role', 'listitem');
      card.setAttribute('aria-label', 'Relato de ' + mae.nome);

      card.innerHTML = `
        <div class="historia-card__relato">
          <p>${mae.relato}</p>
        </div>
        <div class="historia-card__perfil">
          <div class="historia-card__foto" aria-hidden="true">
            <img
              src="${mae.foto}"
              alt="Foto de ${mae.nome}"
              loading="lazy"
              onerror="this.style.display='none'; this.parentElement.textContent='${getInitials(mae.nome)}'"
            />
          </div>
          <div class="historia-card__info">
            <span class="historia-card__nome">${mae.nome}</span>
            <span class="historia-card__empresa">${mae.empresa}</span>
            <a
              href="${mae.instagramUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="historia-card__instagram"
              aria-label="Instagram de ${mae.nome}: ${mae.instagram}"
            >${mae.instagram}</a>
          </div>
        </div>
      `;
      track.appendChild(card);
    });
  }

  // Renderiza os dots
  function renderDots() {
    dotsContainer.innerHTML = '';
    const totalDots = maes.length - visibleCount + 1;
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = 'carrossel__dot' + (i === currentIndex ? ' active' : '');
      dot.setAttribute('role', 'listitem');
      dot.setAttribute('aria-label', 'Ir para história ' + (i + 1));
      dot.setAttribute('aria-pressed', i === currentIndex ? 'true' : 'false');
      dot.addEventListener('click', function () {
        goTo(i);
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Atualiza posição do track
  function updateTrack() {
    const cards    = track.querySelectorAll('.historia-card');
    if (!cards.length) return;

    // Lê o gap real do CSS (funciona com qualquer valor, incluindo mobile)
    const trackStyle = window.getComputedStyle(track);
    const gap = parseFloat(trackStyle.gap) || 24;
    const cardWidth = cards[0].offsetWidth + gap;
    track.style.transform = 'translateX(-' + (currentIndex * cardWidth) + 'px)';

    // Atualiza dots
    const dots = dotsContainer.querySelectorAll('.carrossel__dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentIndex);
      dot.setAttribute('aria-pressed', i === currentIndex ? 'true' : 'false');
    });

    // Atualiza estado dos botões
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex >= maes.length - visibleCount;

    // Anuncia para leitores de tela
    carrossel.setAttribute('aria-label',
      'Histórias de mães atípicas — exibindo história ' + (currentIndex + 1) + ' de ' + maes.length
    );
  }

  function goTo(index) {
    const max = maes.length - visibleCount;
    currentIndex = Math.max(0, Math.min(index, max));
    updateTrack();
  }

  function prev() { goTo(currentIndex - 1); }
  function next() { goTo(currentIndex + 1); }

  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  // Navegação por teclado
  document.addEventListener('keydown', function (e) {
    if (!isCarrosselInViewport()) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  });

  function isCarrosselInViewport() {
    const rect = carrossel.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  // Touch / swipe mobile
  track.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  }, { passive: true });

  // Quantidade de cards visíveis conforme viewport
  function getVisibleCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  // Recalcula ao redimensionar
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const newCount = getVisibleCount();
      if (newCount !== visibleCount) {
        visibleCount = newCount;
        currentIndex = 0;
        renderDots();
      }
      updateTrack();
    }, 100);
  });

  // Init
  renderCards();
  renderDots();
  updateTrack();
})();

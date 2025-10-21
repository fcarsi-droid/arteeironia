// ==============================
// Arte & Ironia — Pop Manifesto
// ==============================

(function(){
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // Atualiza o ano no rodapé
  $('#year').textContent = new Date().getFullYear();

  // Carrossel
  const carousel = $('.carousel');
  if (!carousel) return;

  const slides = $$('.slide', carousel);
  const dots = $$('.dot', carousel);
  const prev = $('.ctrl.prev', carousel);
  const next = $('.ctrl.next', carousel);

  let current = 0;
  let timer = null;
  const interval = parseInt(carousel.dataset.interval || '5000', 10);

  function goTo(index){
    const total = slides.length;
    const nextIndex = (index + total) % total;

    slides.forEach((s, i) => s.classList.toggle('is-active', i === nextIndex));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === nextIndex));
    current = nextIndex;
  }

  function autoplayStart(){
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), interval);
  }

  prev.addEventListener('click', () => { goTo(current - 1); autoplayStart(); });
  next.addEventListener('click', () => { goTo(current + 1); autoplayStart(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); autoplayStart(); }));

  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', autoplayStart);

  goTo(0);
  autoplayStart();

  // Scroll suave do menu
  $$('.main-nav a').forEach(a => {
    a.addEventListener('click', e => {
      const hash = a.getAttribute('href');
      if (hash.startsWith('#')){
        e.preventDefault();
        $(hash).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Links oficiais de cada coleção (dados do CSV)
  const collectionLinks = {
    "Capivarinhas": "https://reserva.ink/arteironia/product/colecao-capivarinhas-1c3a4189-df0d-49d9-b447-5f4611ddf6e0",
    "Divas que eu amo": "https://reserva.ink/arteironia/product/divas-que-eu-amo-875a8d79-3838-49b4-be47-e95d06d26cf0",
    "Movie Mania": "https://reserva.ink/arteironia/product/movie-mania-24ee2b65-3037-4414-93c2-dcdfc2dd107c",
    "Ofensiva & Irônica": "https://reserva.ink/arteironia/product/ofensiva-ironica-ed697876-c0f7-417e-80b8-87bbb0aa0708",
    "Pet": "https://reserva.ink/arteironia/product/colecao-pet-4f6dbd26-333d-4bcf-9a5c-d2a5dcfe00e1",
    "Pride 80’s": "https://reserva.ink/arteironia/product/pride-80-s-733e3a46-8dae-4187-a13d-a54a90b0df67",
    "Representa": "https://reserva.ink/arteironia/product/colecao-representa-f5f5e3ec-2222-4491-bb40-7797cc52f919",
    "Ursinhos Raivosos": "https://reserva.ink/arteironia/product/ursinhos-raivosos-673c6ca2-dd9f-4ba3-a235-d51da32bbc07"
  };

  // Ação dos botões "Ver Coleção"
  $$('.see-collection').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.collection;
      const url = collectionLinks[key];
      if (url){
        window.open(url, '_blank', 'noopener');
      } else {
        alert('O link desta coleção será ativado em breve. 😉');
      }
    });
  });

})();
/* toggle do menu */
const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');

menu.addEventListener('click', () => {
  if (!navLinks.classList.contains('active')){
    /* animação de entrada */
    navLinks.classList.add('active');
    navLinks.classList.remove('deactive');
  } else {
    /* animação de saída */
    navLinks.classList.add('deactive');
    navLinks.classList.remove('active');
  }
});
const links = document.querySelectorAll('.nav-links a');

links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.add('deactive');
    navLinks.classList.remove('active');
  });
});

const carousel = document.querySelector('.carousel');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

/* Duplicar itens para loop infinito */
carousel.innerHTML += carousel.innerHTML;

/* Função para checar e resetar scroll */
function checkScroll() {
  const scrollWidth = carousel.scrollWidth / 2; // metade original
  if (carousel.scrollLeft >= scrollWidth) {
    carousel.scrollLeft -= scrollWidth;
  } else if (carousel.scrollLeft <= 0) {
    carousel.scrollLeft += scrollWidth;
  }
}

/* Avançar */
nextBtn.addEventListener('click', () => {
  const scrollAmount = carousel.offsetWidth; // rola a largura visível
  carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  setTimeout(checkScroll, 500);
});

/* Voltar */
prevBtn.addEventListener('click', () => {
  const scrollAmount = carousel.offsetWidth;
  carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  setTimeout(checkScroll, 500);
});

/* Scroll automático */
setInterval(() => {
  const scrollAmount = carousel.offsetWidth / 2; // metade da largura visível
  carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  setTimeout(checkScroll, 500);
}, 3000);

/* Resetar scroll ao redimensionar*/
window.addEventListener('resize', () => {
  carousel.scrollLeft = 0;
});

const games = [
  { name: "Stray", img: "img/stray poster.png" },
  { name: "Little Nightmares", img: "img/pesadelinhos poster.png" },
  { name: "The Stanley Parable", img: "img/stanley poster.png" },
  { name: "Omori", img: "img/omori poster.png" },
  { name: "Spooky's Mansion", img: "img/spookys poster.png" },
  { name: "Buckshot Roulette", img: "img/buckshot poster.png" },
  { name: "Gris", img: "img/gris poster.png" },
  { name: "Stardew Valley", img: "img/stardew poster.png" },
  { name: "Hollow Knight", img: "img/holows poster.png" },
];

/* filtro de pesquisa */
function filterGames() {
  /* pega o texto no imput de pesquisa, converte pra minúsculo pra comparar sem diferenciar maiúscula/ minúscula */
  const query = document.getElementById('search-input').value.toLowerCase();
  /* seleciona a rea onde os resultados serão exibidos*/
  const searchResults = document.getElementById('search-results');
  /* limpa os resultados anteriores sempre q o usuario pesquisa outro jogo */
  searchResults.innerHTML = "";

  if (!query) { /* se o campo de pesquisa estiver vazio, esconde a área de resultados */
    searchResults.classList.add("hidden");
    return;
  }

  const filtered = games.filter(g => g.name.toLowerCase().startsWith(query));

  if (filtered.length === 0) {
    searchResults.innerHTML = "<p>Nenhum jogo encontrado.</p>";
  } else {
    filtered.forEach(g => {
      const div = document.createElement('div');
      div.className = 'game-results';
      div.innerHTML = `
        <img src="${g.img}" alt="${g.name}">
      `;
      searchResults.appendChild(div);
    });
  }

  searchResults.classList.remove("hidden");
}

/* SEÇÃO PRODUTOS */
/* filtro e busca */
const search = document.getElementById('search');
const filtro = document.getElementById('filtro');
const products = document.querySelectorAll('.product-card');

/* filtro de busca */
search.addEventLiestener('input', () => {
  const value = search.value.toLowerCase();
  products.forEach(p => {
  const title = p.querySelector('h3').textContent.toLowerCase();
  p.style.display = title.includes(value) ? 'block' : 'none';
  });
});

/* filtro por categoria */
filtro.addEventListener('change', () => {
      const type = filter.value;
      products.forEach(p => {
        if (type === 'all' || p.dataset.type === type) {
          p.style.display = 'block';
        } else {
          p.style.display = 'none';
        }
      });
    });
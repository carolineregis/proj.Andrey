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

/* efeito carrossel de posters */
const carousel = document.querySelector('.carousel');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

const scrollAmount = 300; // pixels por clique

/* Ajustar scroll inicial para o começo do primeiro conjunto */
carousel.scrollLeft = 0;

// Avançar 
nextBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  setTimeout(checkScroll, 500); // timeout para esperar o scroll smooth
});

// Voltar
prevBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  setTimeout(checkScroll, 500);
});

// Função que “reseta” o scroll para efeito infinito
function checkScroll() {
  const maxScroll = carousel.scrollWidth / 1.5; // metade total
  if (carousel.scrollLeft >= maxScroll) {
    // chegamos no final, resetar para o começo do original
    carousel.scrollLeft = carousel.scrollLeft - maxScroll;
  } else if (carousel.scrollLeft <= 0) {
    // chegamos no começo, resetar para o final do original
    carousel.scrollLeft = carousel.scrollLeft + maxScroll;
  }
}

/* SCROLL AUTOMÁTICO */
setInterval(() => {
  carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  setTimeout(checkScroll, 500);
}, 3000); 

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

  const filtered = games.filter(g => g.name.toLowerCase().includes(query));

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


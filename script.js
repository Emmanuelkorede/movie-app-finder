const API_KEY = "43954cb5";
const movieInput = document.getElementById('movie-title');
const movieContainer = document.querySelector('.movie-container');

movieContainer.addEventListener('click', (e) => {
  const card = e.target.closest('.movie-card'); 
  if (card) {
    const id = card.dataset.id;
    window.location.href = `viewed.html?id=${id}`;
  }
});


let currentPage = 1;
let currentQuery = 'avengers';

async function loadMovieONLoad(page = 1) { 
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${currentQuery}&page=${page}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === "True") {
      const moviesHTML = data.Search.map(movie => `
        <div class="movie-card" data-id="${movie.imdbID}">
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150x200?text=No+Image'}" alt="${movie.Title}">
          <h4>${movie.Title}</h4>
          <p>${movie.Year}</p>
        </div>
      `).join('');
      movieContainer.innerHTML += moviesHTML;
    } else {
      movieContainer.innerHTML = '<p>❌ No movies found. Try searching for something else!</p>';
    }
  }
  catch (error) {
    movieContainer.innerHTML = '<p>⚠️ Something went wrong. Please try again later.</p>';
  }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    currentPage++;
    loadMovieONLoad(currentPage);
  }
});

document.querySelector('.search-button').addEventListener('click', () => {
  const title = movieInput.value.trim();
  seacrhMovie(title);
});

let timeoutId;
movieInput.addEventListener('input', () => {
  const title = movieInput.value.trim();

  clearTimeout(timeoutId);

  if (title === '') {
    movieContainer.innerHTML = '';
    currentPage = 1;
    currentQuery = 'avengers';
    loadMovieONLoad();
    return;
  }

  timeoutId = setTimeout(() => {
    seacrhMovie(title);
  }, 500);
});


async function seacrhMovie(title) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === 'False') {
      movieContainer.innerHTML = '<p>❌ Movie not found. Try another title!</p>';
      return;
    }

    movieContainer.innerHTML = data.Search.map(movies => `
      <div class="movie-card" data-id="${movies.imdbID}">
        <img src="${movies.Poster !== 'N/A' ? movies.Poster : 'https://via.placeholder.com/150x200?text=No+Image'}" alt="${movies.Title}">
        <h4>${movies.Title}</h4>
        <p>${movies.Year}</p>
      </div>
    `).join('');
  }
  catch (error) {
    movieContainer.innerHTML = '<p>⚠️ Something went wrong. Please try again later.</p>';
  }
}

loadMovieONLoad();

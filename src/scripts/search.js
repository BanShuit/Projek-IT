// import './sass/main.scss';

import axios from 'axios';
// ----------------------------------------------------------------------------
// Funkcja pobierająca listę gatunków
export async function fetchGenresList() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=d45c591dd3ef2fb9c22b9964b5ee2547`;
  try {
    const response = await axios.get(url);
    return response.data.genres;
  } catch (error) {
    console.error('Wystąpił błąd podczas pobierania listy gatunków:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------------
// wyszukiwarka
export async function searchMovies(searchTerm) {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodedSearchTerm}&api_key=d45c591dd3ef2fb9c22b9964b5ee2547`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Wystąpił błąd podczas wyszukiwania:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------------
//tworzenie kart
export function createCards(dataMovies, genresList) {
  const gallery = document.querySelector('.cards-list');
  dataMovies.forEach(element => {
    const id = element.id;
    const posterPath = element.poster_path;

    const genreIds = element.genre_ids;
    const genreNames = [];
    genreIds.forEach(id => {
      const genre = genresList.find(genre => genre.id === id);
      if (genre) {
        genreNames.push(genre.name);
      } else {
        genreNames.push('Unknown');
      }
    });

    const title = element.title;
    const releaseDate = element.release_date;
    const d = new Date(releaseDate);
    let year = d.getFullYear();

    const card = document.createElement(`div`);
    card.classList.add('card');
    card.innerHTML = `
    <li>
  <div class="card" data-id="${id}">
    <div class="card-img">

    <img src ="https://image.tmdb.org/t/p/original/${posterPath}"/></div>
    <div class="card-text">
      <p class="card-text-title">${title}</p>
      <p class="card-text-genre">${genreNames.join(', ')} | ${year}</p>
    </div>
  </div>
</li>
    `;
    gallery.appendChild(card);
  });
}

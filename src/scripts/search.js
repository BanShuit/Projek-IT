// import axios from 'axios';
import { hideLoader, showLoader } from '../index.js';

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
  try {
    showLoader(); // Wyświetlenie loadera przed wyszukaniem filmów
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodedSearchTerm}&api_key=d45c591dd3ef2fb9c22b9964b5ee2547`;
    const response = await axios.get(url);
    hideLoader(); // Ukrycie loadera po otrzymaniu odpowiedzi
    return response.data;
  } catch (error) {
    hideLoader(); // Ukrycie loadera w przypadku błędu
    console.error('Wystąpił błąd podczas wyszukiwania:', error);
    throw error;
  }
}
// ----------------------------------------------------------------------------
//tworzenie kart
import { getUrlSizePoster } from '../index.js';
export function createCards(dataMovies, genresList) {
  const gallery = document.querySelector('.cards-list');
  gallery.innerHTML = null;
  dataMovies.forEach(element => {
    // movie data
    const id = element.id;
    const title = element.title;
    // posters
    let posterPath = element.poster_path;
    console.log(posterPath);
    let urlW154, urlW185, urlW342, urlW500, urlW780, urlOriginal;
    const noImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
    console.log(noImageUrl);
    if (posterPath === null) {
      urlW154 = noImageUrl;
      urlW185 = noImageUrl;
      urlW342 = noImageUrl;
      urlW500 = noImageUrl;
      urlW780 = noImageUrl;
      urlOriginal = noImageUrl;
    } else {
      urlSizePoster = getUrlSizePoster(posterPath);
      baseW154 = urlSizePoster.find(obj => obj.name === 'w154');
      urlW154 = baseW154.url;
      baseW185 = urlSizePoster.find(obj => obj.name === 'w185');
      urlW185 = baseW185.url;
      baseW342 = urlSizePoster.find(obj => obj.name === 'w342');
      urlW342 = baseW342.url;
      baseW500 = urlSizePoster.find(obj => obj.name === 'w500');
      urlW500 = baseW500.url;
      baseW780 = urlSizePoster.find(obj => obj.name === 'w780');
      urlW780 = baseW780.url;
      baseOriginal = urlSizePoster.find(obj => obj.name === 'original');
      urlOriginal = baseOriginal.url;
    }
    // genres
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
    // year
    const releaseDate = element.release_date;
    const d = new Date(releaseDate);
    let year;
    if (releaseDate === NaN || releaseDate === 0 || releaseDate === ``) {
      year = ``;
    } else {
      year = d.getFullYear();
    }
    // new card
    const card = document.createElement(`div`);
    card.classList.add('card');
    card.innerHTML = `
    <li>
  <div class="card" data-id="${id}">
    <div class="card-img">
    <img class="card-img"
                  alt="${title}"
                  src="${urlW154}"
                  srcset="
                    ${urlW185} 185w,
                    ${urlW342} 342w,
                    ${urlW500} 500w,
                    ${urlW780} 780w,
                     ${urlOriginal} 2000w
                  "
                  sizes="(min-width: 1157px) 780px, (min-width: 768px) 500px, (max-width: 767px) 342px, 100vw"
                />
    </div>
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
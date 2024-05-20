'use strict';
import './sass/main.scss';

//Import
import axios from 'axios';
// -------------KonradKonik
//ApiKey
const apiKey = '6bb894494c1a707618648b9164f393c2';
const AXIOS_AUTHORIZATION =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmI4OTQ0OTRjMWE3MDc2MTg2NDhiOTE2NGYzOTNjMiIsInN1YiI6IjVlZDdiZmY3ZTRiNTc2MDAyMDM3NjYzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kRGs0WRoomKwYXT7Mt8PNU2Zk6kAVasud5CyVVdf2mA';
//Axios header - api key
axios.defaults.headers.common['Authorization'] = AXIOS_AUTHORIZATION;

// Loader - klaudia
const loader = document.querySelector('.loader');
export function showLoader() {
  loader.style.display = 'block';
  gallery.style.display = 'none';
  paginationButtons.style.display = 'none';
}
export function hideLoader() {
  loader.style.display = 'none';
  gallery.style.display = 'flex';
  paginationButtons.style.display = 'flex';
}
// hideLoader(); // Ukrycie loadera na początku

//DOM
const homeButton = document.querySelector('span#logo');
const gallery = document.querySelector('ul#cards-list');
//Pagination
const paginationButtons = document.querySelector('div#pagination-new');
const pagination = document.querySelector('ul#pagination-new-list');
const paginationButtonLeft = paginationButtons.querySelector('button#pagination-btn-left');
const paginationButtonRight = paginationButtons.querySelector('button#pagination-btn-right');
//-----------PaginationEnd
//Listeners
homeButton.addEventListener('click', ev => {
  ev.preventDefault();
  const pageNumber = 1;
  getMostPopularMovies(pageNumber);
});
//Global variables
let noEventListener = true; //zmienna do funkcji paginacji

//Start strony
getMostPopularMovies(1);

//Functions
/**
 *getMostPopularMoviesTmdbApi
 ** Pobiera dane o najpopularniejszych filmach z API TMDb.
 * @param {number} currentPage Numer bieżącej strony do pobrania.
 * @returns {Promise<any>} Dane o najpopularniejszych filmach.
 */
async function getMostPopularMoviesTmdbApi(currentPage) {
  const searchParams = new URLSearchParams({
    language: 'en-US',
    page: currentPage,
  });
  const url = `https://api.themoviedb.org/3/trending/movie/day?${searchParams}`;
  const response = await axios.get(url);
  return response.data;
}
/**
 * getMostPopularMovies
 ** Pobiera dane o najpopularniejszych filmach z określonej strony i renderuje je na stronie.
 * @param {number} pageNumber - Numer strony do pobrania danych o najpopularniejszych filmach.
 * @returns {void}
 */
function getMostPopularMovies(pageNumber) {
  if (pageNumber > 500) {
    pageNumber = 500;
  }
  showLoader(); // Wyświetlenie loadera przed wyszukaniem filmów
  getMostPopularMoviesTmdbApi(pageNumber)
    .then(dataMovies => {
      renderMovies(dataMovies);
      hideLoader(); // Ukrycie loadera po otrzymaniu odpowiedzi
    })
    .catch(error => {
      console.error(error);
      hideLoader(); // Ukrycie loadera po otrzymaniu odpowiedzi
    });
}
/**
 *renderMovies
 ** Renderuje filmy na stronie internetowej na podstawie danych o filmach.
 * @param {object} dataMovies - Obiekt zawierający dane o filmach.
 * @param {number} dataMovies.total_pages - Całkowita liczba stron filmów.
 * @param {number} dataMovies.page - Aktualna strona.
 * @param {Array} dataMovies.results - Tablica obiektów zawierających dane o pojedynczych filmach.
 * @param {number} dataMovies.results[].id - Identyfikator filmu.
 * @param {string} dataMovies.results[].title - Tytuł filmu.
 * @param {string} dataMovies.results[].poster_path - Ścieżka do pliku z obrazem plakatu filmowego.
 * @param {string} dataMovies.results[].release_date - Data premiery filmu.
 * @param {Array} dataMovies.results[].genre_ids - Tablica identyfikatorów gatunków filmowych.
 * @returns {void}
 */
function renderMovies(dataMovies) {
  gallery.innerHTML = null;
  let totalPages = dataMovies.total_pages;
  if (totalPages > 500) {
    totalPages = 500;
  }
  const currentPage = dataMovies.page;
  const filmsList = dataMovies.results
    .map(({ id, title, poster_path, release_date, genre_ids }) => {
      //Img
      const urlSizePoster = getUrlSizePoster(poster_path);
      const urlW92 = urlSizePoster.find(obj => obj.name === 'w92');
      const urlW154 = urlSizePoster.find(obj => obj.name === 'w154');
      const urlW185 = urlSizePoster.find(obj => obj.name === 'w185');
      const urlW342 = urlSizePoster.find(obj => obj.name === 'w342');
      const urlW500 = urlSizePoster.find(obj => obj.name === 'w500');
      const urlW780 = urlSizePoster.find(obj => obj.name === 'w780');
      const urlOriginal = urlSizePoster.find(obj => obj.name === 'original');

      const genres = getGenres(genre_ids);
      const year = release_date.split('-')[0];

      return `<li class="card-element">
            <div class="card" data-id="${id}">
              <div >
                <img class="card-img"
                  alt="${title}"
                  src="${urlW154.url}"
                  srcset="
                    ${urlW185.url} 185w,
                    ${urlW342.url} 342w,
                    ${urlW500.url} 500w,
                    ${urlW780.url} 780w,
                     ${urlOriginal.url} 2000w
                  "
                  sizes="(min-width: 1157px) 780px, (min-width: 768px) 500px, (max-width: 767px) 342px, 100vw"
                />
              </div>
              <div class="card-text">
                <p class="card-text-title">${title}</p>
                <p class="card-text-genre">${genres} | ${year}</p>
              </div>
            </div>
          </li>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', filmsList);
  if (createPaginationNew) {
    createPaginationNew(totalPages, currentPage, getMostPopularMovies);
  }
}

/**
 *createPaginationNew
 ** Tworzy elementy paginacji i dodaje nasłuchiwacze zdarzeń dla kliknięć na te elementy.
 *
 * @param {number} totalPages - Całkowita liczba stron.
 * @param {number} page - Numer bieżącej strony.
 * @param {function(number): void} callback - Funkcja wywoływana po kliknięciu elementu paginacji, przyjmująca numer nowej strony.
 * @returns {string} HTML string z wygenerowanymi elementami paginacji.
 */
function createPaginationNew(totalPages, page, callback) {
  let liTag = '';
  let currentPage;
  let active;
  let beforePage = page - 2;
  let afterPage = page + 2;

  if (page >= 1) {
    paginationButtonLeft.dataset.page = `${page - 1}`;
    if (page === 1) {
      paginationButtonLeft.disabled = true;
    } else {
      paginationButtonLeft.disabled = false;
    }
    if (window.matchMedia('(min-width: 768px)').matches) {
      if (page > 3) {
        liTag += `<li class="pagination-new-numb" data-page="1"><span>1</span></li>`;
        if (page > 4) {
          liTag += `<li class="pagination-new-dots">...</li>`;
        }
      }
    }

    if (page == totalPages) {
      beforePage = beforePage - 1;
    } else if (page == totalPages - 1) {
      beforePage = beforePage;
    }
    if (page == 1) {
      afterPage = afterPage + 1;
    } else if (page == 2) {
      afterPage = afterPage;
    }

    for (var plength = beforePage; plength <= afterPage; plength++) {
      if (plength > totalPages) {
        continue;
      }
      if (plength <= 0) {
        continue;
      }
      if (page == plength) {
        active = 'active';
        currentPage = "id = 'pagination-current-page'";
      } else {
        active = '';
        currentPage = '';
      }
      liTag += `<li class="pagination-new-numb ${active}" ${currentPage} data-page="${plength}"><span>${plength}</span></li>`;
    }

    if (window.matchMedia('(min-width: 768px)').matches) {
      if (page < totalPages - 2) {
        if (page < totalPages - 3) {
          liTag += `<li class="pagination-new-dots">...</li>`;
        }
        liTag += `<li class="pagination-new-last pagination-new-numb" data-page="${totalPages}"><span>${totalPages}</span></li>`;
      }
    }
    if (page < totalPages) {
      paginationButtonRight.dataset.page = `${page + 1}`;
      paginationButtonRight.disabled = false;
    } else if (page === totalPages) {
      paginationButtonRight.disabled = true;
    }
    pagination.innerHTML = liTag;

    // Add event listeners
    const paginationItems = pagination.querySelectorAll('li[data-page]');
    paginationItems.forEach(item => {
      item.addEventListener('click', event => {
        const newPage = Number(event.currentTarget.getAttribute('data-page'));
        callback(newPage);
      });
    });

    if (noEventListener) {
      paginationButtonLeft.addEventListener('click', event => {
        const newPage = Number(event.currentTarget.getAttribute('data-page'));
        if (newPage >= 1) {
          callback(newPage);
        }
      });

      paginationButtonRight.addEventListener('click', event => {
        const newPage = Number(event.currentTarget.getAttribute('data-page'));
        if (newPage <= totalPages) {
          callback(newPage);
        }
      });
      noEventListener = false;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return liTag;
  }
}

/**
 *getUrlSizePoster
 ** Generuje listę obiektów zawierających URL różnych rozmiarów obrazka.
 * @param {string} posterPath Endpoint ścieżki do pliku obrazka
 * @returns {Object[]} Tablica obiektów zawierających nazwę i URL różnych rozmiarów obrazka.
 */
export function getUrlSizePoster(posterPath) {
  const url = 'https://image.tmdb.org/t/p/';
  const poster_sizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'];
  const postersUrlsObject = poster_sizes.map(size => {
    return {
      name: size,
      url: url + size + posterPath,
    };
  });
  return postersUrlsObject;
}

/**
 *getGenres
 ** Zwraca nazwy gatunków filmowych na podstawie ich identyfikatorów.
 * @param {number[]} genre_ids - Tablica identyfikatorów gatunków filmowych.
 * @returns {string} Nazwy gatunków filmowych, oddzielone przecinkami.
 */
function getGenres(genre_ids) {
  const genres = [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ];
  const matchingGenres = genres
    .filter(genre => genre_ids.includes(genre.id))
    .map(genre => genre.name);

  const genreNames = matchingGenres.join(', ');
  return genreNames;
}

// -------------KonradKonik End

// MartaMajnusz - wyszukiwarka (F10)

import { fetchGenresList, createCards, searchMovies } from './scripts/search.js';

const search = document.querySelector('.search-form');
const cardsList = document.querySelector('ul#cards-list');
let lastSearchTerm;

search.addEventListener('submit', async ev => {
  ev.preventDefault();

  cardsList.innerHTML = ` `;
  const warning = document.querySelector(`p.warning`);
  warning.innerText = ``;
  const searchTerm = ev.currentTarget.elements.searchQuery.value;
  lastSearchTerm = searchTerm;

  try {
    const data = await searchMovies(lastSearchTerm);
    const dataMovies = data.results;
    const genresList = await fetchGenresList();

    if (searchTerm === lastSearchTerm) {
      if (data.results.length === 0) {
        warning.innerText = `Search result not successful. Enter the correct movie name and try again.`;
      } else {
        createCards(dataMovies, genresList);
      }
    }
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  }
});

// modal -----------------------
let selectedMovie;
const modal = document.getElementById('movieModal');
const closeBtn = document.getElementById('closeBtn');
const queueBtn = document.getElementById('addToQueueBtn');
const watchedBtn = document.getElementById('addToWatchedBtn');

// Funkcja do zamykania modala
function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Funkcja do zapisywania kolejki do localStorage
function saveQueueToLocalStorage(queue) {
  localStorage.setItem('movieQueue', JSON.stringify(queue));
}

// Funkcja do zapisywania obejrzanych filmów do localStorage
function saveWatchedToLocalStorage(watched) {
  localStorage.setItem('watchedMovies', JSON.stringify(watched));
}

// Funkcja do dodawania filmu do kolejki
function addToQueue(movie) {
  const queueJSON = localStorage.getItem('movieQueue');
  const queue = JSON.parse(queueJSON) || [];
  queue.push(movie);
  saveQueueToLocalStorage(queue);
}

// Funkcja do dodawania filmu do listy obejrzanych filmów
function addToWatched(movie) {
  const watchedJSON = localStorage.getItem('watchedMovies');
  const watched = JSON.parse(watchedJSON) || [];

  watched.push(movie);

  saveWatchedToLocalStorage(watched);
}

// Dodanie event listenera do przycisku "Add to Watched"
watchedBtn.onclick = function () {
  addToWatched(selectedMovie);
  console.log('Film dodany do obejrzanych:', selectedMovie);
  displayLocalStorageContent();
};

queueBtn.onclick = function () {
  addToQueue(selectedMovie);
  console.log('Film dodany do kolejki:', selectedMovie);
};

// Zamykanie przy kliknięciu na X
closeBtn.onclick = function () {
  closeModal();
};

// Zamykanie przy kliknięciu poza modalem
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

// Zamykanie przy naciśnięciu ESC
document.onkeydown = function (event) {
  if (event.key === 'Escape') {
    closeModal();
    console.log('dziala?');
  }
};

document.body.addEventListener('click', async function (event) {
  console.log('dziala?');
  if (event.target.classList.contains('card-img')) {
    modal.style.display = 'block';

    // USTAWIENIE ID
    const id = event.target.closest('.card').getAttribute('data-id');

    try {
      const data = await fetchMovieDetails(id);
      const movieTitle = data.title;
      const originalTitle = data.original_title;
      const overview = data.overview;
      const popularity = data.popularity;
      const vote = data.vote_average;
      const votes = data.vote_count;
      const poster = data.poster_path;
      const movieGenre = event.target
        .closest('.card')
        .querySelector('.card-text-genre')
        .textContent.split('|')[0]
        .trim();

      const genreAndYear = event.target
        .closest('.card')
        .querySelector('.card-text-genre').textContent;

      console.log(genreAndYear);
      const urlSizePoster = getUrlSizePoster(poster);
      const urlW154 = urlSizePoster.find(obj => obj.name === 'w154');
      const urlW185 = urlSizePoster.find(obj => obj.name === 'w185');
      const urlW342 = urlSizePoster.find(obj => obj.name === 'w342');
      const urlW500 = urlSizePoster.find(obj => obj.name === 'w500');
      const urlW780 = urlSizePoster.find(obj => obj.name === 'w780');
      const urlOriginal = urlSizePoster.find(obj => obj.name === 'original');

      let modalDiv = document.querySelector('#movieModal');

      modalDiv.innerHTML = `  <div id="modalContent" class="modal-content">
      <img id="moviePoster"  src="${urlW154.url}"
      srcset="
        ${urlW185.url} 185w,
        ${urlW342.url} 342w,
        ${urlW500.url} 500w,
        ${urlW780.url} 780w,
         ${urlOriginal.url} 2000w
      "
      sizes="(min-width: 1157px) 780px, (min-width: 768px) 500px, (max-width: 767px) 342px, 100vw" alt="${movieTitle}" />
      <div class="modal-desc">
        <h2 class="movie-title">${movieTitle}</h2>
        <div class="movie-details">

          <ul class="property-list">
            <li>

                <span class="property">Vote / Votes</span>
                <span id="vote" class="value"><span class="first-value">${vote}</span>&nbsp;<span class="value-slash">/</span id="votes">&nbsp; ${votes}</span>

            </li>
            <li>
                <span class="property">Popularity</span>
                <span id="popularity" class="value">${popularity}</span>
            </li>
            <li>
                <span class="property">Original Title</span>
                <span id="original-title" class="value ">${originalTitle}</span>
            </li>
            <li>
                <span class="property">Genre</span>
                <span id="genre" class="value">${movieGenre}</span>
            </li>
        </ul>
          </div>
          <div class="movie-summary"><p>ABOUT</p>
            <p>${overview}</p>
          </div>
          <button id="addToWatchedBtn" class = "modal-button">ADD TO WATCHED</button>
          <button id="addToQueueBtn" class = "modal-button">ADD TO QUEUE</button>

    </div>
    <span id="closeBtn" class="close">&times;</span>`;

      //ustawienie gatunku

      // Przypisz zawartość 'card-text-title' do 'movie-title'
      document.getElementById('addToWatchedBtn').onclick = function () {
        addToWatched(selectedMovie);
        console.log('Film dodany do obejrzanych:', selectedMovie);
        displayLocalStorageContent();
      };

      document.getElementById('addToQueueBtn').onclick = function () {
        addToQueue(selectedMovie);
        console.log('Film dodany do kolejki:', selectedMovie);
      };

      document.getElementById('closeBtn').onclick = function () {
        closeModal();
      };

      selectedMovie = {
        urlW154: urlW154.url,
        urlW185: urlW185.url,
        urlW342: urlW342.url,
        urlW500: urlW500.url,
        urlW780: urlW780.url,
        movieTitle: movieTitle,
        movieId: id,
        movieGenreAndYear: genreAndYear,
      };
    } catch (error) {
      console.error('Wystąpił błąd podczas pobierania szczegółów filmu:', error);
    }
  }
});

// dane z Api do modala
async function fetchMovieDetails(id) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=d45c591dd3ef2fb9c22b9964b5ee2547`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error('Wystąpił błąd podczas wyszukiwania:', error);
    throw error;
  }
}
function displayLocalStorageContent() {
  setTimeout(() => {
    const movieQueueJSON = localStorage.getItem('movieQueue');
    const watchedMoviesJSON = localStorage.getItem('watchedMovies');

    console.log('Movie Queue:', JSON.parse(movieQueueJSON));
    console.log('Watched Movies:', JSON.parse(watchedMoviesJSON));
  }, 1000); // Opóźnienie wynosi 1 sekundę (1000 milisekund)
}

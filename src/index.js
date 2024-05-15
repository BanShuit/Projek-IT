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

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

hideLoader(); // Ukrycie loadera na początku

export async function getMostPopularMoviesTmdbApi(currentPage) {
  const searchParams = new URLSearchParams({
    language: 'en-US',
    page: currentPage,
  });
  const url = `https://api.themoviedb.org/3/trending/movie/day?${searchParams}`;
  const response = await axios.get(url);
  console.log(url);
  return response.data;
}

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

export function getGenres(genre_ids) {
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

//DOM
const homeButton = document.querySelector('button#search-button');
const gallery = document.querySelector('ul#cards-list');

// homeButton.addEventListener('click', ev => {
//   pageNumber = 1;
//   getMostPopularMovies(pageNumber);
// });

//Functions
function getMostPopularMovies(pageNumber) {
  getMostPopularMoviesTmdbApi(pageNumber)
    .then(dataMovies => {
      getTmdbConfiguration();
      renderMovies(dataMovies);
    })
    .catch(error => {
      console.log(error);
    });
}

function renderMovies(dataMovies) {
  gallery.innerHTML = null;
  const totalPages = dataMovies.total_pages;

  const filmsList = dataMovies.results
    .map(({ id, title, poster_path, release_date, genre_ids }) => {
      //Img
      const urlSizePoster = tmdb.getUrlSizePoster(poster_path);
      const urlW92 = urlSizePoster.find(obj => obj.name === 'w92');
      const urlW154 = urlSizePoster.find(obj => obj.name === 'w154');
      const urlW185 = urlSizePoster.find(obj => obj.name === 'w185');
      const urlW342 = urlSizePoster.find(obj => obj.name === 'w342');
      const urlW500 = urlSizePoster.find(obj => obj.name === 'w500');
      const urlW780 = urlSizePoster.find(obj => obj.name === 'w780');
      const urlOriginal = urlSizePoster.find(obj => obj.name === 'original');

      const genres = tmdb.getGenres(genre_ids);
      const year = release_date.split('-')[0];

      return `<li>
            <div class="card" data-id="${id}">
              <div >
                <img class="card-img"
                  alt="${title}"
                  src="${urlW154.url}"
                  srcset="
                    ${urlW185.url} 185w,
                    ${urlW342.url} 342w,
                    ${urlW500.url} 500w,
                    ${urlW780.url} 780w
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

  let kontrolkaDoPaginacji = 0; //nazwaKontrolkiDoPaginacji
  kontrolkaDoPaginacji = totalPages;
  gallery.insertAdjacentHTML('beforeend', filmsList);
}
// -------------KonradKonik End

// MartaMajnusz - wyszukiwarka (F10)
import { searchMovies, fetchGenresList, createCards } from './scripts/search.js';

const search = document.querySelector('.search-form');
const cardsList = document.querySelector('ul#cards-list');
let lastSearchTerm;

search.addEventListener('submit', async ev => {
  ev.preventDefault();
  cardsList.innerHTML = ` `;
  const warning = document.querySelector(`p.warning`);
  const searchTerm = ev.currentTarget.elements.searchQuery.value;
  lastSearchTerm = searchTerm;

  try {
    const data = await searchMovies(lastSearchTerm);
    const dataMovies = data.results;
    const genresList = await fetchGenresList();

    if (searchTerm === lastSearchTerm) {
      if (data.results.length === 0) {
        console.log(`Nie znaleziono filmów`);
        warning.innerText = `Search result not successful. Enter the correct movie name and`;
      } else {
        createCards(dataMovies, genresList);
      }
    }
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  }
});

// Marta - koniec

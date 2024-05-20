// import axios from 'axios';
// import { getUrlSizePoster } from '..';

// let selectedMovie;
// const modal = document.getElementById('movieModal');
// const closeBtn = document.getElementById('closeBtn');
// const queueBtn = document.getElementById('addToQueueBtn');
// const watchedBtn = document.getElementById('addToWatchedBtn');

// // Funkcja do zamykania modala
// function closeModal() {
//   modal.style.display = 'none';
//   document.body.style.overflow = 'auto';
// }

// // Funkcja do zapisywania kolejki do localStorage
// function saveQueueToLocalStorage(queue) {
//   localStorage.setItem('movieQueue', JSON.stringify(queue));
// }

// // Funkcja do zapisywania obejrzanych filmów do localStorage
// function saveWatchedToLocalStorage(watched) {
//   localStorage.setItem('watchedMovies', JSON.stringify(watched));
// }

// // Funkcja do dodawania filmu do kolejki
// function addToQueue(movie) {
//   const queueJSON = localStorage.getItem('movieQueue');
//   const queue = JSON.parse(queueJSON) || [];
//   queue.push(movie);
//   saveQueueToLocalStorage(queue);
// }

// // Funkcja do dodawania filmu do listy obejrzanych filmów
// function addToWatched(movie) {
//   const watchedJSON = localStorage.getItem('watchedMovies');
//   const watched = JSON.parse(watchedJSON) || [];

//   watched.push(movie);

//   saveWatchedToLocalStorage(watched);
// }

// // Dodanie event listenera do przycisku "Add to Watched"
// watchedBtn.onclick = function () {
//   addToWatched(selectedMovie);
//   console.log('Film dodany do obejrzanych:', selectedMovie);
//   displayLocalStorageContent();
// };

// queueBtn.onclick = function () {
//   addToQueue(selectedMovie);
//   console.log('Film dodany do kolejki:', selectedMovie);
// };

// // Zamykanie przy kliknięciu na X
// closeBtn.onclick = function () {
//   closeModal();
// };

// // Zamykanie przy kliknięciu poza modalem
// window.onclick = function (event) {
//   if (event.target == modal) {
//     closeModal();
//   }
// };

// // Zamykanie przy naciśnięciu ESC
// document.onkeydown = function (event) {
//   if (event.key === 'Escape') {
//     closeModal();
//     console.log('dziala?');
//   }
// };

// document.body.addEventListener('click', async function (event) {
//   console.log('dziala?');
//   if (event.target.classList.contains('card-img')) {
//     modal.style.display = 'block';

//     // USTAWIENIE ID
//     const id = event.target.closest('.card').getAttribute('data-id');

//     try {
//       const data = await fetchMovieDetails(id);
//       const movieTitle = data.title;
//       const originalTitle = data.original_title;
//       const overview = data.overview;
//       const popularity = data.popularity;
//       const vote = data.vote_average;
//       const votes = data.vote_count;
//       const poster = data.poster_path;
//       const movieGenre = event.target
//         .closest('.card')
//         .querySelector('.card-text-genre')
//         .textContent.split('|')[0]
//         .trim();

//       const urlSizePoster = getUrlSizePoster(poster);
//       const urlW154 = urlSizePoster.find(obj => obj.name === 'w154');
//       const urlW185 = urlSizePoster.find(obj => obj.name === 'w185');
//       const urlW342 = urlSizePoster.find(obj => obj.name === 'w342');
//       const urlW500 = urlSizePoster.find(obj => obj.name === 'w500');
//       const urlW780 = urlSizePoster.find(obj => obj.name === 'w780');
//       const urlOriginal = urlSizePoster.find(obj => obj.name === 'original');

//       let modalDiv = document.querySelector('#movieModal');

//       modalDiv.innerHTML = `  <div id="modalContent" class="modal-content">
//       <img id="moviePoster"  src="${urlW154.url}"
//       srcset="
//         ${urlW185.url} 185w,
//         ${urlW342.url} 342w,
//         ${urlW500.url} 500w,
//         ${urlW780.url} 780w,
//          ${urlOriginal.url} 2000w
//       "
//       sizes="(min-width: 1157px) 780px, (min-width: 768px) 500px, (max-width: 767px) 342px, 100vw" alt="${movieTitle}" />
//       <div class="modal-desc">
//         <h2 class="movie-title">${movieTitle}</h2>
//         <div class="movie-details">

//           <ul class="property-list">
//             <li>

//                 <span class="property">Vote / Votes</span>
//                 <span id="vote" class="value"><span class="first-value">${vote}</span>&nbsp;<span class="value-slash">/</span id="votes">&nbsp; ${votes}</span>

//             </li>
//             <li>
//                 <span class="property">Popularity</span>
//                 <span id="popularity" class="value">${popularity}</span>
//             </li>
//             <li>
//                 <span class="property">Original Title</span>
//                 <span id="original-title" class="value ">${originalTitle}</span>
//             </li>
//             <li>
//                 <span class="property">Genre</span>
//                 <span id="genre" class="value">${movieGenre}</span>
//             </li>
//         </ul>
//           </div>
//           <div class="movie-summary"><p>ABOUT</p>
//             <p>${overview}</p>
//           </div>
//           <button id="addToWatchedBtn" class = "modal-button">ADD TO WATCHED</button>
//           <button id="addToQueueBtn" class = "modal-button">ADD TO QUEUE</button>

//     </div>
//     <span id="closeBtn" class="close">&times;</span>`;

//       //ustawienie gatunku

//       // Przypisz zawartość 'card-text-title' do 'movie-title'
//       document.getElementById('addToWatchedBtn').onclick = function () {
//         addToWatched(selectedMovie);
//         console.log('Film dodany do obejrzanych:', selectedMovie);
//         displayLocalStorageContent();
//       };

//       document.getElementById('addToQueueBtn').onclick = function () {
//         addToQueue(selectedMovie);
//         console.log('Film dodany do kolejki:', selectedMovie);
//       };

//       document.getElementById('closeBtn').onclick = function () {
//         closeModal();
//       };

//       selectedMovie = {
//         urlW154: urlW154.url,
//         urlW185: urlW185.url,
//         urlW342: urlW342.url,
//         urlW500: urlW500.url,
//         urlW780: urlW780.url,
//         movieTitle: movieTitle,
//         movieGenre: movieGenre,
//         movieId: id,
//       };
//     } catch (error) {
//       console.error('Wystąpił błąd podczas pobierania szczegółów filmu:', error);
//     }
//   }
// });

// // dane z Api do modala
// async function fetchMovieDetails(id) {
//   try {
//     const url = `https://api.themoviedb.org/3/movie/${id}?api_key=d45c591dd3ef2fb9c22b9964b5ee2547`;
//     const response = await axios.get(url);

//     return response.data;
//   } catch (error) {
//     console.error('Wystąpił błąd podczas wyszukiwania:', error);
//     throw error;
//   }
// }
// function displayLocalStorageContent() {
//   setTimeout(() => {
//     const movieQueueJSON = localStorage.getItem('movieQueue');
//     const watchedMoviesJSON = localStorage.getItem('watchedMovies');

//     console.log('Movie Queue:', JSON.parse(movieQueueJSON));
//     console.log('Watched Movies:', JSON.parse(watchedMoviesJSON));
//   }, 1000); // Opóźnienie wynosi 1 sekundę (1000 milisekund)
// }

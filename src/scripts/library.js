// // owner: Marta Majnusz

// //tworzenie kart w bibliotece - tu są zmiany
// export function showLibrary(savedCards) {
//   const gallery = document.querySelector('.cards-list');
//   gallery.innerHTML = null;

//   savedCards.forEach(el => {
//     const card = document.createElement(`div`);
//     const id = el.movieId;
//     const title = el.movieTitle;
//     const urlW154 = el.urlW154;
//     const urlW185 = el.urlW185;
//     const urlW342 = el.urlW342;
//     const urlW500 = el.urlW500;
//     const urlW780 = el.urlW780;
//     const urlOriginal = el.urlOriginal;
//     const genreAndYear = el.movieGenreAndYear;
//     console.log(el.genreAndYear);
//     card.classList.add('card');
//     card.innerHTML = `
//         <li>
//       <div class="card" data-id="${id}">
//         <div class="card-img">
//         <img class="card-img"
//         alt="${title}"
//         src="${urlW154}"
//         srcset="
//           ${urlW185} 185w,
//           ${urlW342} 342w,
//           ${urlW500} 500w,
//           ${urlW780} 780w,
//            ${urlOriginal} 2000w
//         "
//         sizes="(min-width: 1157px) 780px, (min-width: 768px) 500px, (max-width: 767px) 342px, 100vw"
//       />
//         </div>
//         <div class="card-text">
//           <p class="card-text-title">${title}</p>
//           <p class="card-text-genre">${genreAndYear}</p>
//         </div>
//       </div>
//     </li>
//         `;
//     gallery.appendChild(card);
//   });
// }

// const libraryWatchedBtn = document.querySelector('button.watch-btn');
// const libraryQueueBtn = document.querySelector('button.queue-btn');

// libraryWatchedBtn.addEventListener('click', runWatched);
// libraryQueueBtn.addEventListener('click', runQueue);

// function runWatched() {
//   libraryWatchedBtn.classList.add('library-btn-active');
//   libraryQueueBtn.classList.remove('library-btn-active');
//   const storedData = localStorage.getItem('watchedMovies');
//   const watchedCards = storedData ? JSON.parse(storedData) : [];
//   showLibrary(watchedCards);
//   console.log(watchedCards);
// }

// function runQueue() {
//   libraryQueueBtn.classList.add('library-btn-active');
//   libraryWatchedBtn.classList.remove('library-btn-active');
//   const storedData = localStorage.getItem('movieQueue');
//   const queueCards = storedData ? JSON.parse(storedData) : [];
//   showLibrary(queueCards);
// }
window.onload = function runLibrary() {
  const storedData = localStorage.getItem('watchedMovies');
  const watchedCards = storedData ? JSON.parse(storedData) : [];
  showLibrary(watchedCards);
  paginationButtons.style.display = 'none';
};

//tworzenie kart w bibliotece - tu są zmiany
export function showLibrary(savedCards) {
  const gallery = document.querySelector('.cards-list');
  gallery.innerHTML = null;

  savedCards.forEach(el => {
    const card = document.createElement(`div`);
    const id = el.movieId;
    const title = el.movieTitle;
    const urlW154 = el.urlW154;
    const urlW185 = el.urlW185;
    const urlW342 = el.urlW342;
    const urlW500 = el.urlW500;
    const urlW780 = el.urlW780;
    const urlOriginal = el.urlOriginal;
    const genreAndYear = el.movieGenreAndYear;
    console.log(el.genreAndYear);
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
          <p class="card-text-genre">${genreAndYear}</p>
        </div>
      </div>
    </li>
        `;
    gallery.appendChild(card);
  });
}

const paginationButtons = document.querySelector('div#pagination-new');

const libraryWatchedBtn = document.querySelector('button.watch-btn');
const libraryQueueBtn = document.querySelector('button.queue-btn');

libraryWatchedBtn.addEventListener('click', runWatched);
libraryQueueBtn.addEventListener('click', runQueue);

function runWatched() {
  libraryWatchedBtn.classList.add('library-btn-active');
  libraryQueueBtn.classList.remove('library-btn-active');
  const storedData = localStorage.getItem('watchedMovies');
  const watchedCards = storedData ? JSON.parse(storedData) : [];
  showLibrary(watchedCards);
  paginationButtons.style.display = 'none';
}

function runQueue() {
  libraryQueueBtn.classList.add('library-btn-active');
  libraryWatchedBtn.classList.remove('library-btn-active');
  const storedData = localStorage.getItem('movieQueue');
  const queueCards = storedData ? JSON.parse(storedData) : [];
  showLibrary(queueCards);
  paginationButtons.style.display = 'none';
}
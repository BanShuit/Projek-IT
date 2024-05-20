// owner: Marta Majnusz

//tworzenie kart w bibliotece
export function showLibrary(savedCards) {
  const gallery = document.querySelector('.cards-list');
  gallery.innerHTML = null;

  savedCards.forEach(el => {
    const card = document.createElement(`div`);
    const title = el.MovieTitle;
    const imgSrc = el.imgSrc;
    console.log(imgSrc);
    const movieGenre = el.MovieGenre;
    card.classList.add('card');
    card.innerHTML = `
        <li>
      <div class="card" data-id="id">
        <div class="card-img">
        <img class="card-img" alt="${title}" src="${imgSrc}"/>
        </div>
        <div class="card-text">
          <p class="card-text-title">${title}</p>
          <p class="card-text-genre">${movieGenre}</p>
        </div>
      </div>
    </li>
        `;
    gallery.appendChild(card);
  });
}

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
  console.log(watchedCards);
}

function runQueue() {
  libraryQueueBtn.classList.add('library-btn-active');
  libraryWatchedBtn.classList.remove('library-btn-active');
  const storedData = localStorage.getItem('movieQueue');
  const queueCards = storedData ? JSON.parse(storedData) : [];
  showLibrary(queueCards);
}

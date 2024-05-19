let selectedMovie = {};

const modal = document.getElementById('movieModal');
const closeBtn = document.getElementById('closeBtn');
const queueBtn = document.getElementById('addToQueueBtn');
const watchedBtn = document.getElementById('addToWatchedBtn');

// Funkcja do zamykania modala - nie usuwam eventListenerów, bo ich nie używam
function closeModal() {
  modal.style.display = 'none';
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
  }
};

document.body.addEventListener('click', function (event) {
  if (event.target.classList.contains('card-img')) {
    modal.style.display = 'block';
    // Pobierz wartość atrybutu src klikniętego obrazka
    const imgSrc = event.target.getAttribute('src');

    //ustawienie plakatu
    const moviePoster = document.getElementById('moviePoster');
    moviePoster.src = imgSrc;

    //ustawienie tytułu
    const cardTextTitle = event.target.closest('.card').querySelector('.card-text-title');

    // Wyświetl zawartość 'card-text-title' w konsoli

    const movieTitle = document.querySelector('.movie-title');

    // Przypisz zawartość 'card-text-title' do 'movie-title'
    movieTitle.textContent = cardTextTitle.textContent;

    //ustawienie gatunku
    const cardGenre = event.target.closest('.card').querySelector('.card-text-genre');

    // Wyświetl zawartość 'card-text-title' w konsoli

    const movieGenre = document.querySelector('.value');

    // Przypisz zawartość 'card-text-title' do 'movie-title'
    movieGenre.textContent = cardGenre.textContent;

    selectedMovie = {
      imgSrc: imgSrc,
      MovieTitle: cardTextTitle.textContent,
      MovieGenre: cardGenre.textContent,
    };
  }
});
function displayLocalStorageContent() {
  setTimeout(() => {
    const movieQueueJSON = localStorage.getItem('movieQueue');
    const watchedMoviesJSON = localStorage.getItem('watchedMovies');

    console.log('Movie Queue:', JSON.parse(movieQueueJSON));
    console.log('Watched Movies:', JSON.parse(watchedMoviesJSON));
  }, 1000); // Opóźnienie wynosi 1 sekundę (1000 milisekund)
}

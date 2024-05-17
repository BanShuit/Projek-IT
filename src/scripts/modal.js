const selectedMovie = {};

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

// Otwarcie modala (dla przykładu, otwiera się automatycznie)
window.onload = function () {
  modal.style.display = 'block';
};

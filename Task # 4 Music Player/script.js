const image = document.querySelector('.img-container img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Songs
const songs = [
    { name: 'sugar-brownies', displayName: 'Sugar & Brownies', artist: 'Dharia' },
    { name: 'tourner-dans-le-vide', displayName: 'Tourner Dans Le Vide', artist: 'Indila' },
    { name: 'waiting-for-love', displayName: 'Waiting For Love', artist: 'Avicii' }
];

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp4`;
    image.src = `images/${song.name}.jpg`;
}

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    music.pause();
}

// Play / Pause
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

// Prev
function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}

// Next
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}

// Progress
function updateProgressBar(e) {
    if (!isPlaying) return;

    const { duration, currentTime } = e.srcElement;
    progress.style.width = `${(currentTime / duration) * 100}%`;

    currentTimeEl.textContent =
        `${Math.floor(currentTime / 60)}:${String(Math.floor(currentTime % 60)).padStart(2, '0')}`;

    if (!isNaN(duration)) {
        durationEl.textContent =
            `${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padStart(2, '0')}`;
    }
}

// Seek
progressContainer.addEventListener('click', e => {
    const width = progressContainer.clientWidth;
    music.currentTime = (e.offsetX / width) * music.duration;
});

// Events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);

// Initial load
loadSong(songs[songIndex]);

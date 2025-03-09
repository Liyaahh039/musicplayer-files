const audio = document.getElementById("audio-player");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const title = document.getElementById("music-title");

const songs = [
    { title: "Mariah the Scientist - Spread Thin", src: "Mariah the Scientist - Spread Thin (Audio).mp3" },
    { title: "Justine Skye - Collide ft. Tyga", src: "Justine Skye - Collide ft. Tyga.mp3" },
    { title: "Ariana Grande - Be my baby", src: "Ariana Grande - Be My Baby.mp3" },
    { title: "Summer Walker - Playing Games", src: "Summer Walker - Playing Games (Extended Version) Feat. Bryson Tiller [Official Audio].mp3" },
    { title: "Yad - Miyuze", src: "Yad - Miyuze English.mp3" },
    { title: "Vedo - You Got It", src: "VEDO - You Got It (Lyrics) it's time to boss up fix your credit girl get at it.mp3" },
    { title: "Yuji - Old love", src: "Old Love - Yuji  Putri Dahlia (Official Lyrics Video).mp3" }
];

let currentIndex = 0;

function loadSong(index) {
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
}

playButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playButton.textContent = "Pause";
    } else {
        audio.pause();
        playButton.textContent = "Play";
    }
});

prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
    playButton.textContent = "Pause";
});

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
    playButton.textContent = "Pause";
});

// Charger la première musique au démarrage
loadSong(currentIndex);

audio.addEventListener("ended", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
    playButton.textContent = "Pause";
});

const progressCircle = document.querySelector(".progress-circle");
const progressContainer = document.querySelector(".progress-container");

// Permettre le changement de temps en cliquant sur le cercle
progressCircle.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth; // largeur de la barre de progression
    const clickX = e.offsetX; // position du clic sur le cercle
    const newTime = (clickX / width) * audio.duration; // calcule le nouveau temps
    audio.currentTime = newTime; // met à jour le temps actuel de la musique
});

// Permettre le déplacement du cercle
let isDragging = false;

progressCircle.addEventListener("mousedown", (e) => {
    isDragging = true;
    progressCircle.style.cursor = "grabbing";
    // Empêcher que le clic sur le cercle affecte la position du cercle
    e.stopPropagation();
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    progressCircle.style.cursor = "grab";
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const rect = progressContainer.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        offsetX = Math.max(0, Math.min(offsetX, rect.width)); // Empêcher de dépasser les limites
        const newTime = (offsetX / rect.width) * audio.duration;
        audio.currentTime = newTime;
        progressCircle.style.left = `${(offsetX / rect.width) * 100}%`; // déplace le cercle
    }
});

// Synchroniser le cercle avec la musique
audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressCircle.style.left = `${progressPercent}%`; // fait bouger le cercle selon le temps
});

// TEST/

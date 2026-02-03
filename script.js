const songsData = [
  { songName: 'LEGION a blue song', src: '1.mp3', cover: '1.jpg' },
  { songName: 'CARTEL trap', src: '2.mp3', cover: '2.jpg' },
  { songName: 'THEY MAID lowkey pesci', src: '3.mp3', cover: '3.jpg' },
  { songName: 'RICH THE KID plug walk', src: '4.mp3', cover: '4.jpg' },
  { songName: 'SONG TITLE', src: '5.mp3', cover: '5.jpg' },
  { songName: 'THE SAFETY DANCE', src: '6.mp3', cover: '6.jpg' },
]

const songs = [
  new Audio(songsData[0].src),
  new Audio(songsData[1].src),
  new Audio(songsData[2].src),
  new Audio(songsData[3].src),
  new Audio(songsData[4].src),
  new Audio(songsData[5].src),
]

//conplete 1 bundel of an album
const musicList = document.querySelectorAll(".m");

musicList.forEach((album, i) => {
  const cover = album.querySelector("img");
  cover.src = songsData[i].cover;

  const text = album.querySelector("span");
  text.innerText = songsData[i].songName;
})

//playPause icon in above album
let currentSongIndex = null;//index
const playPause = document.querySelectorAll(".pp");//list btns
const playBtn = document.querySelector(".icon-2")
const gif = document.querySelector("#musicGif");//animaion
let varText = document.querySelector(".musicName span");//bottom text
let textParent = document.querySelector(".musicName");//bottom text

//for list btns
playPause.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    togglePlay(i);
  })
})

//music list
const togglePlay = (i) => {
  //turn off previous music
  if (currentSongIndex !== null && currentSongIndex !== i) {
    songs[currentSongIndex].pause();
    songs[currentSongIndex].currentTime = 0;

    playPause[currentSongIndex].classList.replace("fa-pause", "fa-play");
    playBtn.classList.replace("fa-pause", "fa-play");

    gif.style.opacity = 0;
  }
  //toggle new music
  if (songs[i].paused) {
    songs[i].play()

    playPause[i].classList.replace("fa-play", "fa-pause");
    playBtn.classList.replace("fa-play", "fa-pause");

    currentSongIndex = i;

    gif.style.opacity = 1;
    text(i);
    seek(i);
  } else {
    songs[i].pause()

    playPause[i].classList.replace("fa-pause", "fa-play");
    playBtn.classList.replace("fa-pause", "fa-play");

    gif.style.opacity = 0;
  }
}

//bottom song text
const text = (i) => {
  varText.style.animation = "none"
  varText.innerText = songsData[i].songName;
  if (varText.scrollWidth > textParent.clientWidth) {
    varText.style.animation = "none"
    varText.offsetWidth;
    varText.style.animation = "move 10s linear infinite"
  }
}

//bottom play pause btn
playBtn.addEventListener("click", () => {
  if (currentSongIndex === null) {
    togglePlay(0);
    return;
  }

  if (songs[currentSongIndex].paused) {
    songs[currentSongIndex].play();
    playPause[currentSongIndex].classList.replace("fa-play", "fa-pause")
    playBtn.classList.replace("fa-play", "fa-pause")
    gif.style.opacity = 1;
  } else {
    songs[currentSongIndex].pause();
    playPause[currentSongIndex].classList.replace("fa-pause", "fa-play")
    playBtn.classList.replace("fa-pause", "fa-play")
    gif.style.opacity = 0;
  }
})

//seekBar
let seekBar = document.querySelector("#musicRange");
let varTime = document.querySelector("#currentTime");
const totalTime = document.querySelector("#duration");

let seek = (i) => {
  let audio = songs[i];

  if (audio.readyState >= 1) {
    totalTime.textContent = timeFormat(audio.duration);
    seekBar.value = 0;
  } else {
    audio.onloadedmetadata = () => {
      totalTime.textContent = timeFormat(audio.duration)
      seekBar.value = 0;
    }
  }

  audio.ontimeupdate = () => {
    varTime.textContent = timeFormat(audio.currentTime)
    if (!isNaN(audio.duration)) {
      seekBar.value = (audio.currentTime / audio.duration) * 100;
    }
  };

  // Seek when user moves slider
  seekBar.oninput = () => {
    if (!isNaN(audio.duration)) {
      audio.currentTime = (seekBar.value / 100) * audio.duration;
    }
  };
}

let timeFormat = (time) => {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);

  if (sec < 10) sec = "0" + sec;

  return `${min}:${sec}`;
}

//forward and backward icon 
const forward = document.querySelector(".icon-3")
const backward = document.querySelector(".icon-1")

forward.addEventListener("click", () => {
  let audio = songs[currentSongIndex];
  if (currentSongIndex === null) return;

  audio.currentTime = Math.min(audio.currentTime + 5, audio.duration)
})

backward.addEventListener("click", () => {
  let audio = songs[currentSongIndex];
  if (currentSongIndex === null) return;

  audio.currentTime = Math.max(audio.currentTime - 5, 0)
})

//homeBehaviour
const homeBtn = document.querySelector("#homeIcon");

homeBtn.addEventListener("click", () => {
  if (musicList.length > 0) {
    musicList[0].scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
});

//searchBar logic
const searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase()

  musicList.forEach((songEle, i) => {
    const SongName = songsData[i].songName.toLowerCase();

    if (SongName.includes(query)) {
      songEle.style.display = "flex";
    } else {
      songEle.style.display = "none";
    }
  })
})
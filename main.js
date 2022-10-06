const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
// const musics = ["holo.mp3","summer.mp3","spark.mp3","home.mp3"];
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangerBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicImage = document.querySelector(".music-thumb img");
const musicThumbNail = document.querySelector(".music-thumb");
const playRepeat = document.querySelector(".play-repeat");


let isRepeat = true;
let isPlaying = true;
let indexSong = 0;


displayTimer();
let timer = setInterval(displayTimer,500);
let repeatCount = 0;


const musics = [
    {
        id:1,
        title: "Holo",
        File: "holo.mp3",
        images: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
    },
    {
        id:2,
        title: "summer",
        File: "summer.mp3",
        images: "https://images.unsplash.com/photo-1624749076747-79f933b8b671?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    }
]

playBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click",function() {
    changeSong(1);
});
prevBtn.addEventListener("click",function() {
    changeSong(-1);
});
playRepeat.addEventListener("click",function() {
   if(isRepeat) {
        isRepeat=false;
        playRepeat.removeAttribute("style");

    }
   else {
        isRepeat= true
        playRepeat.style.color = "#ffb86c"; 
}; 
});
song.addEventListener("ended" ,handleChangeSong);
function handleChangeSong() {
    repeatCount++;
    if(isRepeat && repeatCount==1) {
        isPlaying = true;
        playPause();
    } else{
        changeSong(1) ;

    }
}

function changeSong(dir) {
    if (dir===1) {
        //next song
        indexSong++;
        if(indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying=true; 
        timer = setInterval(displayTimer,500);

    } else if(dir=== -1) {
        //back song
        indexSong--;
        if(indexSong <= 0) {
            indexSong = musics.length - 1;
        }
        isPlaying=true; 
        clearInterval(timer); 

    }
    init(indexSong);
    // song.setAttribute("src",`./music/${musics[indexSong].File}`);
    playPause();
}

function playPause() {
    if(isPlaying) {
        musicThumbNail.classList.add("is-playing");
        song.play();
        playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        isPlaying = false;
        clearInterval(times)
    } else{
        musicThumbNail.classList.remove("is-playing");
        song.pause();
        playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        isPlaying = true;
    } 
}



function displayTimer() {
    const { duration, currentTime}     = song;
    rangerBar.max = duration;
    rangerBar.value= currentTime;

    remainingTime.textContent = formatTimes(currentTime); 
    if(!duration) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTimes(duration);
    }
}

function formatTimes(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? '0' + minutes : minutes }:${seconds < 10 ? '0' + seconds : seconds}`;
}

rangerBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
     song.currentTime = rangerBar.value ; 
}

function init(indexSong) {
    displayTimer();
    song.setAttribute("src",`./music/${musics[indexSong].File}`);
    musicImage.setAttribute("src",musics[indexSong].images);
    musicName.textContent= musics[indexSong].title;
}
init(indexSong);


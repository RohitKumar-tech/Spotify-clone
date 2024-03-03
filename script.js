console.log("Welcome to spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById("myProgressBar")
let gif = document.getElementById("gif")
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = document.getElementsByClassName('songItemPlay');

let songs = [
    {songName : "warriyo - Mortals" ,filePath:"songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName : "Cielo - Huma-Huma",filePath:"songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName : "DEAF KEV -  Invincible",filePath:"songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName : "Different Heaven & EH!DE - My Heart",filePath:"songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName : "janji-Heroes-Tonight-feat-Johnn",filePath:"songs/5.mp3", coverPath: "covers/5.jpg"},
]

songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('bx-play-circle');
        masterPlay.classList.add('bx-pause-circle');
        gif.style.opacity = 1;

        songItemPlay[songIndex].classList.remove('bx-play-circle');
        songItemPlay[songIndex].classList.add('bx-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('bx-pause-circle')
        masterPlay.classList.add('bx-play-circle');
        gif.style.opacity = 0;

        songItemPlay[songIndex].classList.remove('bx-pause-circle');
        songItemPlay[songIndex].classList.add('bx-play-circle');
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate' , ()=> {
    console.log('timeupdate');
    // update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    console.log(progress);
    myProgressBar.value = progress;  
})

myProgressBar.addEventListener('change' , ()=> {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        songIndex = parseInt(e.target.id);
        if(audioElement.currentTime <= 0 || audioElement.paused || audioElement.ended){
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            e.target.classList.remove('bx-play-circle');
            e.target.classList.add('bx-pause-circle');
            masterPlay.classList.remove('bx-play-circle');
            masterPlay.classList.add('bx-pause-circle');
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            e.target.classList.remove('bx-pause-circle');
            e.target.classList.add('bx-play-circle');
            masterPlay.classList.remove('bx-pause-circle');
            masterPlay.classList.add('bx-play-circle');
            gif.style.opacity = 0;
        }
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= songs.length - 1){
        songIndex = 0;
        songItemPlay[songs.length - 1].classList.add('bx-play-circle');
        songItemPlay[songs.length - 1].classList.remove('bx-pause-circle');
    }
    else
    {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('bx-play-circle');
    masterPlay.classList.add('bx-pause-circle');
    songItemPlay[songIndex].classList.remove('bx-play-circle');
    songItemPlay[songIndex].classList.add('bx-pause-circle');
    songItemPlay[songIndex-1].classList.add('bx-play-circle');
    songItemPlay[songIndex-1].classList.remove('bx-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0; 
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('bx-play-circle');
    masterPlay.classList.add('bx-pause-circle');
    songItemPlay[songIndex].classList.remove('bx-play-circle');
    songItemPlay[songIndex].classList.add('bx-pause-circle');
    songItemPlay[songIndex+1].classList.add('bx-play-circle');
    songItemPlay[songIndex+1].classList.remove('bx-pause-circle');
})

// ==========================================
// 1. YouTube Background Music Setup & API
// ==========================================
let ytPlayer;

function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('yt-bg-player', {
        height: '100',
        width: '100',
        videoId: 'xns4Az5rl5g', // YouTube Video ID for Perfection (BBIBEEB)
        playerVars: {
            'autoplay': 0,        
            'controls': 0,        
            'loop': 1,            
            'playlist': 'xns4Az5rl5g' 
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(50); 
}

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// ==========================================
// 2. Password Verification System
// ==========================================
function checkPassword() {
    const userInput = document.getElementById("password-input").value;
    const correctPassword = "Wuffya"; 

    if (userInput.toLowerCase() === correctPassword.toLowerCase()) {
        document.getElementById("lock-screen").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
        
        showPage(1);
        
        if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
            ytPlayer.setVolume(50);
            ytPlayer.playVideo();
        }
    } else {
        const errorMsg = document.getElementById("error-msg");
        errorMsg.classList.remove("hidden");
    }
}


// ==========================================
// 3. Voice Memo Controls & Auto-Volume Ducking
// ==========================================
const audio = document.getElementById("birthday-audio");
const playBtn = document.getElementById("play-btn");
const progressBar = document.getElementById("progress-bar");

function toggleAudio() {
    if (audio.paused || audio.ended) {
        audio.play()
            .then(() => {
                playBtn.innerText = "⏸ Pause";
                if (ytPlayer && typeof ytPlayer.setVolume === 'function') {
                    ytPlayer.setVolume(15);
                }
            })
            .catch(err => console.log("Audio play blocked or interrupted:", err));
    } else {
        audio.pause();
        playBtn.innerText = "▶ Play";
        if (ytPlayer && typeof ytPlayer.setVolume === 'function') {
            ytPlayer.setVolume(50);
        }
    }
}

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percentage + "%";
    }
});

audio.addEventListener("ended", () => {
    playBtn.innerText = "▶ Play";
    progressBar.style.width = "0%";
    if (ytPlayer && typeof ytPlayer.setVolume === 'function') {
        ytPlayer.setVolume(50);
    }
});

function seekAudio(event) {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const clickPercentage = clickX / width;
    
    audio.currentTime = clickPercentage * audio.duration;
}


// ==========================================
// 4. Multi-Page Navigation Engine (SPA)
// ==========================================
function showPage(pageNumber) {
    const allPages = document.querySelectorAll('[id^="page-"]');
    
    allPages.forEach(page => {
        page.classList.add("hidden");
    });
    
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        targetPage.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}


// ==========================================
// 5. Video State Handling Functions
// ==========================================
function pauseSurpriseVideo() {
    const video = document.getElementById("surprise-video");
    if (video && !video.paused) {
        video.pause();
    }
}

function pauseVideoAndGoBack() {
    pauseSurpriseVideo();
    showPage(4);
}

function pauseVideoAndGoHome() {
    pauseSurpriseVideo();
    showPage(1);
}

function pauseVideoAndGoNext(targetPage) {
    pauseSurpriseVideo();
    showPage(targetPage);
}

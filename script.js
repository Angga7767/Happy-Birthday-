// ==========================================
// 1. YouTube Background Music Setup & API
// ==========================================
let ytPlayer;

// This function automatically runs when the YouTube API script loads
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('yt-bg-player', {
        height: '100',
        width: '100',
        videoId: 'xns4Azrl5g', // YouTube Video ID for Perfection (BBIBEEB)
        playerVars: {
            'autoplay': 0,        // Handled manually upon unlocking
            'controls': 0,        // Completely invisible/hidden
            'loop': 1,            // Loops background track indefinitely
            'playlist': 'xns4Azrl5g' // Required by YT to make a single video loop
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Set default ambient background volume level (out of 100)
    event.target.setVolume(50); 
}

// Dynamically inject the official YouTube Iframe API script into the document safely
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0]; // FIX: Correctly targeting the first script array index
if (firstScriptTag) {
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
} else {
    document.head.appendChild(tag);
}


// ==========================================
// 2. Password Verification System
// ==========================================
function checkPassword() {
    const userInput = document.getElementById("password-input").value;
    const correctPassword = "Wuffya"; 

    if (userInput.toLowerCase() === correctPassword.toLowerCase()) {
        document.getElementById("lock-screen").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
        
        // Ensure Page 1 is explicitly showing while Page 2 & 3 stay hidden initially
        showPage(1);
        
        // Autoplay the background music as soon as the click unlocks the screen
        if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
            ytPlayer.playVideo();
        }
    } else {
        const errorMsg = document.getElementById("error-msg");
        errorMsg.classList.remove("hidden");
    }
}


// ==========================================
// 3. Audio Player Controls & Volume Ducking
// ==========================================
const audio = document.getElementById("birthday-audio");
const playBtn = document.getElementById("play-btn");
const progressBar = document.getElementById("progress-bar");

function toggleAudio() {
    if (audio.paused || audio.ended) {
        audio.play()
            .then(() => {
                playBtn.innerText = "⏸ Pause";
                
                // DUCK VOLUME: Drop YouTube background music to 15% so your voice note stands out clearly
                if (ytPlayer && typeof ytPlayer.setVolume === 'function') {
                    ytPlayer.setVolume(15);
                }
            })
            .catch(err => console.log("Audio play blocked or interrupted:", err));
    } else {
        audio.pause();
        playBtn.innerText = "▶ Play";
        
        // RESTORE VOLUME: Bring YouTube music back up to normal level when your voice pauses
        if (ytPlayer && typeof ytPlayer.setVolume === 'function') {
            ytPlayer.setVolume(50);
        }
    }
}

// Update the timeline progress bar smoothly as the audio plays
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percentage + "%";
    }
});

// Automatically switch the button back and restore music volume when voice track ends
audio.addEventListener("ended", () => {
    playBtn.innerText = "▶ Play";
    progressBar.style.width = "0%";
    
    if (ytPlayer && typeof ytPlayer.setVolume === 'function') {
        ytPlayer.setVolume(50);
    }
});

// Allows clicking anywhere on the progress line to scrub/seek through the audio track
function seekAudio(event) {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const clickPercentage = clickX / width;
    
    audio.currentTime = clickPercentage * audio.duration;
}


// ==========================================
// 4. Modular Multi-Page Navigation (SPA)
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

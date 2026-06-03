// ==========================================
// 1. Password Verification & Music Launch
// ==========================================
function checkPassword() {
    const userInput = document.getElementById("password-input").value;
    const correctPassword = "Wuffya"; 

    if (userInput.toLowerCase() === correctPassword.toLowerCase()) {
        document.getElementById("lock-screen").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
        
        // Ensure Page 1 layout explicitly initializes properly
        showPage(1);
        
        // CINEMATIC AUTOPLAY: Launch background music instantly from her unlock click
        const bgAudio = document.getElementById("bg-audio");
        if (bgAudio) {
            bgAudio.volume = 0.5; // Set ambient volume at a comfortable 50%
            bgAudio.play().catch(err => console.log("Ambient music playback interaction caught:", err));
        }
    } else {
        const errorMsg = document.getElementById("error-msg");
        errorMsg.classList.remove("hidden");
    }
}


// ==========================================
// 2. Voice Memo Controls & Auto-Volume Ducking
// ==========================================
const audio = document.getElementById("birthday-audio");
const playBtn = document.getElementById("play-btn");
const progressBar = document.getElementById("progress-bar");
const bgAudioElement = document.getElementById("bg-audio");

function toggleAudio() {
    if (audio.paused || audio.ended) {
        audio.play()
            .then(() => {
                playBtn.innerText = "⏸ Pause";
                
                // AUDIO DUCKING: Smoothly drop background track to a soft 15% so your voice stands out
                if (bgAudioElement) {
                    bgAudioElement.volume = 0.15;
                }
            })
            .catch(err => console.log("Audio play blocked or interrupted:", err));
    } else {
        audio.pause();
        playBtn.innerText = "▶ Play";
        
        // RESTORE VOLUME: Bring background music back to 50% ambient level on pause
        if (bgAudioElement) {
            bgAudioElement.volume = 0.5;
        }
    }
}

// Update the timeline progress bar smoothly as your voice plays
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percentage + "%";
    }
});

// Automatically switch back buttons and restore music volume level when track ends
audio.addEventListener("ended", () => {
    playBtn.innerText = "▶ Play";
    progressBar.style.width = "0%";
    
    if (bgAudioElement) {
        bgAudioElement.volume = 0.5;
    }
});

// Allows clicking anywhere on the progress line to scrub/seek through your track
function seekAudio(event) {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const clickPercentage = clickX / width;
    
    audio.currentTime = clickPercentage * audio.duration;
}


// ==========================================
// 3. Modular Multi-Page Navigation (SPA)
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

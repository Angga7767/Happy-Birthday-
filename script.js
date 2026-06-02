// 1. Password Verification
function checkPassword() {
    const userInput = document.getElementById("password-input").value;
    const correctPassword = "Wuffya!"; // Change this to whatever code you want!

    if (userInput.toLowerCase() === correctPassword.toLowerCase()) {
        document.getElementById("lock-screen").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
    } else {
        const errorMsg = document.getElementById("error-msg");
        errorMsg.classList.remove("hidden");
    }
}

// 2. Audio Control Logic
const audio = document.getElementById("birthday-audio");
const playBtn = document.getElementById("play-btn");
const progressBar = document.getElementById("progress-bar");

function toggleAudio() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸ Pause";
    } else {
        audio.pause();
        playBtn.innerText = "▶ Play";
    }
}

// Update progress bar as audio plays
audio.addEventListener("timeupdate", () => {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percentage + "%";
});

// Reset play button when audio ends
audio.addEventListener("ended", () => {
    playBtn.innerText = "▶ Play";
    progressBar.style.width = "0%";
});

// Click to scrub/seek through audio
function seekAudio(event) {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const clickPercentage = clickX / width;
    
    audio.currentTime = clickPercentage * audio.duration;
}
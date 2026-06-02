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
    if (audio.paused || audio.ended) {
        audio.play()
            .then(() => {
                playBtn.innerText = "⏸ Pause";
            })
            .catch(err => console.log("Audio play blocked or interrupted:", err));
    } else {
        audio.pause();
        playBtn.innerText = "▶ Play";
    }
}

// Update progress bar as audio plays
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percentage + "%";
    }
});

// Reset play button automatically when audio finishes
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

function showPage(pageNumber) {
    // 1. Find all elements whose ID starts with "page-"
    const allPages = document.querySelectorAll('[id^="page-"]');
    
    // 2. Loop through every single page and hide it
    allPages.forEach(page => {
        page.classList.add("hidden");
    });
    
    // 3. Un-hide the specific page we want to see
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        targetPage.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
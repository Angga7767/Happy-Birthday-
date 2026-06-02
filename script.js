// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Password
    window.checkPassword = checkPassword;

    // Audio
    const audio = document.getElementById("birthday-audio");
    const playBtn = document.getElementById("play-btn");
    const progressBar = document.getElementById("progress-bar");

    window.toggleAudio = function() {
        if (!audio) return;
        
        if (audio.paused || audio.ended) {
            audio.play().then(() => {
                playBtn.innerHTML = "⏸ Pause";
            }).catch(err => console.error("Playback failed:", err));
        } else {
            audio.pause();
            playBtn.innerHTML = "▶ Play";
        }
    };

    // Progress bar
    audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
            const percentage = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = percentage + "%";
        }
    });

    audio.addEventListener("ended", () => {
        playBtn.innerHTML = "▶ Play";
        progressBar.style.width = "0%";
    });

    window.seekAudio = function(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        audio.currentTime = (clickX / rect.width) * audio.duration;
    };

    // Page navigation
    window.showPage = function(pageNumber) {
        document.querySelectorAll('[id^="page-"]').forEach(page => {
            page.classList.add("hidden");
        });

        const target = document.getElementById(`page-${pageNumber}`);
        if (target) {
            target.classList.remove("hidden");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Make password function global too
    window.checkPassword = function() {
        const input = document.getElementById("password-input").value.trim();
        const correct = "Wuffya!";   // ← change if needed

        if (input.toLowerCase() === correct.toLowerCase()) {
            document.getElementById("lock-screen").classList.add("hidden");
            document.getElementById("main-content").classList.remove("hidden");
            // Optional: auto-play first page animation or something
        } else {
            document.getElementById("error-msg").classList.remove("hidden");
        }
    };
});
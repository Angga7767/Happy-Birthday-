// =============================================
// Birthday Website Script
// =============================================

document.addEventListener("DOMContentLoaded", () => {

    // === PASSWORD UNLOCK ===
    window.checkPassword = function() {
        const input = document.getElementById("password-input");
        const errorMsg = document.getElementById("error-msg");
        
        if (!input) return;

        const userInput = input.value.trim();

        // Change this password if you want
        const correctPassword = "Wuffya";

        if (userInput.toLowerCase() === correctPassword.toLowerCase()) {
            document.getElementById("lock-screen").classList.add("hidden");
            document.getElementById("main-content").classList.remove("hidden");
            
            // Optional: Clear input after success
            input.value = "";
        } else {
            errorMsg.classList.remove("hidden");
            // Shake animation for feedback
            input.style.animation = "shake 0.4s";
            setTimeout(() => input.style.animation = "", 400);
        }
    };

    // === AUDIO CONTROLS ===
    const audio = document.getElementById("birthday-audio");
    const playBtn = document.getElementById("play-btn");
    const progressBar = document.getElementById("progress-bar");

    window.toggleAudio = function() {
        if (!audio) return;

        if (audio.paused || audio.ended) {
            audio.play().then(() => {
                playBtn.innerHTML = "⏸ Pause";
            }).catch(err => {
                console.error("Audio play error:", err);
            });
        } else {
            audio.pause();
            playBtn.innerHTML = "▶ Play";
        }
    };

    if (audio && progressBar) {
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
    }

    window.seekAudio = function(event) {
        if (!audio) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        audio.currentTime = (clickX / rect.width) * audio.duration;
    };

    // === PAGE NAVIGATION ===
    window.showPage = function(pageNumber) {
        document.querySelectorAll('[id^="page-"]').forEach(page => {
            page.classList.add("hidden");
        });

        const targetPage = document.getElementById(`page-${pageNumber}`);
        if (targetPage) {
            targetPage.classList.remove("hidden");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

});

let isMuted = true;
const motivationMessages = [
    "Every second is a chance to turn your life around.",
    "Make each moment count, time waits for no one.",
    "Your future is created by what you do today, not tomorrow.",
    "Use time wisely, it's the only thing you can't get back."
];

function playTickSound() {
    let tickSound = document.getElementById("tick-sound");
    if (isMuted) {
        tickSound.pause();
        tickSound.currentTime = 0;
    } else {
        tickSound.currentTime = 0;
        tickSound.play().catch(error => console.log("Sound playback error:", error));
    }
}

document.getElementById("mute-button").addEventListener("click", function () {
    isMuted = !isMuted;
    this.innerText = isMuted ? "🔇 Unmute" : "🔊 Mute";
});

function updateDayProgress() {
    let now = new Date();
    let secondsPassed = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    let totalSecondsInDay = 24 * 3600;
    let percentagePassed = (secondsPassed / totalSecondsInDay) * 100;
    let percentageLeft = 100 - percentagePassed;
    document.getElementById("day-progress-bar").style.width = percentagePassed + "%";
    document.getElementById("day-progress-text").innerText = `${Math.round(percentageLeft)}% of the day left`;
}

function updateYearProgress() {
    let now = new Date();
    let startOfYear = new Date(now.getFullYear(), 0, 1);
    let endOfYear = new Date(now.getFullYear(), 11, 31);
    let yearProgress = ((now - startOfYear) / (endOfYear - startOfYear)) * 100;
    document.getElementById("year-progress-bar").style.width = yearProgress + "%";
    document.getElementById("year-progress-text").innerText = `${Math.round(100 - yearProgress)}% of the year left`;
}

function setBackground() {
    let now = new Date().getHours();
    if (now >= 6 && now < 12) document.body.style.backgroundColor = "#cce7ff";
    else if (now >= 12 && now < 18) document.body.style.backgroundColor = "#ffcc80";
    else document.body.style.backgroundColor = "#2c3e50";
}

document.getElementById("theme-button").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

document.getElementById("set-goal").addEventListener("click", function () {
    let goal = document.getElementById("goal-input").value;
    localStorage.setItem("dailyGoal", goal);
    document.getElementById("goal-text").innerText = `Goal: ${goal}`;
});

function showRandomMotivation() {
    let message = motivationMessages[Math.floor(Math.random() * motivationMessages.length)];
    document.getElementById("motivation-message").innerText = message;
}

setInterval(playTickSound, 1000);
setInterval(updateDayProgress, 1000);
setInterval(updateYearProgress, 60000);
setInterval(setBackground, 60000);
showRandomMotivation();
setBackground();
updateDayProgress();
updateYearProgress();

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
 <!--   document.getElementById("day-progress-text").innerText = `${Math.round(percentageLeft)}% of the day left`; -->
    document.getElementById("day-progress-text").innerText = `${percentageLeft.toFixed(1)}% of the day left`;

}

function updateYearProgress() {
    let now = new Date();
    let startOfYear = new Date(now.getFullYear(), 0, 1);
    let endOfYear = new Date(now.getFullYear(), 11, 31);
    let yearProgress = ((now - startOfYear) / (endOfYear - startOfYear)) * 100;
    document.getElementById("year-progress-bar").style.width = yearProgress + "%";
    <!-- document.getElementById("year-progress-text").innerText = `${Math.round(100 - yearProgress)}% of the year left`; -->
    document.getElementById("year-progress-text").innerText = `${percentageLeft.toFixed(1)}% of the day left`;

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

function getDateFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const dateStr = params.get("date");
    if (!/^\d{8}$/.test(dateStr)) {
        showError("Oops! Enter a date like ?date=DDMMYYYY.");
        return null;
    }
    
    let day = parseInt(dateStr.substring(0, 2));
    let month = parseInt(dateStr.substring(2, 4)) - 1;
    let year = parseInt(dateStr.substring(4, 8));
    let date = new Date(year, month, day);
    
    if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
        showError("Hmm... that date seems off! Try again: ?date=DDMMYYYY.");
        return null;
    }
    return date;
}

function showError(message) {
    document.getElementById("result").innerHTML = message;
}

function updateTimeDifference() {
    let inputDate = getDateFromQuery();
    if (!inputDate) return;
    
    function calculateDifference() {
        let now = new Date();
        let years = now.getFullYear() - inputDate.getFullYear();
        let months = now.getMonth() - inputDate.getMonth();
        let days = now.getDate() - inputDate.getDate();
        if (days < 0) {
            months--;
            let lastMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            days += lastMonthDays;
        }
                if (months < 0) {
                    years--;
                    months += 12;
                }

                let hours = now.getHours();
                let minutes = now.getMinutes();
                let seconds = now.getSeconds();

                // Calculate total days difference
                let totalDaysDiff = Math.floor((now - inputDate) / (1000 * 60 * 60 * 24));
                let weeks = Math.floor(totalDaysDiff / 7);
                let extraDays = totalDaysDiff % 7;

                document.getElementById("result").innerHTML = `
                    ${years} Years<br>
                <!--    (${weeks} Weeks and ${extraDays} Days)<br> -->
                    ${months} Months<br>
                    ${days} Days<br>
                    ${hours} Hours<br>
                    ${minutes} Minutes<br>
                    ${seconds} Seconds
                `;
            }

            calculateDifference();
            setInterval(calculateDifference, 1000);
        }

        updateTimeDifference();

setInterval(playTickSound, 1000);
setInterval(updateDayProgress, 1000);
setInterval(updateYearProgress, 60000);
setInterval(setBackground, 60000);
showRandomMotivation();
setBackground();
updateDayProgress();
updateYearProgress();

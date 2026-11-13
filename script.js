let timeLeft = STUDY_DATA.timerPresets.focus;
let timerInterval = null;
let isRunning = false;
let currentMode = "focus";
let scheduleList = [...STUDY_DATA.sampleSchedules];

window.onload = function() {
    renderSchedule();
    updateTimerDisplay();
};

// Pengaturan Mode Timer
function setTimerMode(mode) {
    pauseTimer();
    currentMode = mode;
    
    document.querySelectorAll(".chip").forEach(btn => btn.classList.remove("active"));
    
    if (mode === "focus") {
        timeLeft = STUDY_DATA.timerPresets.focus;
        document.getElementById("timer-status").innerText = "✨ Waktunya Fokus Belajar ✨";
        document.getElementById("btn-focus").classList.add("active");
    } else if (mode === "shortBreak") {
        timeLeft = STUDY_DATA.timerPresets.shortBreak;
        document.getElementById("timer-status").innerText = "☕ Istirahat Santai Sebentar ☕";
        document.getElementById("btn-short").classList.add("active");
    } else if (mode === "longBreak") {
        timeLeft = STUDY_DATA.timerPresets.longBreak;
        document.getElementById("timer-status").innerText = "🧸 Waktunya Recharge Energi 🧸";
        document.getElementById("btn-long").classList.add("active");
    }
    
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    const formatted = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    document.getElementById("time-display").innerText = formatted;
    document.title = `(${formatted}) Study & Chill ✨`;
}

function toggleTimer() {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    document.getElementById("start-btn").innerText = "Jeda ⏸️";
    
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            document.getElementById("start-btn").innerText = "Mulai 🚀";
            alert("Yeay! Sesi selesai. Saatnya rehat sebentar! 🌸");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById("start-btn").innerText = "Mulai 🚀";
}

function resetTimer() {
    pauseTimer();
    setTimerMode(currentMode);
}

// Generator & Manajemen Jadwal Harian
function renderSchedule() {
    const container = document.getElementById("schedule-container");
    container.innerHTML = "";

    scheduleList.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "schedule-card";
        card.innerHTML = `
            <div>
                <span class="schedule-time">⏰ ${item.time}</span>
                <p class="schedule-text">${item.activity}</p>
            </div>
            <button class="delete-btn" onclick="removeSchedule(${index})">❌</button>
        `;
        container.appendChild(card);
    });
}

function addScheduleItem() {
    const timeInput = document.getElementById("time-input");
    const activityInput = document.getElementById("activity-input");

    if (timeInput.value.trim() === "" || activityInput.value.trim() === "") {
        alert("Mohon isi waktu dan aktivitas dengan lengkap ya! 🌷");
        return;
    }

    scheduleList.push({
        time: timeInput.value,
        activity: activityInput.value
    });

    timeInput.value = "";
    activityInput.value = "";
    renderSchedule();
}

function removeSchedule(index) {
    scheduleList.splice(index, 1);
    renderSchedule();
}
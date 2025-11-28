let timer; // Interval ID store karne ke liye
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;

function updateDisplay() {
    // Formatting (00:00:00)
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById('display').innerText = `${h}:${m}:${s}`;
}

function startTimer() {
    if (isRunning) return; // Agar pehle se chal raha hai to kuch mat karo

    isRunning = true;
    timer = setInterval(() => {
        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        updateDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timer); // Timer roko
    isRunning = false;
}

function resetTimer() {
    stopTimer(); // Pehle roko
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay(); // 00:00:00 dikhao
}

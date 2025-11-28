const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "A journey of a thousand miles begins with a single step.",
    "Knowledge is power."
];

let timer;
let timeLeft = 60;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

const quoteDisplay = document.getElementById('quote');
const inputField = document.getElementById('inputField');
const timeDisplay = document.getElementById('time');
const mistakeDisplay = document.getElementById('mistakes');
const wpmDisplay = document.getElementById('wpm');
const startBtn = document.getElementById('startBtn');

function loadQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.innerHTML = "";
    quotes[randomIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`;
        quoteDisplay.innerHTML += span;
    });
}

function startGame() {
    loadQuote();
    timeLeft = 60;
    charIndex = 0;
    mistakes = 0;
    isTyping = true;
    inputField.disabled = false;
    inputField.value = "";
    inputField.focus();
    startBtn.style.display = "none";

    clearInterval(timer);
    timer = setInterval(initTimer, 1000);
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.innerText = timeLeft;

        // Calculate WPM
        let wpm = Math.round(((charIndex - mistakes) / 5) / ((60 - timeLeft) / 60));
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmDisplay.innerText = wpm;
    } else {
        clearInterval(timer);
        inputField.disabled = true;
        isTyping = false;
        startBtn.style.display = "inline-block";
        startBtn.innerText = "Try Again";
    }
}

inputField.addEventListener("input", () => {
    if (!isTyping) return;

    const characters = quoteDisplay.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];

    if (charIndex < characters.length && timeLeft > 0) {
        if (!typedChar) { // Backspace logic (simplified: just ignore for now or handle complex logic)
            // For simplicity in this level, we assume forward typing only or handle basic check
        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
            mistakeDisplay.innerText = mistakes;
        }
    } else {
        // Quote finished, load new
        loadQuote();
        inputField.value = "";
        charIndex = 0;
    }
});

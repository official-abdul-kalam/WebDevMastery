function checkAge() {
    const age = document.getElementById('ageInput').value;
    const resultBox = document.getElementById('result');

    // IF/ELSE Logic
    if (age >= 18) {
        resultBox.innerText = "You are an Adult! 🚗";
        resultBox.style.color = "#27c93f"; // Green
    } else {
        resultBox.innerText = "You are a Minor! 🚲";
        resultBox.style.color = "#ff5f56"; // Red
    }
}

function checkEvenOdd() {
    const num = document.getElementById('numberInput').value;
    const resultBox = document.getElementById('numberResult');

    // Modulo operator (%) remainder deta hai
    if (num % 2 === 0) {
        resultBox.innerText = "Even Number (Sam)";
        resultBox.style.color = "#00d2ff";
    } else {
        resultBox.innerText = "Odd Number (Visham)";
        resultBox.style.color = "#ffbd2e";
    }
}

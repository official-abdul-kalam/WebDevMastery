// Elements
const countDisplay = document.getElementById('count');
const incrementBtn = document.getElementById('incrementBtn');

// Initialize count
let count = 0;

// Check sessionStorage on load
// sessionStorage data sirf tab open rehne tak persist karta hai
const savedCount = sessionStorage.getItem('sessionCount');

if (savedCount) {
    count = parseInt(savedCount);
    countDisplay.textContent = count;
}

// Increment button handler
incrementBtn.addEventListener('click', () => {
    count++;
    updateDisplay();

    // Save to sessionStorage
    sessionStorage.setItem('sessionCount', count);
});

function updateDisplay() {
    countDisplay.textContent = count;

    // Thoda animation effect
    countDisplay.style.transform = 'scale(1.2)';
    setTimeout(() => {
        countDisplay.style.transform = 'scale(1)';
    }, 100);
}

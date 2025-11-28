// Elements select karte hain
const nameInput = document.getElementById('nameInput');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const greeting = document.getElementById('greeting');
const savedNameSpan = document.getElementById('savedName');

// Page load hone par check karte hain ki kya koi naam pehle se saved hai
// localStorage.getItem('key') se hum saved data retrieve karte hain
const storedName = localStorage.getItem('userName');

if (storedName) {
    showGreeting(storedName);
}

// Save button click handler
saveBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();

    if (name) {
        // localStorage.setItem('key', 'value') se data save karte hain
        // Ye data browser close hone ke baad bhi saved rahega
        localStorage.setItem('userName', name);
        showGreeting(name);
        nameInput.value = ''; // Input clear karte hain
    } else {
        alert('Please enter a name!');
    }
});

// Clear button click handler
clearBtn.addEventListener('click', () => {
    // localStorage.removeItem('key') se specific data delete karte hain
    localStorage.removeItem('userName');

    // UI reset karte hain
    greeting.classList.add('hidden');
    nameInput.value = '';
    alert('Name cleared from storage!');
});

// Helper function greeting dikhane ke liye
function showGreeting(name) {
    savedNameSpan.textContent = name;
    greeting.classList.remove('hidden');
}

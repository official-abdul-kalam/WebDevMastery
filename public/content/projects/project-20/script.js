const checkInBtn = document.getElementById('checkInBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const statusMsg = document.getElementById('statusMsg');
const historyList = document.getElementById('historyList');
const emptyMsg = document.getElementById('emptyMsg');

// Load history from localStorage
let history = JSON.parse(localStorage.getItem('locationHistory') || '[]');

// Initial render
renderHistory();

checkInBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        showStatus('Geolocation is not supported by your browser.', 'error');
        return;
    }

    showStatus('Locating...', 'loading');
    checkInBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(success, error);
});

function success(position) {
    const { latitude, longitude } = position.coords;
    const timestamp = new Date().toLocaleString();

    const newEntry = {
        id: Date.now(),
        lat: latitude,
        lng: longitude,
        time: timestamp
    };

    // Add to beginning of array
    history.unshift(newEntry);
    saveHistory();
    renderHistory();

    showStatus('Check-in successful!', 'success');
    checkInBtn.disabled = false;

    // Hide success message after 3 seconds
    setTimeout(() => {
        statusMsg.classList.add('hidden');
    }, 3000);
}

function error(err) {
    showStatus('Unable to retrieve location.', 'error');
    checkInBtn.disabled = false;
}

function showStatus(msg, type) {
    statusMsg.textContent = msg;
    statusMsg.className = `status ${type}`;
    statusMsg.classList.remove('hidden');
}

function renderHistory() {
    historyList.innerHTML = '';

    if (history.length === 0) {
        emptyMsg.style.display = 'block';
        return;
    } else {
        emptyMsg.style.display = 'none';
    }

    history.forEach(entry => {
        const li = document.createElement('li');

        li.innerHTML = `
            <div>
                <div class="coords">${entry.lat.toFixed(4)}, ${entry.lng.toFixed(4)}</div>
                <span class="timestamp">${entry.time}</span>
            </div>
            <a href="https://www.google.com/maps?q=${entry.lat},${entry.lng}" target="_blank" class="map-link">View Map</a>
        `;

        historyList.appendChild(li);
    });
}

function saveHistory() {
    localStorage.setItem('locationHistory', JSON.stringify(history));
}

clearHistoryBtn.addEventListener('click', () => {
    if (confirm('Clear all location history?')) {
        history = [];
        saveHistory();
        renderHistory();
        showStatus('History cleared.', 'success');
    }
});

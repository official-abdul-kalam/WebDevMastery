const getLocationBtn = document.getElementById('getLocationBtn');
const locationDisplay = document.getElementById('locationDisplay');
const latSpan = document.getElementById('lat');
const longSpan = document.getElementById('long');
const mapLink = document.getElementById('mapLink');
const errorMsg = document.getElementById('errorMsg');

getLocationBtn.addEventListener('click', () => {
    // Check if Geolocation is supported
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    getLocationBtn.textContent = 'Locating...';
    getLocationBtn.disabled = true;

    // Request current position
    navigator.geolocation.getCurrentPosition(success, error);
});

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    latSpan.textContent = latitude.toFixed(4);
    longSpan.textContent = longitude.toFixed(4);

    // Create Google Maps link
    mapLink.href = `https://www.google.com/maps?q=${latitude},${longitude}`;

    locationDisplay.classList.remove('hidden');
    errorMsg.classList.add('hidden');

    getLocationBtn.textContent = 'Get My Location';
    getLocationBtn.disabled = false;
}

function error(err) {
    let message = 'Unable to retrieve your location';

    // Handle specific error codes
    switch (err.code) {
        case err.PERMISSION_DENIED:
            message = 'User denied the request for Geolocation.';
            break;
        case err.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable.';
            break;
        case err.TIMEOUT:
            message = 'The request to get user location timed out.';
            break;
    }

    showError(message);
    getLocationBtn.textContent = 'Get My Location';
    getLocationBtn.disabled = false;
}

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
    locationDisplay.classList.add('hidden');
}

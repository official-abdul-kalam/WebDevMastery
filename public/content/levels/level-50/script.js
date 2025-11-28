const requestBtn = document.getElementById('requestBtn');
const notifyBtn = document.getElementById('notifyBtn');
const permStatus = document.getElementById('permStatus');

// Check initial permission status
updateStatus(Notification.permission);

requestBtn.addEventListener('click', () => {
    // Request permission from user
    Notification.requestPermission().then(permission => {
        updateStatus(permission);
    });
});

notifyBtn.addEventListener('click', () => {
    if (Notification.permission === 'granted') {
        // Create a new notification
        const notification = new Notification('Hello Developer! 👋', {
            body: 'This is a system notification from your code.',
            icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827349.png' // Generic bell icon
        });

        // Optional: Handle click on notification
        notification.onclick = () => {
            window.focus(); // Bring window to front
            notification.close();
        };
    } else {
        alert('Permission not granted!');
    }
});

function updateStatus(permission) {
    permStatus.textContent = permission.toUpperCase();

    if (permission === 'granted') {
        permStatus.style.color = '#2ecc71'; // Green
        requestBtn.style.display = 'none';
        notifyBtn.disabled = false;
    } else if (permission === 'denied') {
        permStatus.style.color = '#e74c3c'; // Red
        requestBtn.disabled = true;
        notifyBtn.disabled = true;
    } else {
        permStatus.style.color = '#f1c40f'; // Yellow
        requestBtn.disabled = false;
        notifyBtn.disabled = true;
    }
}

function updateClock() {
    const now = new Date();

    // Time Components
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Formatting (0 lagana agar single digit ho)
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Display Update
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clockDisplay').innerText = timeString;

    // Date Update
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('dateDisplay').innerText = now.toLocaleDateString('en-US', options);
}

// Har second update karo (1000ms = 1s)
setInterval(updateClock, 1000);

// Page load hote hi ek baar chalao taaki wait na karna pade
updateClock();

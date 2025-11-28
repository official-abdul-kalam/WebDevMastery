function toggleTheme() {
    const box = document.getElementById('themeBox');

    // classList.toggle()
    // Agar class hai to hata dega, nahi hai to laga dega
    box.classList.toggle('dark-theme');

    // Check karna ki class hai ya nahi
    if (box.classList.contains('dark-theme')) {
        box.innerText = "Dark Mode On 🌙";
    } else {
        box.innerText = "Light Mode On ☀️";
    }
}

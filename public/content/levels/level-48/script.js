const body = document.body;
const cookieValueDisplay = document.getElementById('cookieValue');
const clearBtn = document.getElementById('clearBtn');

// Helper function to set cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    // Cookie set karte hain with name, value aur expiry date
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    updateDisplay();
}

// Helper function to get cookie
function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

// Check for existing theme cookie on load
const savedTheme = getCookie("theme");
if (savedTheme) {
    applyTheme(savedTheme);
}
updateDisplay();

// Theme buttons event listeners
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        applyTheme(theme);
        setCookie("theme", theme, 7); // Save for 7 days
    });
});

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

function updateDisplay() {
    // document.cookie poori string return karta hai
    cookieValueDisplay.textContent = document.cookie || "No cookies found";
}

// Clear cookie handler
clearBtn.addEventListener('click', () => {
    // Cookie delete karne ke liye expiry date past ki set karte hain
    document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    body.classList.remove('dark-mode'); // Reset to default
    updateDisplay();
});

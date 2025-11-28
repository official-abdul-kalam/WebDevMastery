// Page load hone par check karo ki naam saved hai ya nahi
const savedName = localStorage.getItem('userName');

if (savedName) {
    document.getElementById('greeting').innerText = `Welcome back, ${savedName}!`;
    document.getElementById('nameInput').value = savedName;
}

function saveName() {
    const name = document.getElementById('nameInput').value;

    // Browser ki memory me save karo
    localStorage.setItem('userName', name);

    document.getElementById('greeting').innerText = `Hello, ${name}!`;
    alert("Name Saved! Now refresh the page.");
}

function clearName() {
    // Memory se hatao
    localStorage.removeItem('userName');

    document.getElementById('greeting').innerText = "Hello, Guest!";
    document.getElementById('nameInput').value = "";
}

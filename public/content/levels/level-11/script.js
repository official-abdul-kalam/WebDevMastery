function submitForm() {
    // Input se value nikalna
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    const output = document.getElementById('output');

    if (name && email) {
        output.style.color = "#27c93f"; // Green
        output.innerText = `Hello ${name}! Email saved: ${email}`;
    } else {
        output.style.color = "#ff5f56"; // Red
        output.innerText = "Please fill all fields!";
    }
}

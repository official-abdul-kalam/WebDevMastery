const form = document.getElementById('myForm');
const message = document.getElementById('message');

form.addEventListener('submit', function (event) {
    // 1. Browser ko page reload karne se roko
    event.preventDefault();

    const username = document.getElementById('username').value;

    // 2. Apna kaam karo
    message.innerText = `Form Submitted! Welcome, ${username}.`;

    // 3. Form clear karo
    form.reset();
});

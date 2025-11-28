// main.js
// Doosri file se import kar rahe hain
import { sayHello, PI } from './utils.js';

document.getElementById('greetBtn').addEventListener('click', () => {
    const message = sayHello("Student");
    document.getElementById('output').innerText = message + ` (PI: ${PI})`;
});

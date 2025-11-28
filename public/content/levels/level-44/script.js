// Recursive Function
function factorial(n) {
    // Base Case: Rukna kab hai?
    if (n === 0 || n === 1) {
        return 1;
    }
    // Recursive Step: Khud ko call karo
    return n * factorial(n - 1);
}

function calculateFactorial() {
    const num = Number(document.getElementById('numInput').value);
    const result = factorial(num);
    document.getElementById('result').innerText = `Factorial of ${num} is ${result}`;
}

function calculate(operator) {
    // Inputs se value lena (String hoti hai, isliye Number() me convert kiya)
    const num1 = Number(document.getElementById('num1').value);
    const num2 = Number(document.getElementById('num2').value);
    const resultDisplay = document.getElementById('result');

    let ans = 0;

    // Logic
    if (operator === '+') {
        ans = num1 + num2;
    } else if (operator === '-') {
        ans = num1 - num2;
    } else if (operator === '*') {
        ans = num1 * num2;
    } else if (operator === '/') {
        if (num2 === 0) {
            alert("Cannot divide by Zero!");
            return;
        }
        ans = num1 / num2;
    }

    // Result dikhana
    resultDisplay.innerText = ans;
    console.log(`${num1} ${operator} ${num2} = ${ans}`);
}

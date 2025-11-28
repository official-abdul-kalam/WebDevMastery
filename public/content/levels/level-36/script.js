// Old Way
// function add(a, b) { return a + b; }

// New Way (Arrow Function)
const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;

const calculate = (type) => {
    const n1 = Number(document.getElementById('num1').value);
    const n2 = Number(document.getElementById('num2').value);
    const resultDisplay = document.getElementById('result');

    let res = 0;

    if (type === 'add') res = add(n1, n2);
    if (type === 'sub') res = sub(n1, n2);
    if (type === 'mul') res = mul(n1, n2);

    resultDisplay.innerText = `Result: ${res}`;
};

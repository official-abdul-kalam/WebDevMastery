// Closure Example: Counter
// 'createCounter' function ek object return karta hai
// Jiske andar 'count' variable access kiya ja sakta hai
// Lekin bahar se 'count' ko directly change nahi kar sakte

const createCounter = () => {
    let count = 0; // Private Variable

    return {
        increment: () => {
            count++;
            updateUI(count);
        },
        decrement: () => {
            count--;
            updateUI(count);
        }
    };
};

const updateUI = (val) => {
    document.getElementById('count').innerText = val;
};

// 'myCounter' ab un functions ko hold karta hai jo 'count' ko yaad rakhte hain
const myCounter = createCounter();

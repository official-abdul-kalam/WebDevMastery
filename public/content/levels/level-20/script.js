// Global Array
let cart = [];

function updateDisplay() {
    const display = document.getElementById('cartDisplay');

    if (cart.length === 0) {
        display.innerText = "Cart is Empty";
    } else {
        // join() array ko string bana deta hai comma ke saath
        display.innerText = cart.join(" | ");
    }
}

function addItem() {
    const input = document.getElementById('itemInput');
    const item = input.value;

    if (item !== "") {
        // PUSH: End me add karta hai
        cart.push(item);
        input.value = ""; // Clear input
        updateDisplay();
    }
}

function removeItem() {
    // POP: Last item hatata hai
    cart.pop();
    updateDisplay();
}

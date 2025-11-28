function showFruits() {
    // ARRAY Creation
    // Square brackets [] ka use hota hai
    const fruits = ["Apple 🍎", "Banana 🍌", "Mango 🥭", "Grapes 🍇"];

    const list = document.getElementById('fruitList');
    list.innerHTML = ""; // Clear list

    // Array se data nikalna
    // Index 0 se shuru hota hai
    for (let i = 0; i < fruits.length; i++) {
        list.innerHTML += `<li>${fruits[i]}</li>`;
    }

    console.log("Full Array:", fruits);
    console.log("First Fruit:", fruits[0]);
}

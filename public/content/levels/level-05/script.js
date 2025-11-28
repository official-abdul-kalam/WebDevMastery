// LEVEL 5: JAVASCRIPT

// [ LOGIC: FUNCTION KYA HAI? ]
// Function ek machine ki tarah hai.
// Jab hum button dabate hain, ye machine chalu hoti hai aur apna kaam karti hai.

function sayHello() {
    // alert() browser ka ek built-in function hai jo popup dikhata hai.
    alert("Namaste! Aapne button click kiya!");
}

function changeColor() {
    // [ STEP 1: ELEMENT DHUNDO ]
    // document.getElementById("message")
    // Iska matlab: "Pure page (document) me wo element dhundo jiski ID 'message' hai."
    var messageElement = document.getElementById("message");

    // [ STEP 2: TEXT BADLO ]
    // .innerText property text ko change karti hai.
    messageElement.innerText = "Aapne mujhe badal diya!";

    // [ STEP 3: STYLE BADLO ]
    // .style.color property text ka rang change karti hai.
    messageElement.style.color = "red";

    // [ STEP 4: CONSOLE LOG ]
    console.log("Rang laal ho gaya!");
}

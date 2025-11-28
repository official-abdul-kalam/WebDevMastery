// Function Definition
// 'name' ek parameter hai (Khali jagah)
function sayHello(name) {
    const message = "Namaste, " + name + "!";

    // Output update karna
    document.getElementById('output').innerText = message;

    console.log("Function called for:", name);
}

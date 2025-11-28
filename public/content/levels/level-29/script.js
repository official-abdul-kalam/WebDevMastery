// Poore document par listener lagate hain
document.addEventListener('keydown', function (event) {
    const display = document.getElementById('keyDisplay');
    const code = document.getElementById('codeDisplay');

    // event.key: Jo key press hui (e.g. "a", "Enter")
    display.innerText = event.key;

    // event.code: Physical key code (e.g. "KeyA", "Enter")
    code.innerText = `Code: ${event.code}`;

    // Animation effect
    display.style.transform = "scale(1.2)";
    setTimeout(() => {
        display.style.transform = "scale(1)";
    }, 100);
});

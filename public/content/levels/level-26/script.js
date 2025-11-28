const parent = document.getElementById('parent');
const child = document.getElementById('child');
const log = document.getElementById('log');

parent.addEventListener('click', function () {
    log.innerText += " Parent Clicked! |";
});

child.addEventListener('click', function (event) {
    log.innerText += " Child Clicked! |";

    // Agar hum chahte hain ki Parent ko pata na chale:
    // event.stopPropagation();
    // Is line ko uncomment karke dekhein
});

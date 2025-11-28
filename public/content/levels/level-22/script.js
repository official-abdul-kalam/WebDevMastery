// Elements select karna
const btn = document.getElementById('clickBtn');
const box = document.getElementById('box');
const input = document.getElementById('keyInput');
const statusText = document.getElementById('status');

// 1. Click Event
btn.addEventListener('click', function () {
    statusText.innerText = "Status: Button Clicked! 🎉";
    btn.style.backgroundColor = "#27c93f";
});

// 2. Mouse Over (Hover)
box.addEventListener('mouseover', function () {
    box.style.backgroundColor = "#ffbd2e";
    box.innerText = "Wow!";
});

// Mouse Out (Hatao)
box.addEventListener('mouseout', function () {
    box.style.backgroundColor = "#444";
    box.innerText = "Hover Me";
});

// 3. Input (Typing)
input.addEventListener('input', function () {
    statusText.innerText = "Typing: " + input.value;
});

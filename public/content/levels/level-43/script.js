const log = document.getElementById('log');

function showThis() {
    // 'this' wo element hoga jisne event trigger kiya
    log.innerText = `Clicked: ${this.id}`;

    // Change color of clicked button
    this.style.backgroundColor = "#27c93f";

    // Reset after 500ms
    setTimeout(() => {
        this.style.backgroundColor = "#34495e";
    }, 500);
}

document.getElementById('btn1').addEventListener('click', showThis);
document.getElementById('btn2').addEventListener('click', showThis);

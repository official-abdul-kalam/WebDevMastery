// Normal Function
// const volume = (l, w, h) => l * w * h;

// Curried Function
// volume(l)(w)(h)
const volume = (l) => (w) => (h) => l * w * h;

function calcVolume() {
    const l = Number(document.getElementById('l').value);
    const w = Number(document.getElementById('w').value);
    const h = Number(document.getElementById('h').value);

    // Using Curried Function
    const result = volume(l)(w)(h);

    document.getElementById('result').innerText = `Volume: ${result}`;
}

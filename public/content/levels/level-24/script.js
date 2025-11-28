function addBox() {
    const container = document.getElementById('containerArea');

    // 1. Naya element banana
    const newBox = document.createElement('div');

    // 2. Usme class add karna
    newBox.classList.add('mini-box');

    // 3. Random color dena (Optional fun)
    const colors = ['#ff5f56', '#ffbd2e', '#27c93f', '#00d2ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    newBox.style.backgroundColor = randomColor;

    // 4. Page par jodna (Append)
    container.appendChild(newBox);
}

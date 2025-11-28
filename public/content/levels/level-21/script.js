function changeContent() {
    // 1. ID se select karna
    const heading = document.getElementById('mainHeading');
    heading.innerText = "Hello JavaScript! 🚀";

    // 2. Class se select karna (Multiple elements)
    const paragraphs = document.querySelectorAll('.text-item');

    // Loop lagakar sabko change karna
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].innerText = `Updated Paragraph ${i + 1}`;
        paragraphs[i].style.color = "#27c93f";
    }
}

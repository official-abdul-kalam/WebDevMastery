// 'async' keyword function ke aage lagana zaroori hai
async function loadQuote() {
    const quoteBox = document.getElementById('quote');
    quoteBox.innerText = "Loading...";

    try {
        // 'await' ka matlab: Jab tak data na aaye, yahin ruko
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();

        quoteBox.innerText = `"${data.quote}" - ${data.author}`;
    } catch (error) {
        quoteBox.innerText = "Error loading quote!";
        console.error(error);
    }
}

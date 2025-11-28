// Array of Objects (Advanced Array)
// Har item ek 'Object' hai jisme text aur author hai
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "Fix the cause, not the symptom.", author: "Steve Maguire" },
    { text: "Java is to JavaScript what car is to Carpet.", author: "Chris Heilmann" },
    { text: "It’s not a bug, it’s an undocumented feature.", author: "Anonymous" }
];

function generateQuote() {
    // Random Index nikalna (0 se length tak)
    // Math.random() 0 se 1 deta hai
    // Math.floor() point hata deta hai
    const randomIndex = Math.floor(Math.random() * quotes.length);

    const selectedQuote = quotes[randomIndex];

    // HTML update karna
    document.getElementById('quoteText').innerText = `"${selectedQuote.text}"`;
    document.getElementById('quoteAuthor').innerText = `- ${selectedQuote.author}`;
}

// Authors Page ke liye function
function renderAuthors() {
    const list = document.getElementById('authorsList');
    if (!list) return; // Agar hum index page par hain to ye run na kare

    list.innerHTML = "";

    // Loop chala kar authors dikhana
    for (let i = 0; i < quotes.length; i++) {
        // Sirf unique authors dikhana thoda complex hai, abhi sab dikhate hain
        const html = `<div class="author-chip">${quotes[i].author}</div>`;
        list.innerHTML += html;
    }
}

function checkLuck() {
    const resultDisplay = document.getElementById('result');
    resultDisplay.innerText = "Checking...";
    resultDisplay.style.color = "white";

    // Promise banana
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = Math.random();
            if (random > 0.5) {
                resolve("Success! You are lucky. 🌟");
            } else {
                reject("Failed! Better luck next time. ❌");
            }
        }, 1000);
    });

    // Promise handle karna
    myPromise
        .then((message) => {
            // Agar resolve hua
            resultDisplay.innerText = message;
            resultDisplay.style.color = "#27c93f";
        })
        .catch((error) => {
            // Agar reject hua
            resultDisplay.innerText = error;
            resultDisplay.style.color = "#ff5f56";
        });
}

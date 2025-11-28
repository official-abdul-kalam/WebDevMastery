async function fetchBroken() {
    const errorBox = document.getElementById('errorBox');
    errorBox.style.display = "none";

    try {
        // Galat URL (Jo exist nahi karta)
        const response = await fetch('https://invalid-url-example.com/data');

        // Agar yahan error aaya, to seedha catch block me jayega
        const data = await response.json();
        console.log(data);

    } catch (error) {
        // Error pakda gaya!
        errorBox.style.display = "block";
        errorBox.innerText = "Error Caught: " + error.message;
    }
}

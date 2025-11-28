function validateForm(event) {
    event.preventDefault(); // Page reload rokne ke liye

    const name = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const country = document.getElementById('country').value;
    const message = document.getElementById('message');

    // Simple Validation
    if (name.length < 3) {
        message.style.color = "#ff5f56";
        message.innerText = "Name must be at least 3 characters!";
        return false;
    }

    // Success
    message.style.color = "#27c93f";
    message.innerText = `Registration Successful! Welcome, ${name} from ${country}.`;

    // Console log data
    console.log("Registered:", { name, email, country });
    return false;
}

function submitSurvey(event) {
    event.preventDefault(); // Reload roko

    const name = document.getElementById('name').value;
    const btn = document.getElementById('submitBtn');

    // Button text change animation
    const originalText = btn.innerText;
    btn.innerText = "Submitting...";
    btn.style.backgroundColor = "#95a5a6";

    // Fake delay to simulate server request
    setTimeout(() => {
        alert(`Thank you, ${name}! Your feedback has been recorded.`);

        // Reset form
        document.getElementById('surveyForm').reset();

        // Restore button
        btn.innerText = originalText;
        btn.style.backgroundColor = "#27ae60";
    }, 1000);

    return false;
}

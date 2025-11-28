function removeMe(element) {
    // element wahi hai jispar click hua (this)

    // Animation ke liye thoda wait kar sakte hain (Optional)
    element.style.transform = "scale(0)";

    setTimeout(() => {
        // Element ko DOM se hatao
        element.remove();
    }, 200);
}

function reset() {
    // Page reload karke wapas laana sabse aasaan hai
    location.reload();
}

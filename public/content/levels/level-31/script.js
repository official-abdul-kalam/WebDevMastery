function startTask() {
    const status = document.getElementById('status');
    const loader = document.getElementById('loader');

    status.innerText = "Status: Working...";
    loader.style.display = "block";

    // setTimeout ek asynchronous function hai
    // Ye 2000ms (2 second) baad callback function chalayega
    setTimeout(function () {
        loader.style.display = "none";
        status.innerText = "Status: Task Completed! ✅";
        status.style.color = "#27c93f";
    }, 2000);
}

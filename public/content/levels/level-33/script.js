function getData() {
    // JSONPlaceholder API (Free fake API)
    fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.json()) // Text ko JSON me badlo
        .then(data => {
            // Data aane ke baad UI update karo
            document.getElementById('userCard').style.display = "block";
            document.getElementById('userName').innerText = data.name;
            document.getElementById('userEmail').innerText = "📧 " + data.email;
            document.getElementById('userCity').innerText = "📍 " + data.address.city;
        })
        .catch(error => {
            alert("Error fetching data!");
            console.error(error);
        });
}

const user = {
    id: 101,
    fullName: "Abdul Kalam",
    job: "Developer",
    address: {
        city: "Mumbai",
        country: "India"
    }
};

const showProfile = () => {
    // Old Way
    // const name = user.fullName;
    // const role = user.job;

    // New Way (Destructuring)
    // Hum seedha properties ko variables me nikal sakte hain
    const { fullName, job, address } = user;
    const { city } = address; // Nested destructuring

    document.getElementById('profile').style.display = "block";
    document.getElementById('name').innerText = fullName;
    document.getElementById('role').innerText = `Role: ${job}`;
    document.getElementById('location').innerText = `📍 ${city}`;
};

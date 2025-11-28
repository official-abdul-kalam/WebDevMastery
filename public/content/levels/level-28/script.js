const user = {
    name: "Abdul",
    age: 25,
    skills: ["HTML", "CSS", "JS"]
};

// Display initial object
document.getElementById('objectDisplay').innerText = JSON.stringify(user, null, 2);

let jsonString = "";

function convertToString() {
    // Object -> String
    jsonString = JSON.stringify(user);
    document.getElementById('stringResult').innerText = jsonString;
}

function convertToObject() {
    if (!jsonString) {
        alert("Pehle String me convert karein!");
        return;
    }

    // String -> Object
    const obj = JSON.parse(jsonString);
    document.getElementById('objectResult').innerText = `Name: ${obj.name}, Age: ${obj.age}`;
}

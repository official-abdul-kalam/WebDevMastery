function printTable() {
    const num = document.getElementById('numInput').value;
    const outputDiv = document.getElementById('output');

    // Purana content saaf karein
    outputDiv.innerHTML = "";

    if (num == "") {
        alert("Please enter a number!");
        return;
    }

    // FOR LOOP
    // i = 1 se shuru hoga
    // i <= 10 tak chalega
    // i++ har baar 1 badhega
    for (let i = 1; i <= 10; i++) {
        const result = num * i;

        // Nayi line add karein
        outputDiv.innerHTML += `${num} x ${i} = ${result} <br>`;

        console.log("Loop running:", i);
    }
}

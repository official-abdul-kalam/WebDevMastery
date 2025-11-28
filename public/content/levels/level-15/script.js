function showVariables() {
    // 1. LET (Badal sakta hai)
    let playerName = "Abdul";
    let score = 0;

    // Value update karna
    score = 100;

    // 2. CONST (Nahi badal sakta)
    const gameName = "Web Dev Mastery";
    // gameName = "Mario"; // Ye Error dega!

    // Output dikhana
    const message = `Player: ${playerName} | Game: ${gameName} | Score: ${score}`;

    document.getElementById('log').innerText = message;

    console.log("Variables:", { playerName, score, gameName });
}

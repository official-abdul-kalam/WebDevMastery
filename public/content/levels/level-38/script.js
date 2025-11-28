const listA = [1, 2, 3];
const listB = [4, 5, 6];

const combineLists = () => {
    // Old Way: listA.concat(listB)

    // New Way (Spread Operator)
    // ... ka matlab: "Iske andar ka saara maal bahar nikal do"
    const combined = [...listA, ...listB];

    // Hum beech me naye items bhi daal sakte hain
    // const combined = [...listA, "New", ...listB];

    document.getElementById('result').innerText = `[ ${combined.join(', ')} ]`;
};

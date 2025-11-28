// Console me message print karein
console.log("Level 8: Lists & Tables Loaded!");

// Hum JS se bhi data check kar sakte hain
// 'document.querySelectorAll' saare 'li' tags ko dhundega
const listItems = document.querySelectorAll('li');

console.log("Total List Items found:", listItems.length);

// Har item ko print karein
listItems.forEach(item => {
    console.log("Item:", item.innerText);
});

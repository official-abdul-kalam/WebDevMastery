// Parent Object (Prototype)
const animal = {
    speak: function () {
        const output = document.getElementById('output');
        output.innerText = `${this.name} makes a noise.`;
    }
};

// Child Objects
const dog = Object.create(animal);
dog.name = "Dog";
dog.speak = function () {
    document.getElementById('output').innerText = "Dog says: Woof! 🐶";
};

const cat = Object.create(animal);
cat.name = "Cat";
// Cat ke paas apna 'speak' nahi hai, to wo parent (animal) ka use karega
// Par humne yahan override kar diya agar chahein to
cat.speak = function () {
    document.getElementById('output').innerText = "Cat says: Meow! 🐱";
};

// Class ek blueprint (naksha) hai
class Car {
    constructor(brand, color) {
        this.brand = brand;
        this.color = color;
    }

    // Method (Function inside class)
    getDescription() {
        return `A ${this.color} ${this.brand}`;
    }
}

const garage = document.getElementById('garage');

function createCar(brand, color) {
    // 'new' keyword se naya object banta hai
    const myCar = new Car(brand, color);

    const div = document.createElement('div');
    div.className = 'car-box';
    div.innerText = myCar.getDescription();
    div.style.borderLeft = `5px solid ${color}`;

    garage.appendChild(div);
}

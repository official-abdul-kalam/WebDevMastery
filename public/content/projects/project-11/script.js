const form = document.getElementById('todoForm');
const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');

// 1. Load Tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

renderTasks();

// 2. Add Task
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const text = input.value;
    tasks.push(text);

    saveAndRender();
    input.value = "";
});

// 3. Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

// 4. Clear All
function clearAll() {
    tasks = [];
    saveAndRender();
}

// Helper: Save to Storage & Update UI
function saveAndRender() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <button onclick="deleteTask(${index})" style="background:none;border:none;color:red;cursor:pointer;">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        list.appendChild(li);
    });
}

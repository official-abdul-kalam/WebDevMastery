// Tasks ko store karne ke liye Array
let tasks = ["Learn HTML", "Learn CSS", "Master JavaScript"];

// Page load hone par tasks dikhao
renderTasks();

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value;

    if (taskText === "") {
        alert("Please write something!");
        return;
    }

    // Array me naya task add karo (PUSH)
    tasks.push(taskText);

    // Input saaf karo
    input.value = "";

    // List dobara banao
    renderTasks();
}

function deleteTask(index) {
    // Array se task hatao (SPLICE)
    // index: Kahan se hatana hai
    // 1: Kitne item hatane hain
    tasks.splice(index, 1);

    // List dobara banao
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById('taskList');
    const countSpan = document.getElementById('totalCount');

    // Purana HTML saaf karo
    list.innerHTML = "";

    // LOOP: Har task ke liye HTML banao
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        // HTML Template
        // onclick="deleteTask(${i})" se humein pata chalega kaunsa task hatana hai
        const html = `
            <li class="task-item">
                <span>${task}</span>
                <button class="delete-btn" onclick="deleteTask(${i})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </li>
        `;

        list.innerHTML += html;
    }

    // Total count update karo
    countSpan.innerText = tasks.length;
}

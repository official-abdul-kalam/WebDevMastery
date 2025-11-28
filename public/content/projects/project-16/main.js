import { questions } from './questions.js';

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const progressEl = document.getElementById('progress');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const scoreEl = document.getElementById('score');

function loadQuestion() {
    const q = questions[currentQuestion];
    questionEl.innerText = q.question;
    optionsEl.innerHTML = "";
    progressEl.innerText = `Question ${currentQuestion + 1}/${questions.length}`;

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btn) {
    const correctIndex = questions[currentQuestion].answer;

    // Disable all buttons
    const buttons = optionsEl.querySelectorAll('button');
    buttons.forEach(b => b.disabled = true);

    if (selectedIndex === correctIndex) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        buttons[correctIndex].classList.add('correct'); // Show correct one
    }

    // Next question after delay
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreEl.innerText = `${score} / ${questions.length}`;
}

// Start
loadQuestion();

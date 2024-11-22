const boardSize = 25;
const player = { position: 0 };
const questions = [
    { q: "What is the closest planet to the Sun?", a: "Mercury" },
    { q: "Which planet is known as the Red Planet?", a: "Mars" },
    { q: "What is the largest planet in our solar system?", a: "Jupiter" },
    { q: "What force keeps planets in orbit around the Sun?", a: "Gravity" },
    { q: "What is the name of our galaxy?", a: "Milky Way" },
    { q: "What is the second planet from the Sun?", a: "Venus" },
    { q: "What is the natural satellite of Earth?", a: "Moon" },
    { q: "Which planet has a prominent ring system?", a: "Saturn" },
    { q: "Who was the first man to walk on the Moon?", a: "Neil Armstrong" },
    { q: "What is the term for a star explosion?", a: "Supernova" }
];
const badSpots = [5, 12, 17];
const questionSpots = [3, 7, 11, 15, 19, 23];
const board = document.getElementById('gameBoard');
const rollButton = document.getElementById('rollButton');
const diceResult = document.getElementById('diceResult');
const message = document.getElementById('message');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answerInput');
const submitAnswerButton = document.getElementById('submitAnswerButton');
let currentQuestion = null;

// Generate game board
for (let i = 0; i < boardSize; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.id = 'square-' + i;
    if (i === 0) {
        square.innerHTML = 'Start';
    } else if (i === boardSize - 1) {
        square.innerHTML = 'Mars';
    }
    board.appendChild(square);
}

// Place player at start
const startSquare = document.getElementById('square-0');
const playerPiece = document.createElement('div');
playerPiece.classList.add('player');
startSquare.appendChild(playerPiece);

// Roll dice event
rollButton.addEventListener('click', () => {
    rollButton.disabled = true;
    message.textContent = '';
    const roll = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = 'You rolled a ' + roll + '!';
    movePlayer(roll);
});

function movePlayer(steps) {
    let newPosition = player.position + steps;
    if (newPosition >= boardSize) {
        newPosition = boardSize - 1;
    }
    updatePlayerPosition(newPosition);

    if (questionSpots.includes(newPosition)) {
        askQuestion();
    } else if (badSpots.includes(newPosition)) {
        message.textContent = 'Oh no! You hit a black hole and got sent back 3 spaces!';
        setTimeout(() => {
            updatePlayerPosition(player.position - 3 >= 0 ? player.position - 3 : 0);
            rollButton.disabled = false;
        }, 2000);
    } else if (newPosition === boardSize - 1) {
        message.textContent = 'Congratulations! You reached Mars!';
        rollButton.disabled = true;
    } else {
        rollButton.disabled = false;
    }
}

function updatePlayerPosition(newPosition) {
    const oldSquare = document.getElementById('square-' + player.position);
    oldSquare.removeChild(playerPiece);

    player.position = newPosition;

    const newSquare = document.getElementById('square-' + player.position);
    newSquare.appendChild(playerPiece);
}

function askQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];
    questionElement.textContent = currentQuestion.q;
    answerInput.style.display = 'inline';
    submitAnswerButton.style.display = 'inline';
    submitAnswerButton.disabled = false;
    answerInput.value = '';
    answerInput.focus();
}

submitAnswerButton.addEventListener('click', () => {
    const userAnswer = answerInput.value.trim();
    if (userAnswer.toLowerCase() === currentQuestion.a.toLowerCase()) {
        message.textContent = 'Correct answer!';
        hideQuestion();
        rollButton.disabled = false;
    } else {
        message.textContent = 'Wrong answer! You go back 2 spaces.';
        hideQuestion();
        updatePlayerPosition(player.position - 2 >= 0 ? player.position - 2 : 0);
        rollButton.disabled = false;
    }
});

function hideQuestion() {
    questionElement.textContent = '';
    answerInput.style.display = 'none';
    submitAnswerButton.style.display = 'none';
}

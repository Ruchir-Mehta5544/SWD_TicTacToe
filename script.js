let player_1 = prompt("Enter Player 1 Name:");
let player_2 = prompt("Enter Player 2 Name:");

let scores = JSON.parse(localStorage.getItem("scores")) || {};

if (!scores[player_1]) scores[player_1] = 0;
if (!scores[player_2]) scores[player_2] = 0;

localStorage.setItem("scores", JSON.stringify(scores));

let currentSymbol = "X";
let board = Array(9).fill(null);

const gameboard = document.getElementById("gameboard");
const message = document.getElementById("message");
/*const resetBtn = document.getElementById("reset"); */

// Display initial scores
document.getElementById("player1").textContent =
    `${player_1} (X): ${scores[player_1]}`;

document.getElementById("player2").textContent =
    `${player_2} (O): ${scores[player_2]}`;


// Create board
function createBoard() {
    gameboard.innerHTML = "";

    board.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        cell.addEventListener("click", () => handleClick(index));

        gameboard.appendChild(cell);
    });
}


// Handle click
function handleClick(index) {
    if (board[index] !== null) return;

    board[index] = currentSymbol;
    render();

    if (checkWin()) {
    showPopup(`${currentSymbol} Wins!`);
    updateScore();
    return;
}

if (!board.includes(null)) {
    showPopup("It's a Draw!");
    return;
}

   /* if (checkWin()) {
        message.textContent = `${currentSymbol} Wins!`;
        updateScore();
        return;
    }

    if (!board.includes(null)) {
        message.textContent = "It's a Draw!";
        return;
    }*/

    currentSymbol = currentSymbol === "X" ? "O" : "X";

}

// Render symbols
function render() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, i) => {
        cell.innerHTML = board[i] ? `<span>${board[i]}</span>` : "";
    });
}


// Check win
function checkWin() {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === currentSymbol)
    );
}


// Update score
function updateScore() {
    const winner = currentSymbol === "X" ? player_1 : player_2;

    scores[winner]++;
    localStorage.setItem("scores", JSON.stringify(scores));

    document.getElementById("player1").textContent =
        `${player_1} (X): ${scores[player_1]}`;

    document.getElementById("player2").textContent =
        `${player_2} (O): ${scores[player_2]}`;
}

const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const popupReset = document.getElementById("popup-reset");
const resetBtn = document.getElementById("reset");

function showPopup(text) {
    popupText.textContent = text;
    popup.classList.remove("hidden");
}

popupReset.addEventListener("click", () => {
    popup.classList.add("hidden");
    board = Array(9).fill(null);
    currentSymbol = "X";
    createBoard();
});


// Restart game
resetBtn.addEventListener("click", () => {
    board = Array(9).fill(null);
    currentSymbol = "X";
    message.textContent = "";
    createBoard();
});


createBoard();
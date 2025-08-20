
const board = document.getElementById("board");
const statusText = document.getElementById("status");
const xScoreEl = document.getElementById("xScore");
const oScoreEl = document.getElementById("oScore");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let xWins = 0;
let oWins = 0;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    board.innerHTML = "";
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.setAttribute("data-index", index);
        cellElement.addEventListener("click", handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(e) {
    const index = e.target.getAttribute("data-index");

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer); // color add karega

    if (checkWinner()) {
        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        gameActive = false;

        if (currentPlayer === "X") {
            xWins++;
            xScoreEl.textContent = xWins;
        } else {
            oWins++;
            oScoreEl.textContent = oWins;
        }

    } else if (!gameState.includes("")) {
        statusText.textContent = "😲 It's a Draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    createBoard();
}

createBoard();

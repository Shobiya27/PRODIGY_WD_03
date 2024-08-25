const cells = document.querySelectorAll('.cell'); // Select all cells
let currentPlayer = 'X'; // Start with player 'X'
let gameState = ['', '', '', '', '', '', '', '', '']; // Initialize the game state with empty values
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Add event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Handle cell click event
function handleCellClick(event) {
    const clickedCell = event.target; // Get the clicked cell
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index')); // Get the index of the clicked cell

    // If the cell is already clicked or the game is inactive, return
    if (gameState[clickedCellIndex] !== '' || !isGameActive()) {
        return;
    }

    // Update game state and cell content
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check if the current player has won
    if (checkWin()) {
        alert(Player ${currentPlayer} wins!);
        resetGame();
    } else if (gameState.includes('')) { // Check if there are empty cells
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    } else {
        alert('Draw!');
        resetGame();
    }
}

// Check if the current player has won
function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

// Check if the game is active
function isGameActive() {
    return !gameState.includes('');
}

// Reset the game state
function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}
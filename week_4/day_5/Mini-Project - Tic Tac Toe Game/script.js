// Game state variables
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let playerSymbol = '';
let computerSymbol = '';
let difficulty = 'easy';
let gameActive = false;
let gameEnded = false;

// Winning combinations
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

// DOM elements
const symbolSelection = document.getElementById('symbolSelection');
const difficultySelection = document.getElementById('difficultySelection');
const gameContainer = document.getElementById('gameContainer');
const board = document.getElementById('board');
const currentPlayerText = document.getElementById('currentPlayerText');
const gameStatus = document.getElementById('gameStatus');
const restartBtn = document.getElementById('restartBtn');

// Event listeners for symbol selection
document.querySelectorAll('.symbol-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const { symbol } = e.target.dataset;
        selectSymbol(symbol);
    });
});

// Event listeners for difficulty selection
document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const { difficulty: selectedDifficulty } = e.target.dataset;
        selectDifficulty(selectedDifficulty);
    });
});

// Event listeners for board cells
board.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell') && gameActive && !gameEnded) {
        const { index } = e.target.dataset;
        makeMove(parseInt(index));
    }
});

// Restart button event listener
restartBtn.addEventListener('click', restartGame);

// Symbol selection function
function selectSymbol(symbol) {
    playerSymbol = symbol;
    computerSymbol = symbol === 'X' ? 'O' : 'X';
    
    // Hide symbol selection and show difficulty selection
    symbolSelection.style.display = 'none';
    difficultySelection.style.display = 'block';
}

// Difficulty selection function
function selectDifficulty(selectedDifficulty) {
    difficulty = selectedDifficulty;
    
    // Hide difficulty selection and show game
    difficultySelection.style.display = 'none';
    gameContainer.style.display = 'block';
    
    // Initialize game
    initializeGame();
}

// Initialize game
function initializeGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = playerSymbol;
    gameActive = true;
    gameEnded = false;
    
    // Clear board visually
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'disabled');
    });
    
    // Update UI
    updateCurrentPlayerText();
    gameStatus.textContent = '';
    restartBtn.style.display = 'none';
    
    // If computer goes first
    if (currentPlayer === computerSymbol) {
        setTimeout(() => {
            makeComputerMove();
        }, 500);
    }
}

// Make a move
function makeMove(index) {
    if (gameBoard[index] !== '' || !gameActive || gameEnded) {
        return;
    }
    
    // Update board
    gameBoard[index] = currentPlayer;
    updateBoardDisplay();
    
    // Check for win or tie
    const result = checkGameResult();
    if (result) {
        handleGameEnd(result);
        return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === playerSymbol ? computerSymbol : playerSymbol;
    updateCurrentPlayerText();
    
    // If it's computer's turn, make move after a delay
    if (currentPlayer === computerSymbol && gameActive) {
        setTimeout(() => {
            makeComputerMove();
        }, 500);
    }
}

// Make computer move
function makeComputerMove() {
    if (!gameActive || gameEnded) return;
    
    let moveIndex;
    
    if (difficulty === 'easy') {
        moveIndex = getRandomMove();
    } else {
        moveIndex = getBestMove();
    }
    
    if (moveIndex !== -1) {
        makeMove(moveIndex);
    }
}

// Get random move for easy difficulty
function getRandomMove() {
    const emptyCells = gameBoard
        .map((cell, index) => ({ cell, index }))
        .filter(({ cell }) => cell === '')
        .map(({ index }) => index);
    
    if (emptyCells.length === 0) return -1;
    
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
}

// Get best move for hard difficulty using minimax
function getBestMove() {
    // First, try to win
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = computerSymbol;
            if (checkWinner() === computerSymbol) {
                gameBoard[i] = '';
                return i;
            }
            gameBoard[i] = '';
        }
    }
    
    // Then, try to block player
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = playerSymbol;
            if (checkWinner() === playerSymbol) {
                gameBoard[i] = '';
                return i;
            }
            gameBoard[i] = '';
        }
    }
    
    // If no immediate win/block, use minimax
    return minimax(gameBoard, 0, true).index;
}

// Minimax algorithm for optimal play
function minimax(board, depth, isMaximizing) {
    const winner = checkWinner();
    
    if (winner === computerSymbol) {
        return { score: 10 - depth };
    } else if (winner === playerSymbol) {
        return { score: depth - 10 };
    } else if (board.every(cell => cell !== '')) {
        return { score: 0 };
    }
    
    const moves = [];
    
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            const move = { index: i };
            board[i] = isMaximizing ? computerSymbol : playerSymbol;
            
            const result = minimax(board, depth + 1, !isMaximizing);
            move.score = result.score;
            
            board[i] = '';
            moves.push(move);
        }
    }
    
    let bestMove;
    if (isMaximizing) {
        bestMove = moves.reduce((best, current) => 
            current.score > best.score ? current : best
        );
    } else {
        bestMove = moves.reduce((best, current) => 
            current.score < best.score ? current : best
        );
    }
    
    return bestMove;
}

// Check for winner
function checkWinner() {
    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return null;
}

// Check game result
function checkGameResult() {
    const winner = checkWinner();
    if (winner) {
        return { type: 'win', winner };
    }
    
    // Check for tie using array methods
    const isTie = gameBoard.every(cell => cell !== '');
    if (isTie) {
        return { type: 'tie' };
    }
    
    return null;
}

// Handle game end
function handleGameEnd(result) {
    gameActive = false;
    gameEnded = true;
    
    // Disable all cells
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.add('disabled');
    });
    
    if (result.type === 'win') {
        const winnerName = result.winner === playerSymbol ? 'You' : 'Computer';
        gameStatus.textContent = `${winnerName} won!`;
        gameStatus.style.color = result.winner === playerSymbol ? '#48bb78' : '#e53e3e';
    } else {
        gameStatus.textContent = 'Tie game!';
        gameStatus.style.color = '#718096';
    }
    
    currentPlayerText.textContent = 'Game Over';
    restartBtn.style.display = 'block';
}

// Update board display
function updateBoardDisplay() {
    gameBoard.forEach((cell, index) => {
        const cellElement = document.querySelector(`[data-index="${index}"]`);
        cellElement.textContent = cell;
        if (cell) {
            cellElement.classList.add(cell.toLowerCase());
        }
    });
}

// Update current player text
function updateCurrentPlayerText() {
    if (currentPlayer === playerSymbol) {
        currentPlayerText.textContent = 'Your turn';
        currentPlayerText.style.color = '#4a5568';
    } else {
        currentPlayerText.textContent = 'Computer\'s turn';
        currentPlayerText.style.color = '#e53e3e';
    }
}

// Restart game
function restartGame() {
    // Reset to symbol selection
    symbolSelection.style.display = 'block';
    difficultySelection.style.display = 'none';
    gameContainer.style.display = 'none';
    
    // Reset game state
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    playerSymbol = '';
    computerSymbol = '';
    difficulty = 'easy';
    gameActive = false;
    gameEnded = false;
    
    // Clear status
    gameStatus.textContent = '';
    currentPlayerText.textContent = '';
}

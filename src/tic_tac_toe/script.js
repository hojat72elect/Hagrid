let board;
const playerO = "O";
const playerX = "X";
let currPlayer = playerO;
let gameOver = false;

window.onload = function () {
    drawGameBoard();
}

/**
 * Draw the game's board; is called in the start of each round of the game..
 */
function drawGameBoard() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            const tile = document.createElement("div");
            tile.id = row.toString() + "-" + column.toString();
            tile.classList.add("tile");
            if (row === 0 || row === 1) {
                tile.classList.add("horizontal-line");
            }
            if (column === 0 || column === 1) {
                tile.classList.add("vertical-line");
            }
            tile.innerText = "";
            tile.addEventListener("click", onTileClicked);
            document.getElementById("board").appendChild(tile);
        }
    }
}

/**
 * Will be called whenever a tile is clicked.
 */
function onTileClicked() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");    //ex) "1-2" -> ["1", "2'"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] !== ' ') {
        //already taken spot
        return;
    }

    board[r][c] = currPlayer; //mark the board
    this.innerText = currPlayer; // warning : do not remove this line

    //change players
    if (currPlayer === playerO) {
        currPlayer = playerX;
    } else {
        currPlayer = playerO;
    }

    //check winner
    checkWinner();
}

function checkWinner() {

    let winner = null;
    //horizontally, check 3 rows
    for (let r = 0; r < 3; r++) {
        if (board[r][0] === board[r][1] && board[r][1] === board[r][2] && board[r][0] !== ' ') {
            winner = board[r][0];
            //if we found the winning row
            //apply the winner style to that row
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            document.getElementById("gameStatus").innerText = `Player ${winner} wins!`;
            return;
        }
    }

    //vertically, check 3 columns
    for (let c = 0; c < 3; c++) {
        if (board[0][c] === board[1][c] && board[1][c] === board[2][c] && board[0][c] !== ' ') {
            winner = board[0][c];
            //if we found the winning col
            //apply the winner style to that col
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            document.getElementById("gameStatus").innerText = `Player ${winner} wins!`;
            return;
        }
    }

    //diagonally
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') {
        winner = board[0][0];
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }
        gameOver = true;
        document.getElementById("gameStatus").innerText = `Player ${winner} wins!`;
        return;
    }

    //anti-diagonally
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ') {
        winner = board[0][2];
        //0-2
        let tile = document.getElementById("0-2");
        tile.classList.add("winner");

        //1-1
        tile = document.getElementById("1-1");
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");
        tile.classList.add("winner");
        gameOver = true;
        document.getElementById("gameStatus").innerText = `Player ${winner} wins!`;

    }

    if (board.flat().every(cell => cell !== ' ')) {
        document.getElementById("gameStatus").innerText = "It's a draw!";
        gameOver = true;
    }
}
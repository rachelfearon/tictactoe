const Player = (playerName, inputId) => {
    let token;
    let name = playerName;
    if (inputId == "player1") {
        token = "X";
    } else {
        token = "O";
    }
    return {name, token};
}

const gameDisplay = (function() {
    const boardContainer = document.querySelector('.boardcontainer');
    const squareList = boardContainer.querySelectorAll('p');
    const gameResult = document.querySelector('.gameresult');
    const result = gameResult.querySelector('p');
    const playerOneSpace = document.querySelector(".player1container");
    const playerTwoSpace = document.querySelector(".player2container");
    const formContainer = document.querySelector('.formcontainer');
    boardContainer.style["pointer-events"] = "none";
    
    function displayPlayers(playerObj) {
        if (playerObj.token === "X") {
            const playerOneSpace = document.querySelector(".player1container");
            let p = document.createElement("p");
            p.textContent = `${playerObj.name}`;
            playerOneSpace.append(p);
        } else if (playerObj.token === "O") {
            const playerOneSpace = document.querySelector(".player2container");
            let p = document.createElement("p");
            p.textContent = `${playerObj.name}`;
            playerOneSpace.append(p);
        } else {
            console.log("displayPlayers error");
        }
    };

    const renderBoard = function() {
        const square = squareList;
        const boardMoves = gameLogic.returnBoard();
        for (let i = 0; i < boardMoves.length; i++) {
            square[i].textContent = boardMoves[i];
        }
    }

    function displayWinMessage(token) {
        const playerOneP = playerOneSpace.querySelector('p');
        const playerTwoP = playerTwoSpace.querySelector('p');
        if (token === "X") {
            if (playerOneP != null) {
            gameDisplay.result.textContent = `${playerOneP.textContent} is the winner!`;
            } else if (playerOneP == null) {
                gameDisplay.result.textContent = `X is the winner!`;
            }  
        } else if (token === "O") {
            if (playerOneP != null) {
                gameDisplay.result.textContent = `${playerTwoP.textContent} is the winner!`;
                } else if (playerTwoP == null) {
                    gameDisplay.result.textContent = `O is the winner!`;
                }  
        } else if (token === "It's a tie!") {
            gameDisplay.result.textContent = "It's a tie!";
        } else {
            console.log("displayWinMessage error");
        }
    }

    function clearWinMessage() {
        gameDisplay.result.textContent = "";
    }

    function clearPlayerNames() {
        let p1 = playerOneSpace.querySelector('p');
        let p2 = playerTwoSpace.querySelector('p');
        if (!p1) {
            return;
        } else {
            playerOneSpace.removeChild(p1);
        playerTwoSpace.removeChild(p2);
        }
    }

    function hideForm() {
        formContainer.classList.add('hidden');
    }

    function showForm() {
        formContainer.classList.remove('hidden');
    }

    function resetFormInputs() {
        let inputs = document.querySelectorAll('input');
        inputs[0].value = "X";
        inputs[1].value = "O";
    }

    return {
        displayPlayers,
        renderBoard,
        boardContainer,
        squareList, 
        result,
        displayWinMessage,
        playerOneSpace,
        clearWinMessage,
        clearPlayerNames,
        hideForm,
        showForm,
        resetFormInputs
    }
})();
    
const gameLogic = (function() {
    const winPatterns = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], 
                        [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];

    let board = [``, ``, ``, ``, ``, ``, ``, ``, ``];

    let whoseTurn = "X";

    function returnWhoseTurn() {
        return whoseTurn;
    }

    function updateWhoseTurn(reset) {
        if (reset === true) {
            whoseTurn = "X"
        } else if (whoseTurn === "X") {
            whoseTurn = "O";
        } else {
            whoseTurn = "X"
        }
    }

    function returnBoard() {
        return board;
    }

    function updateBoard(id, token) {
        board[id] = token;
    }

    function resetBoard() {
        board.fill('');
    }

    function findWinPattern() {
        let movesLog = [];
        let win = false;

        board.map((element, index) => {
            if (element === whoseTurn) {
            movesLog.push(index);
            } 
        });

        winPatterns.forEach(element => {
        let pattern = winPatterns.indexOf(element);
        let isWon = winPatterns[pattern].every(ai => movesLog.includes(ai));

        if (isWon === true) {
            return win = true;
        }
        })

    return win;
    }

    return {
        returnBoard,
        updateBoard,
        returnWhoseTurn,
        updateWhoseTurn,
        resetBoard,
        findWinPattern,
    }
})();

const gameController = (function() {
    const resetButton = document.querySelector("#resetbutton");
    const submitButton = document.getElementById("playerSubmit");
    
    submitButton.addEventListener('click', event => {
        gameDisplay.boardContainer.style.removeProperty('pointer-events');
        gameDisplay.hideForm();
        const name1 = document.getElementById("player1").value;
        const name2 = document.getElementById("player2").value;
        playerOne = Player(`${name1}`, `player1`);
        playerTwo = Player(`${name2}`, `player2`);
        gameDisplay.displayPlayers(playerOne);
        gameDisplay.displayPlayers(playerTwo);
        gameDisplay.resetFormInputs();
        
    })

    resetButton.addEventListener('click', event => {
        resetButton.textContent = "Reset Game";
        gameDisplay.showForm();
        gameLogic.resetBoard();
        gameDisplay.renderBoard();
        gameDisplay.clearWinMessage();
        gameDisplay.clearPlayerNames();
        gameDisplay.boardContainer.style["pointer-events"] = "none";
        gameLogic.updateWhoseTurn(true);
    })
    
    gameDisplay.boardContainer.addEventListener('click', function(e) {
        if (!e.target.id) {
            return;
        } else {
            if (e.target.textContent !== "") {
                return;
            } else {
                let turn = gameLogic.returnWhoseTurn();
                gameLogic.updateBoard(e.target.id, turn);
                gameDisplay.renderBoard();

                let playerWins = gameLogic.findWinPattern(`${gameLogic.returnWhoseTurn()}`);
                if (playerWins === true) {
                    gameDisplay.boardContainer.style["pointer-events"] = "none";
                    if (gameLogic.returnWhoseTurn() === "X") {
                        gameDisplay.displayWinMessage("X");
                    } else if (gameLogic.returnWhoseTurn() === "O") {
                        gameDisplay.displayWinMessage("O");
                    }

                    resetButton.textContent = "Play Again";
                } else { 
                    let board = gameLogic.returnBoard();
                    let result = board.every(val => val != "");
                    if (result === true) {
                        gameDisplay.displayWinMessage("It's a tie!");
                    } else {
                        gameLogic.updateWhoseTurn(turn);
                    }
                }
            }
        }
    })
})();
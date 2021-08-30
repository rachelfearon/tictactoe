//player factory function
    //take in name & token input
    //return player objs w/ name, token props

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


//board display module
const gameDisplay = (function() {
    const boardContainer = document.querySelector('.boardcontainer');
    const squareList = boardContainer.querySelectorAll('p');
    const gameResult = document.querySelector('.gameresult');
    const result = gameResult.querySelector('p');
    const playerOneSpace = document.querySelector(".player1container");
    const playerTwoSpace = document.querySelector(".player2container");
    const formContainer = document.querySelector('.formcontainer');
    

    //update DOM with player name info upon receiving call from event listener
    function displayPlayers(playerObj) {
        console.log("displaying players", playerObj);
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

    //populate grid based on board array contents
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
        }
    }

    function clearWinMessage() {
        gameDisplay.result.textContent = "";
    }

    function clearPlayerNames() {
        playerOneSpace.removeChild(playerOneSpace.lastElementChild);
        playerTwoSpace.removeChild(playerTwoSpace.lastElementChild);
    }

    function toggleHideForm() {
        formContainer.classList.toggle("hidden");
    }

    //update box display on click (from controller module), receive token input & update textContent
    //display player names/tokens from inputs (from controller on btn submit)
    //display win or tie msg at game end
    //hide/reveal player input/btn
    //display button for reset game


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
        toggleHideForm
    }
})();
    


//game logic
const gameLogic = (function() {
    const winPatterns = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], 
                        [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];
    
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

    let board = [``, ``, ``, ``, ``, ``, ``, ``, ``];

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
    //decide what happens if filled square is clicked
    //decide what happens if empty square is clicked - update whose turn it is after move is made
    //check whose turn it is - or rather, say what happens depending on the turn
    //check for winning array pattern (store winning pattern in local variable)


//game controller
const gameController = (function() {
    let playerOne, playerTwo;
    
    const resetButton = document.querySelector("#resetbutton");
    //const board = gameBoard.boardContainer;
    //On player info submit, pass input value & token to Player FF - receive and store player objs
    const submitButton = document.getElementById("playerSubmit");
    submitButton.addEventListener('click', event => {
        gameDisplay.toggleHideForm();
        const name1 = document.getElementById("player1").value;
        const name2 = document.getElementById("player2").value;
        playerOne = Player(`${name1}`, `player1`);
        playerTwo = Player(`${name2}`, `player2`);
        console.log(playerOne);
        console.log(playerTwo);
        // send it to display function to update DOM
        gameDisplay.displayPlayers(playerOne);
        gameDisplay.displayPlayers(playerTwo);

    })

    function logPlayer () {
        return {playerOne, playerTwo};
    }

    //set whose turn it is now, update on successful move (if square is not empty)
    //on reset game btn, reset board array, player info, clear display
    resetButton.addEventListener('click', event => {
        resetButton.textContent = "Reset Game";
        gameDisplay.toggleHideForm();
        gameLogic.resetBoard();
        gameDisplay.renderBoard();
        gameDisplay.clearWinMessage();
        gameDisplay.clearPlayerNames();
        gameDisplay.boardContainer.style.removeProperty('pointer-events');
        gameLogic.updateWhoseTurn(true);
    })
    

    
    gameDisplay.boardContainer.addEventListener('click', function(e) {
        let playerOne;
        let playerTwo;
        if (!e.target.id) {
            return;
        } else {
            //on grid click, check for empty square
            if (e.target.textContent !== "") {
                return;
            } else {
                //check whose turn it is
                let turn = gameLogic.returnWhoseTurn();
                //fill square with appropriate player token
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
                    console.log("winner");
                    //reveal win message div
                    //append win message div with win message
                    //change Reset Button text to read "Play Again"
                    resetButton.textContent = "Play Again";
                } else { //insert logic here to check if all board indexes have values, if they do, declare a tie, else keep going
                    gameLogic.updateWhoseTurn(turn);
                }
            }
        }
    })
    //update board array with new player token spot
    //check for winning pattern
    
    //declare winner, reset

    return {
        logPlayer, 
        returnPlayer: function() {return {playerOne, playerTwo}}

    }
    
})();






// const gameBoard = (function() {
    

//     const renderBoard = (function() {
//         const square = gameDisplay.squareList;
//         const boardMoves = gameLogic.returnBoard();
//         for (let i = 0; i < boardMoves.length; i++) {
//             square[i].textContent = boardMoves[i];
//             }
//     })();


//     return {
//         renderBoard,
//         boardContainer
//     }
// })(); 



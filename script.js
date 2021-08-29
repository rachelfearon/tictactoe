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

    //update box display on click (from controller module), receive token input & update textContent
    //display player names/tokens from inputs (from controller on btn submit)
    //display win or tie msg at game end
    //hide/reveal player input/btn
    //display button for reset game


    return {
        displayPlayers,
        renderBoard,
        boardContainer,
        squareList
    }
})();
    


//game logic
const gameLogic = (function() {
    

    let board = [
        ``,
        ``,
        ``,
        ``,
        ``,
        ``,
        ``,
        ``,
        ``
    ];

    function returnBoard() {
        return board;
    }

    function updateBoard(id, token) {
        board[id] = token;
    }

    return {
        returnBoard,
        updateBoard
    }
})();
    //decide what happens if filled square is clicked
    //decide what happens if empty square is clicked - update whose turn it is after move is made
    //check whose turn it is - or rather, say what happens depending on the turn
    //check for winning array pattern (store winning pattern in local variable)


//game controller
const gameController = (function() {

    //const board = gameBoard.boardContainer;
    //On player info submit, pass input value & token to Player FF - receive and store player objs
    const submitButton = document.getElementById("playerSubmit");
    submitButton.addEventListener('click', event => {
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
        console.log(playerOne);
        console.log(playerTwo);
    }

    //set whose turn it is now, update on successful move (if square is not empty)
    //on reset game btn, reset board array, player info, clear display
    //on grid click, check for empty square
    //check whose turn it is

    //fill square with appropriate player token
    gameDisplay.boardContainer.addEventListener('click', function(e) {
        console.log(e.target);

        if (!e.target.id) {
            return;
        } else {
            //TODO replace "X" with selected token var
            gameLogic.updateBoard(e.target.id, "X");
            gameDisplay.renderBoard();
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



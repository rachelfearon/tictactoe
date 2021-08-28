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
    //populate grid based on board array contents
    //update box display on click (from controller module), receive token input & update textContent
    //display player names/tokens from inputs (from controller on btn submit)
    //display win or tie msg at game end
    //hide/reveal player input/btn
    //display button for reset game


//game logic
    //decide what happens if filled square is clicked
    //decide what happens if empty square is clicked - update whose turn it is after move is made
    //check whose turn it is - or rather, say what happens depending on the turn
    //check for winning array pattern (store winning pattern in local variable)


//game controller
    
const gameController = (function() {
    // let playerOne = {};

    //const board = gameBoard.boardContainer;
    //On player info submit, pass input value & token to Player FF - receive and store player objs
    const submitButton = document.getElementById("playerSubmit");
    submitButton.addEventListener('click', event => {
        const name1 = document.getElementById("player1").value;
        const name2 = document.getElementById("player2").value;
        playerOne = createPlayer(`${name1}`, "player1");
        playerTwo = createPlayer(`${name2}`, "player2");
        // playerOne = Player(`${name1}`, `player1`);
        // playerTwo = Player(`${name2}`, `player2`);
        console.log(playerOne);
        console.log(playerTwo);
        return {playerOne: playerOne};
    })


    function createPlayer(name, token) {
        let obj = Player(name, token);
        return obj;
    }


    function logPlayer () {
        console.log(playerOne);
        console.log(playerTwo);
    }

    //set whose turn it is now, update on successful move (if square is not empty)
    //on reset game btn, reset board array, player info, clear display
    //on grid click, check for empty square
    //check whose turn it is
    //fill square with appropriate player token
    // board.addEventListener('click', function(e) {
    //     console.log(e.target);
    //     if (!e.target.id) {
    //         return;
    //     } else {
    //         gameBoard.board[e.target.id] = "player token";
    //update board array with new player token spot
    //check for winning pattern
    //declare winner, reset

    return {
        logPlayer, 
        returnPlayer: function() {return {playerOne, playerTwo}}
        //playerOne,
       //playerTwo
    }
    
})();






const gameBoard = (function() {
    'use strict';
    const boardContainer = document.querySelector('.boardcontainer');
    const squareList = boardContainer.querySelectorAll('p');

    let board = [
        `X`,
        ``,
        ``,
        ``,
        `O`,
        ``,
        ``,
        ``,
        ``
    ];

    const renderBoard = (function() {
        const square = squareList;
        const boardMoves = board;
        for (let i = 0; i < board.length; i++) {
            square[i].textContent = boardMoves[i];
            }
    })();


    return {
        board, // this will need to be made private, create a function which will update this and export that
        renderBoard,
        boardContainer
    }
})(); 



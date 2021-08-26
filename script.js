
//set up module for Gameboard, store in array

const gameBoard = (function() {
    'use strict';

    let board = [
        `X`,
        `X`,
        `X`,
        `O`,
        `O`,
        `O`,
        `X`,
        `X`,
        `X`
    ];

    function printBoard() {
        console.log(board);
    };

    function displayMoves() {
        const boardContainer = document.querySelector('.boardcontainer');
        const p = boardContainer.querySelectorAll('p');
        console.log(p);
        
            for (let i = 0; i < board.length; i++) {
                p[i].textContent = board[i];
                }
                
            }
            

    const theP = displayMoves();

    return {
        board,
        printBoard,
        displayMoves, 
        theP
    }
})(); 


//set up module for Display Controller

const displayController = (function() {
    //get the board array of moves; for each item, 
    console.log(board)


    //change textContent of the selected p/box = value of item
});

//set up factory for players (and moves?)
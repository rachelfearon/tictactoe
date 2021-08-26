
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

    return {
        board,
        printBoard
    }
})(); 

//set up module for Display Controller

//set up factory for players (and moves?)
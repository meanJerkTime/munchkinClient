'use strict';
require('dotenv').config();
const { listenerCount } = require('enquirer');
const inquirer = require('inquirer');

const io = require('socket.io-client');


// let host = 'https://munchkin-401-hub.herokuapp.com';
let host = 'http://localhost:5000';


const socket = io.connect(host, {
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax' : 5000,
    'reconnectionAttempts': 5
});

socket.on('player', (payload) => {
    console.log('I am player', payload);
})

socket.on('playerTurn', () =>{
    inquirer
    .prompt([
        {
        type:'list',
        name: 'play',
        message: 'would you like to play a card?',
        choices: ['play card']
        }
    ])
    .then(answer => {
        socket.emit('nextPlayer'); 
        console.log('Turn ended')
    })
})
 
'use strict';
require('dotenv').config();
const inquirer = require('inquirer');
const Choice = require('inquirer/lib/objects/choice');

const io = require('socket.io-client');


// let host = 'https://munchkin-401-hub.herokuapp.com';
let host = 'http://localhost:5000';

const socket = io.connect(host, {
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax' : 5000,
    'reconnectionAttempts': 5
});

    let character = {
        level:0,
        armour:0,
        attack:0
    };  
    
    socket.on('winnerWinner', (payload) => {
        console.log(payload);
    })

    socket.on('player', payload => {
    console.log(payload);
    })
    socket.on('cards', (hand) => {
    let playerHand = hand;

    socket.on('playerTurn', () =>{
        console.log(character);
        inquirer
        .prompt([
            {
                type:'list',
                name: 'play',
                message: 'Press play to start the game?',
                choices: ['Play']
            }
        ])
        .then(answer => {
            if(answer.play == 'Play') {
                inquirer
                .prompt([
                    {
                        type:'list',
                        name:'choose',
                        message: 'Would you like to play a card before kicking down a door?',
                        choices: ['Yes, I\'ll play a card.', 'No, let\'s kick down that door!']
                    }
                ])
                .then(choice => {
                    if(choice.choose == 'Yes, I\'ll play a card.') {
                        // console.log(hand);
                        inquirer
                        .prompt([
                    {
                        type:'checkbox',
                        name:'playCards',
                        message: 'Choose cards to play!',
                        choices: hand,
                    }
                    ])
                    .then(choice => {
                        console.log(choice);
                        for(let i = 0; i <= playerHand.length-1; i++) {
                            if(choice.playCards == playerHand[i].name) {
                                character.level = character.level + playerHand[i].level;
                                character.armour = character.armour + playerHand[i].armour;
                                character.attack = character.attack + playerHand[i].weapon;
                                console.log(character);
                                // console.log(playerHand[i]);

                            }
                        }
                        if(character.level === 10) {
                            socket.emit('winner')
                        }
                        else {
                            socket.emit('nextPlayer'); 
                            console.log('Turn ended');
                        }
                    })
                    }
                    else if(choice.choose == 'No, let\'s kick down that door!') {
                        console.log('you kicked down a door');
                        socket.emit('nextPlayer'); 
                        console.log('Turn ended');
                    }
                })
            }
        })
    })
})

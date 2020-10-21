'use strict';

const inquirer = require('inquirer');

'use strict';

/** 3rd party dependencies */
// require('dotenv').config({path: require('find-config')('.env')});
const io = require('socket.io-client');

// host needs to change to the heroku host
const host = 'http://localhost:3000';
const socket = io.connect(host);

socket.on('toClient', () => {

// console.log('recieved from hub');

  inquirer
    .prompt([
        {
            type: 'list',
            name: 'joinCreateRoom',
            message: 'Would you like to...',
            choices: ['join a room', 'create a room']

        },
        
    ])
    .then(answers => {
        if(answers.joinCreateRoom == 'join a room') {
            inquirer
            .prompt([
                {
                type: 'list',
                name: 'room',
                message: 'Please Select a Room to Join',
                choices: ['R3','R4','R5','R6']
                },
            ])
            .then(answers => {
                socket.emit('joinRoom', answers.room);
            });
        }

        // create a room needs to be built out first
        if(answers.joinCreateRoom == 'create a room'){
            inquirer
            .prompt([
                {
                    type: 'list',
                    name:'roomsList',
                    message: 'Create A Room',
                    choices: ['R3','R4','R5','R6']
                },
            ])
            .then ((answers) =>{
                console.log('you have created Room', answers.roomsList);
                socket.emit('createRoom', answers.roomsList);
                socket.emit('answers',answers);
            });
        }
    });
});

socket.emit('fromClient');

// setInterval( () => {
//   socket.emit('fromPlayer1');
// }, 2000);


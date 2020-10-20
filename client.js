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
  console.log('recieved from hub');
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
                name: 'rooms',
                message: 'Please Select a Room to Join',
                choices: ['Joes Room', 'Edgars Room', 'Dianes Room']
                },
            ])
            .then(answers => {
                console.log('you have joined', answers.rooms);
            });
        }

        // create a room needs to be built out first
        if(answers.joinCreateRoom == 'create a room'){
            inquirer
            .prompt([
                {
                    type: 'list',
                    name:'numPlayers',
                    message: 'How many players',
                    choices: ['3','4','5','6']
                },
            ])
            .then ((answers) =>{
                console.log('you have created a new room with a max of', answers.numPlayers,'players');
                socket.emit('answers', `player wants to create a room with ${answers.numPlayers} players`);
                socket.emit('createRoom', 'room1');
                console.log(answers);
            });
        }
    });
});




setTimeout( () => {
  socket.emit('fromClient');
}, 2000);
// setInterval( () => {
//   socket.emit('fromPlayer1');
// }, 2000);


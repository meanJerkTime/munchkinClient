'use strict';

const inquirer = require('inquirer');

'use strict';

/** 3rd party dependencies */
// require('dotenv').config({path: require('find-config')('.env')});
const io = require('socket.io-client');

/** Custom modules */
const Player = require('./lib/player.js'); // Player class object.

/** Socket connections to hub */
const host = 'http://localhost:3000' // Points to server hub is running on.
const socket = io.connect(host); // Global connection to hub.
const gameRoomConnection = io.connect(`${host}/gameroom`); // Connection to hub namespace.


// gameRoomConnection.on('toClient', () => {

// // console.log('recieved from hub');

//   inquirer
//     .prompt([
//         {
//             type: 'list',
//             name: 'joinCreateRoom',
//             message: 'Would you like to...',
//             choices: ['join a room', 'create a room']

//         },
        
//     ])
//     .then(answers => {
//         if(answers.joinCreateRoom == 'join a room') {
//             inquirer
//             .prompt([
//                 {
//                 type: 'list',
//                 name: 'room',
//                 message: 'Please Select a Room to Join',
//                 choices: ['R3','R4','R5','R6']
//                 },
//             ])
//             .then(answers => {
//               gameRoomConnection.emit('joinRoom', answers.room);
//             });
//         }

//         // create a room needs to be built out first
//         if(answers.joinCreateRoom == 'create a room'){
//             inquirer
//             .prompt([
//                 {
//                     type: 'list',
//                     name:'roomsList',
//                     message: 'Create A Room',
//                     choices: ['R3','R4','R5','R6']
//                 },
//             ])
//             .then ((answers) =>{
//                 console.log('you have created Room', answers.roomsList);
//                 gameRoomConnection.emit('createRoom', answers.roomsList);
//                 gameRoomConnection.emit('answers',answers);
//             });
//         }
//     });
// });

gameRoomConnection.on('game-start', () => {

  let player = new Player();
  console.log(player);

});



/* 

BASIC TURN ORDER

1. players joins a room
2. game starts
3. players roll for turn order
4. P1 kicks down door
5. Is it a monster? 
  i. combat starts
  ii. if P1 can beat monster:
    a. P1 level++
    b. P1 recieves treasure
    c. P1 can play any applicable cards
  iii. if P1 can't beat monster
    a. ask for help (stretch goal)
    b. roll d6 to run away
      1. if roll succeeds, P1 turn is over
      2. if roll fails, P1 loses combat
      3. resolve any bad stuff
6. Is it a curse?
  i. curse effect applies to P1 immediately
  ii. P1 can look for trouble or loot the room (see below)
7. Is it neither?
  i. P1 can look for trouble
    a. play monster from your hand, standard combat rules apply
  ii. P1 can loot the room
    a. face down door card goes into P1s hand
8. P1 plays any applicable cards i.e. equipment, curses against other players etc
9. P1 turn is over, P2 turn start
10. Repeat from step 1

*/
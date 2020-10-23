'use strict';

/** 3rd party dependencies */
// require('dotenv').config({path: require('find-config')('.env')});
const io = require('socket.io-client');
const Enquirer = require('enquirer');

/** Custom modules */

/** Socket connections to hub */
const host = 'http://localhost:3000' // Points to server hub is running on.
const socket = io.connect(host); // Global connection to hub.
// const gameRoomConnection = io.connect(`${host}/gameroom`); // Connection to hub namespace.

socket.emit('test', 'hello world')

/** Game loop */
const enquirer = new Enquirer();

async function setUpRoom(){

  const userObj = {};

  const askUsername = await enquirer.prompt({
    type: 'input',
    name: 'username',
    message: 'What is your username?'
  });

  userObj.username = askUsername.username;
  
  const creatOrJoinRoom = await enquirer.prompt({
    type: 'select',
    name: 'createOrJoin',
    message: `Welcome ${askUsername.username}! Would you like to create a new game or join an existing one?`,
    choices: ['Create a new room', 'Join an existing room'],
  });

  if( creatOrJoinRoom.createOrJoin === 'Create a new room' ){

    const roomName = await enquirer.prompt({
      type: 'input',
      name: 'roomName',
      message: 'What would you like to call your game room?'
    });

    userObj.room = roomName.roomName;
    socket.emit('get-user-info', userObj);

  } else {

    socket.on('user-info', () => {
      console.log('recieved user info');
    });

    const joinExistingRoom = await enquirer.prompt({
      type: 'select',
      name: 'join-room',
      message: 'Choose the room you want to join',
      choices: ['rooms', 'list'],
    });

  };

  console.log(userObj);

};

setUpRoom();

async function start(){

  const askUsername = await enquirer.prompt({
    type: 'input',
    name: 'username',
    message: 'What is your username?'
  });

  gameRoomConnection.emit('get-player-username', askUsername.username);

  const playerSex = await enquirer.prompt({
    type: 'select',
    name: 'sex',
    message: 'Choose player sex',
    choices: ['male', 'female'],
  });

  gameRoomConnection.on('ready-player-1', msg => {
    console.log(msg);
  });

  // const munchkin = {
  //   username = askUsername.username,
  //   player = player,
  // };

  gameRoomConnection.emit('player-object', munchkin);

};

function rollTurnOrder(){
  const diceRoll = Math.floor(Math.random() * 6)+1;
  return diceRoll;
};

async function kickDownDoor(){

  const monster = m1;

};

async function combat(){

};

async function applyCurse(){

};

async function lootTheRoom(){

};

async function lookForTrouble(){

};

/* 

BASIC TURN ORDER

1. players joins a game
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
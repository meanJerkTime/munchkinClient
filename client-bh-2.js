'use strict';
require('dotenv').config();
const inquirer = require('inquirer');
const Choice = require('inquirer/lib/objects/choice');
const Enquirer = require('enquirer');

const io = require('socket.io-client');


// let host = 'https://munchkin-401-hub.herokuapp.com';
let host = 'http://localhost:5000';

const socket = io.connect(host, {
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax' : 5000,
    'reconnectionAttempts': 5
});

let player = {};

login();

    function login() {
      console.log(player, 'first');
        inquirer
          .prompt([
              {
                  type: 'list',
                  name: 'signUpSignIn',
                  message: 'Would you like to...',
                  choices: ['Sign Up', 'Sign In']
      
              },  
          ])
          .then(answers => {
              if(answers.signUpSignIn == 'Sign Up') {
                  inquirer
                  .prompt([
                      {
                      type: 'input',
                      name: 'userName',
                      message: 'Please Enter a Username',
                      },
                      {
                      type: 'input',
                      name: 'password',
                      message: 'Please Enter a Password', 
                      }
                  ])
                  .then(answers => {
                      socket.emit('signUp', answers);
                      inquirer
                  .prompt([
                      {
                          type: "input",
                          name:"userName",
                          message: 'Please Enter Your Username',
                      },
                      {
                          type: "input",
                          name:"password",
                          message: 'Please Enter Your Password',
                      },
                  ])
                  .then ((answers) =>{
                      socket.emit('signIn', answers);
                      socket.on('valid', (payload) => {
                          // console.log('Success you are logged in!'); 
                          player.name = payload.userName; 
                          socket.emit('ready', player);
                         
                      })
                      socket.on('inValid', () => {
                      console.log('Invalid Login');
                      socket.disconnect();
                      })
                  });
                  });
              }
              // create a room needs to be built out first
              if(answers.signUpSignIn == 'Sign In'){
                  inquirer
                  .prompt([
                      {
                          type: "input",
                          name:"userName",
                          message: 'Please Enter Your Username',
                      },
                      {
                          type: "input",
                          name:"password",
                          message: 'Please Enter Your Password',
                      },
                  ])
                  .then ((answers) =>{
                      socket.emit('signIn', answers);
                      socket.on('valid', (payload) => {
                        // console.log('Success you are logged in!');
                        // create promtps to add to payload character then emit the 'ready' event
                        player.name = payload; 
                        console.log(player, 'second')
                         
                        socket.emit('ready', player);
                      })
                      socket.on('inValid', () => {
                      console.log('Invalid Login');
                      })
                  });
              }
          });
        }
      























    /** Game loop */
const enquirer = new Enquirer();

//creates or joins a room based on user input

socket.on('playerTurn', (payload) => {
  console.log(payload, 'four');

  if(!payload.player) {
    socket.emit('new-munchkin', payload);
    }
    else {
      playHand();
    }
})
  // console.log(payload, 'player array');


// async function setUpRoom(){
//     try {

//   // const userObj = {};


//   // const askUsername = await enquirer.prompt({
//   //   type: 'input',
//   //   name: 'username',
//   //   message: 'What is your username?'
//   // });

//   // userObj.username = askUsername.username;
  
//   const createOrJoinRoom = await enquirer.prompt({
//     type: 'select',
//     name: 'createOrJoin',
//     message: `Welcome ${payload.name}! Would you like to create a new game or join an existing one?`,
//     choices: ['Create a new room', 'Join an existing room'],
//   });

//   if( createOrJoinRoom.createOrJoin === 'Create a new room' ){

//     const roomName = await enquirer.prompt({
//       type: 'input',
//       name: 'roomName',
//       message: 'What would you like to call your game room?'
//     });

//     player.room = roomName.roomName;

//     // sends username and new room name to event
//     socket.emit('create-room', player);

//     start();

//   } else if (createOrJoinRoom.createOrJoin === 'Join an existing room') {

//     // signals the hub that someone wants to join an existing room
//     socket.emit('join-room');
    
//     // retireves a list of rooms from the hub
//     socket.on('get-room-list', async (rooms) => {
      
//       let roomList = rooms;

//       const joinExistingRoom = await enquirer.prompt({
//         type: 'select',
//         name: 'joinRoom',
//         message: 'Choose the room you want to join',
//         initial: 'No rooms available. Try creating one!',
//         choices: roomList,
//       });

//       player.joinedRoom = joinExistingRoom.joinRoom;

//       socket.emit('has-joined-room', player);

//       start();

//     });

//   };
//     }
//     catch(e){
//         console.log(e);
//     }
// };

// setUpRoom()


// async function start(){
// try{
//   socket.on('add-new-player', async (username, player) => {

//     const playerSex = await enquirer.prompt({
//       type: 'select',
//       name: 'sex',
//       message: 'Choose player sex',
//       choices: ['male', 'female'],
//     });
//     console.log('selected male');
//     // socket.emit('nextPlayer');
//         player.sex = playerSex.sex;
    
        // const munchkin = {
        //   username: payload.name,
        //   player: player,
        // };
        // console.log(munchkin, 'this is munchkin obect');
    
       
        // playHand();
    
    

//   });
// } catch(e){
//     console.log(e);
// }

// };

// // will be used to randomize player turn order
// function rollTurnOrder(){

// };
// inital step of each turn. draws new face down door card, checks what it is and then makes the appropriate function call
function playHand(){
    socket.on('play-hand', async (payload) => {
        console.log('playHand Func');
        
    const playInitialCards = await enquirer.prompt({
      type: 'select',
      name: 'chooseAction',
      message: 'Would you like to play a card before kicking down a door?',
      choices: ['Yes, I\'ll play a card.', 'No, let\'s lick down that door!']
    });

    if(playInitialCards.chooseAction === 'Yes, I\'ll play a card.'){

      const lookAtHand = await enquirer.prompt({
        type: 'select',
        name: 'listCards',
        message: 'Would you like to see your hand?',
        choices: ['Yes', 'No']
      });

      if(lookAtHand.listCards === 'Yes'){

        // looks at the player's hand
        console.log(listHand(payload.player.hand));

        let cardNames = [];
        payload.player.hand.forEach( element =>{
          cardNames.push(element.name);
        });
        
        const playCards = await enquirer.prompt({
          type: 'multiselect',
          name: 'playCards',
          message: 'Choose cards to play!',
          hint: 'move with arror keys, select with space',
          choices: cardNames,
        });

        // console.log('playCards prompt', playCards);

        // console.log('playCards.playCards', playCards.playCards);
        // console.log('payload.player.hand', payload.player.hand);
        
        // cards the user has selected from their hand to play
        let cardsToPlay = [];

        payload.player.hand.forEach( idx => {
          if(playCards.playCards.includes(idx.name)){
            cardsToPlay.push(idx)
          };
        });

        playSelectedCards(payload, cardsToPlay);

        socket.emit('hand-has-been-played', payload);

        kickDownDoor();

      };

    } else if(playInitialCards.chooseAction === 'No, let\'s lick down that door!'){

      socket.emit('hand-has-been-played', payload);

      kickDownDoor();

    };

  });

};

function kickDownDoor(){

  socket.on('kick-down-door', (payload, card) => {

    setTimeout( () => {
      console.log('Alright brave and mighty Munchkin, kick down that door!');

      if(card.type === 'monster'){

        combat(payload, card);

        socket.emit('combat-ended', payload, card);

      } else if (card.type === 'curse'){
        //applyCurse();
        console.log('you are cursed!');

      } else {
        console.log('cards in your hand ++');
        // add card to players hand
        // prompt user to loot room or look for trouble
          // if loot the room
            // lootTheRoom()
          // if look for trouble
            // lookForTrouble()
      };

    }, 1000);

  });

};

// pits player.combatPower against monster.level. 2 cards enter, 1 card leaves!
function combat(payload, monster){

  setTimeout( () => {
    console.log('Two cards enter, one card leaves! It\'s Munchkin time!');

    if(payload.player.combatPower > monster.level){

      // if player.job === warrior, will win on a tie

      setTimeout( () => {
        console.log(`Huzzah! You have prevailed over the ${monster.name}. For your mighty deeds, you have earned ${monster.levelsGiven} levels and ${monster.treasures} treasure!`);

        // apply new level and treasure to player object on hub from socket.emit('combat-ended')

      });
    } else if(payload.player.combatPower <= monster.level){

      // have items to boost power or weaken an enemy?
      // ask a friend to help? (stretch goal)
      // if not, roll to run away, else bad stuff incoming

    } else {

      console.log('Oh no! You get some Bad Stuff!');
      badStuff(payload, monster);

    };


  },3000);
  nextPlayerTurn();

};


function badStuff(payload, monster){

  // apply monster.badStuff to player
  // if player dies, socket.emit('new-munchkin', payload) and start over;
  // make sure to pass player.level to the new munchkin via payload to preserve username
  // player.dead = true

};

// takes a given curse card and applies the effects of that card to player.curse
async function applyCurse(payload, curse){

};

// draws a face down door card and adds to player.hand
async function lootTheRoom(){

};

// initializes combat with a monster from players hand. must verify a monster is in the players hand before this function is run
async function lookForTrouble(){

};

// list players hand. should be run (prompted) at each step.
function listHand(hand){

  let list = JSON.stringify(hand, null, 2);
  return list;

};

function playSelectedCards(payload, cards){

  // console.log({player});
  // console.log({cards});
  // console.log(player.gear);

  // if card.type == gear/loot/equipment
  // add selected cards to player.gear
  cards.forEach( idx => {
    payload.player.gear[idx.name] = idx;
    payload.player.gear.bonus += idx.bonus;
    payload.player.combatPower = (payload.player.level + payload.player.gear.bonus)
  });

  // pulls names off of cards for reference
  let cardNames = [];
  cards.forEach( idx => {
    cardNames.push(idx.name);
  });
  
  // adds a new hand to the player by pushing unused cards into a new array
  let newHand = [];
  payload.player.hand.forEach( idx => {
    if(!cardNames.includes(idx.name)){
      newHand.push(idx);
    };
  });

  // set new hand to player
  payload.player.hand = newHand;

  // console.log(player);
  return payload;

};

// will discard (n) number of cards
function discard(player, n){
  // ensure validation is in place to limit player hand to 5, or 6 if player.job === dwarf
};

function nextPlayerTurn() {
  setTimeout(() => {
    socket.emit('nextPlayer');
    
  },3000)
}


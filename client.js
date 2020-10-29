'use strict';
require('dotenv').config();
const inquirer = require('inquirer');
const Choice = require('inquirer/lib/objects/choice');
const Enquirer = require('enquirer');
const enquirer = new Enquirer();

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

socket.on('valid', (payload) => {
  // console.log('Success you are logged in!'); 
  player.name = payload.userName; 
  socket.emit('ready', player);
 
})
socket.on('inValid', () => {
  console.log('Invalid Login');
  socket.disconnect();
})

socket.on('kick-down-door', kickDownDoor);

socket.on('play-hand', playHand);

socket.on('playerTurn', playerTurn);

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
                
              });
            })
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
              });
          }
      });
}
    

 async function playerTurn(payload){
  console.log(payload, 'four');
  if(!payload.player) {
    
    socket.emit('new-munchkin', payload);
    }
    else {
      playHand(payload);
    }
}

  async function playHand(payload){
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

        // kickDownDoor();

      };

    } else if(playInitialCards.chooseAction === 'No, let\'s lick down that door!'){

      socket.emit('hand-has-been-played', payload);

      // kickDownDoor();

    };

}


 async function kickDownDoor(payload, card){

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

};

// pits player.combatPower against monster.level. 2 cards enter, 1 card leaves!
async function combat(payload, monster){

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
  nextPlayerTurn(payload);

};


async function badStuff(payload, monster){

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

function nextPlayerTurn(payload) {
  setTimeout(() => {
    socket.emit('nextPlayer', payload);
    
  },3000)
}


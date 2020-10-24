'use strict';
require('dotenv').config();

const { prompt } =require('enquirer');
const { Select } = require('enquirer');
const { Input } = require('enquirer');
const io = require('socket.io-client');

// let host = 'https://munchkin-401-hub.herokuapp.com';
let host = 'http://localhost:5000';


const socket = io.connect(host);

socket.emit('fromPlayer');


socket.on('toPlayer', async () => {

    const login = new Select({
        name: 'signUpSignIn',
        message: 'Would you like to ...',
        choices: ['Sign Up', 'Sign In']
      });
       
      login.run()
        .then, async (answers => {
            if(answers == 'Sign Up') {
                const question = [
                    {
                    type: 'input',
                    name: 'username',
                    message: 'What is your player name?',
                    },
                    {
                    type: 'password',
                    name: 'password',
                    message: 'What is your password?',
                    },
                  
                ];
                // signup username 
                let answers = prompt(question);       
            }
            if(answers == 'Sign In') {
                console.log(answers);
                const username = new Input({
                    message: 'What is your username?',
                  });
                   
                  username.run()
                    .then(answer => console.log('Username:',answer))
                    .catch(console.log);
                  
            }

        })
        .catch(console.error); 
});


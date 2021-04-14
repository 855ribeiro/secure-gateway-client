const dotenv = require("dotenv").config();
const io = require('socket.io-client');
const axios = require('axios');
const express = require('express');
const {v4: uuidv4} = require('uuid');

const {AUTH_TOKEN, SERVER_URL} = process.env;

const app = express();
const client_id = uuidv4();

/*
* Setting up socket connection to the server
*/
const socket = io(SERVER_URL, {
    rejectUnauthorized: false, // WARN: please do not use this in production
    reconnectionDelayMax: 10000,
    auth: {
        token: AUTH_TOKEN
    },
    query: {
        client_id
    }
});

/*
* Event is trigger when a connection to the server is made
*/
socket.on('connect', () => {
    console.log(`\nConnection to server reached: ${SERVER_URL}`);
    console.log(`Client_id: ${client_id} \n`);
})

/*
* Event is trigger when a disconnection to the server happen
*/

socket.on('disconnect', () => {
    console.log('connection closed, reconnecting...')
})


/*
* Event is trigger when there're problems to connect with the server
*/
socket.on('connect_error', (error) => {
    console.error(`\nIssue connecting to the Server (${SERVER_URL})`);
    console.error(`Error description: ${error.description} - ${error.message}\n\n`);
})


/*
* Event is trigger when there're actions to be executed
*/
socket.on('execute', async (data, callback) => {
    console.log('Received action from Server');
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    callback(response.data);
})

app.listen(8080, () => console.log('Application started on port 8080'));
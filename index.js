const dotenv = require("dotenv").config();
const io = require('socket.io-client');
const axios = require('axios');
const {v4: uuidv4} = require('uuid');

const {AUTH_TOKEN} = process.env;
const client_id = uuidv4();

const socket = io('ws://localhost:3000', {
    reconnectionDelayMax: 10000,
    auth: {
        token: AUTH_TOKEN
    },
    query: {
        client_id
    }
});

socket.on('connect', () => {
    console.log('connected - client_id =', client_id)
})

socket.on('disconnect', () => {
    console.log('connection closed, reconnecting...')
})

socket.on('connect_error', (error) => {
    console.error(error.message);
})

socket.on('execute', async (data, callback) => {
    console.log('Received action from Server');
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    callback(response.data);
})

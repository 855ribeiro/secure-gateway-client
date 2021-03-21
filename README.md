# Secure Gateway - Client

This is a proof of concept project in which the main idea is to enable server communication with WebSockets, especially [Socket.io](https://socket.io/). The client contains a few event listeners which are described below:

- `connect`: The event is triggered when the connection to the server was established. The message will be displayed in your terminal with a generated UUID as the `client_id`.
- `disconnect`: Event is triggered when the client disconnects from the Server and will try to reconnect every 10 seconds
- `connect_error`: Event is triggered when there was an issue when trying to establish communication with the Server
- `execute`: Event is triggered when the Server requests for data at [Chuck Norris API (random)](https://api.chucknorris.io/) and the value is returned with a callback

Make sure you have configured the [Server Application](https://github.com/855ribeiro/secure-gateway-server)

To connect into the Socket Server you need to specify the correct authentication token (`AUTH_TOKEN`), which you need to inform into a `.env` file. Any wrong credentials, your client won't establish communication.

With this proof of concept, I'm indicating that your client (resided in On-Premise infrastructure) could establish communication into a Cloud Application and the server can make requests through the On-Premise Application.

## How to start the Client

1. Clone this repository
2. install all dependencies with `npm install`
3. Create a file called  `.env` and put the `AUTH_TOKEN` and `SERVER_URL` values, take the `.env-sample` as an example
4. Execute the server with `npm start` and send a request through the Server API passing the `client_id`
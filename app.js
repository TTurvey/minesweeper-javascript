//Import the dependencies.
const express = require('express');

//Instantiate an express app.
const app = express();

const path = require('path');

//The port number that the server will be listening to.
const port = process.env.PORT || 3000;

//The server listens for any attempts from a client to connect at the port.
app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

//static folder
app.use(express.static('public'));
app.use('/', require('./public/routes/home.js'));
app.use('/game', require('./public/routes/game.js'));

// Express API route to the root directory that responds by using the “response” object’s “sendFile” method to return the “index.html”.
// app.get('/', (request, response) => {
//   response.sendFile(path.join(__dirname + './home.html'));
// });

// Express’s router method to create a router.
// Node’s require and path built-in modules to export the data from game.js to the local variable.
// The response’s .json method is used to convert the data into a json and return it.
// The API call http://localhost:3000/game will return the states json.
// const myRouter = express.Router();
// myRouter.route('/game')
//   .get((request, response) => {
//     response.sendFile(path.join(__dirname + './game.html'));
//   });

// const game = require(path.join(__dirname + '/game.js'));
//   app.get('/game', (request, response) => {
//     response.json(game)
//   }
// );
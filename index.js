//Import the express dependency.
const express = require('express');

//Instantiate an express app.
const app = express();

//The port number that the server will be listening to.
const port = 5000;

//Get request to the root ("/")
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});

//The server listens for any attempts from a client to connect at the port.
app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});



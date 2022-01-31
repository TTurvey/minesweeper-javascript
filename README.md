# minesweeper-javascript
A web app of the popular Minesweeper game.

How to run the app
-----
```
$ Clone the Github repository.

git clone https://github.com/TTurvey/minesweeper-javascript.git

# Run the app

nodemon index.js
or 
node index.js
```

How to setup the app
-----
```
npm init
npm i -s express
npm install jsdom

```




Dependencies:
-----
* express - makes it easy to create a server with node without typing many lines of code. I've imported it first and then assigned it to a variable called app so that it can easily be used anywhere.
* body-Parser - is responsible for parsing the incoming request bodies in a middleware before you handle it.
* CORS(Cross-Origin Resource Sharing) - Since our front-end and back-end are on different servers, it needs something that allows them to share data since browsers do not allow this for security reasons. We have a variable called port with a value of 3000(You can give your port any number). This is where the backend server is.
* nodemon - helps detect changes made in the server script and updates the server. Think of it as the live server for backend development.

FILES:
----
* index.js - This is the server code.
* index.html - This is the client code.





Randomising the board of mines:
-----
After reading that the below method of randomising wasn't truly random, I implemented the Fisher-Yates Shuffle method for true randomness and speed.
```
const shuffledArray = gameArray.sort(() => Math.random() -0.5)
```

Sources:
https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
https://bost.ocks.org/mike/shuffle/
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle

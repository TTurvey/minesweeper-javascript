document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let length = 10;
    let width = 10;
    let squaresAmount = length * width;
    let squares = [];
    let mines = 10;
  
    // Creates the game board.
    function createBoard() {
    
      // Putting mines on the board.
      // Making an array the size of the amount of mines on the board.
      // Fills each array index with a string 'mine'.
      const mineArray = Array(mines).fill('mine');
      console.log(mineArray);

      // Making an array the size of the amount of empty squares on the board.
      // Fills each array index with a string 'not a mine'.
      const emptyArray = Array(squaresAmount - mines).fill('not a mine');
      console.log(emptyArray);

      // Joining the mine and empty arrays.
      const boardArray = mineArray.concat(emptyArray);
      console.log(boardArray);
      
      // Delaring a new variable for the starting array otherwise the game setup 
      // with number of mines wouldn't be taken into account in subsequent games.
      // let shuffledArray = boardArray;
      let shuffledArray = [].concat(boardArray)

      const shuffle = (shuffledArray) => {
        
        // Declaring a variable for the current position of each array element.
        let oldElement;

        // For each array element, counting down until there ar none left to shuffle.
        for (let i = shuffledArray.length - 1; i > 0; i--) {

          // Pick a remaining array element at random.
          let rand = Math.floor(Math.random() * (i + 1));

          // Swap the random array element with the current array element.
          oldElement = shuffledArray[i];
          shuffledArray[i] = shuffledArray[rand];
          shuffledArray[rand] = oldElement;
        }
      };
      shuffle(shuffledArray);
      console.log(shuffledArray);
      

      for (let i=0 ; i < length * width; i++) {
        const square = document.createElement('div');
        square.setAttribute('id', i);
        square.classList.add(shuffledArray[i]);
        grid.appendChild(square);
        squares.push(square);
      }
    }
    createBoard();
  
  });
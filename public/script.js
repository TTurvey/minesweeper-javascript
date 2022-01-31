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
      const boardArray = mineArray.concat(emptyArray)
      console.log(boardArray);

      for (let i=0 ; i < length * width; i++){
        const square = document.createElement('div');
        square.setAttribute('id', i);
        grid.appendChild(square);
        squares.push(square);
      }
    }
    createBoard();
  
  });
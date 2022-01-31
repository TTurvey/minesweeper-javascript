document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width = 10;
    let length = 10;
    let squares = [];
  
    // Creates the game board
    function createBoard() {
      for (let i=0 ; i < length * width; i++){
        const square = document.createElement('div');
        square.setAttribute('id', i);
        grid.appendChild(square);
        squares.push(square);
      }
    }
    createBoard();
  
  });
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
    const emptyArray = Array(squaresAmount - mines).fill('not-a-mine');
    console.log(emptyArray);

    // Joining the mine and empty arrays.
    const boardArray = mineArray.concat(emptyArray);
    console.log(boardArray);
      
    // Delaring a new variable for the pre-shuffled array otherwise the game setup 
    // with number of mines etc wouldn't be taken into account in subsequent games.
    let shuffledArray = [].concat(boardArray)

    const shuffle = (shuffledArray) => {
      // Declaring a variable for the current position of each array element.
      let oldElement;

      // For each array element, counting down until there are none left to shuffle.
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
    
    // For each array index, create divs with classes
    for (let i=0 ; i < length * width; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);
    }

    // Annotating each square with the number of adjacent mines.
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const farLeftColumn = (i % width === 0);
      const farRightColumn = (i % width === width -1);
      const topRow = (i < width);
      const bottomRow = (i > (squaresAmount - 1 - width));

      
      if (squares[i].classList.contains('not-a-mine')) { 
        // top-left diagonal of the current square (every square but the far left side and top row).
        if (!farLeftColumn && !topRow && squares[i - width - 1].classList.contains('mine')) total ++;

        // square above the current square (every square but the top row).
        if (!topRow && squares[i - width].classList.contains('mine')) total ++;
        
        // top-right diagonal of the current square (every square but the far right side and top row).
        if (!farRightColumn && !topRow && squares[i - width + 1].classList.contains('mine')) total ++;

        // left of the current square (every square but the far left side).
        if (!farLeftColumn && squares[i - 1].classList.contains('mine')) total ++;

        // right of the current square (every square but the far right side).
        if (!farRightColumn && squares[i + 1].classList.contains('mine')) total ++;
                  
        // bottom-left diagonal of the current square (every square but the far left side and bottom row).
        if (!farRightColumn && !bottomRow && squares[i + width - 1].classList.contains('mine')) total ++;

        // below the current square (every square but the bottom row).
        if (!bottomRow && squares[i + width].classList.contains('mine')) total ++;
          
        // bottom-right diagonal of the current square (every square but the far right side and bottom row).
        if (!farRightColumn && !bottomRow && squares[i + width + 1].classList.contains('mine')) total ++;
          
        squares[i].setAttribute('data', total);
      }
    }
  }

  createBoard();
  
});


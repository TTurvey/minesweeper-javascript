document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let length = 10;
  let width = 10;
  let squaresAmount = length * width;
  let squares = [];
  let mines = 10;
  let gameOver = false;
  
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
    
      //normal click
      square.addEventListener('click', function(e) {
        click(square);
      });

      // //cntrl and left click
      // square.oncontextmenu = function(e) {
      //   e.preventDefault();
      //   addFlag(square);
      // };
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
  
  // Game over alert
  // var gameOver = function() { alert('Game over!');};
  // for (let i = 0; i < squares.length; i++) {
  //   let currentID = squares[i].id;
  //   if (squares[i].classList.contains('checked') || squares[i].classList.contains('flag')) return;
  //   // Clicking on a mine gives the game over alert
  //   if (squares[i].classList.contains('mine')) {
  //     squares[i].addEventListener('click', gameOver, false);
  //   } else {
  //     // Clicking on a square that isn't a mine makes the square attribute
  //     let total = squares[i].getAttribute('data');
  //     squares[i].classList.add('checked');
  //     squares[i].innerHTML= total;
  //     return;
  //   }
  //   checkSquare(squares[i], currentID)
  //   squares[i].classListadd('checked')
  // }

  //click on square actions
  function click(square) {
    let currentId = square.id;
    if (gameOver) return;
    if (square.classList.contains('checked') || square.classList.contains('flag')) return;
    if (square.classList.contains('mine')) {
      alert('Game over');
    } else {
      let total = square.getAttribute('data');
      if (total !=0) {
        square.classList.add('checked');
        square.innerHTML = total;
        return;
      }
      checkSquare(square, currentId);
    }
    square.classList.add('checked');
  }
  
  //check neighboring squares once square is clicked
  function checkSquare(square, currentId) {
    const farLeftColumn = (currentId % width === 0);
    const farRightColumn = (currentId % width === width -1);
    const topRow = (currentId < width);
    const bottomRow = (currentId > (squaresAmount - 1 - width));

    // The recursion needs to happen after the click has occurred so setTimeout has been used at 10ms to delay this function.
    setTimeout(() => {
      // Check the square that is the top-left diagonal
      if (!farLeftColumn && !topRow) {
        const newId = squares[parseInt(currentId) - width - 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      // Check the square that is above
      if (!topRow) {
        const newId = squares[parseInt(currentId -width)].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      // Check the square that is the top-right diagonal
      if (!farRightColumn && !topRow) {
        const newId = squares[parseInt(currentId) +1 -width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      // Check the square to the left
      if (!farLeftColumn) {
        const newId = squares[parseInt(currentId) -1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      // Check the square to the right
      if (!farRightColumn) {
        const newId = squares[parseInt(currentId) +1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      // Check the square that is the bottom-left diagonal
      if (!farLeftColumn && !bottomRow) {
        const newId = squares[parseInt(currentId) -1 +width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      // Check the square that is below
      if (!bottomRow) {
        const newId = squares[parseInt(currentId) +width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      // Check the square that is the bottom-right diagonal
      if (!farRightColumn && !bottomRow) {
        const newId = squares[parseInt(currentId) +1 +width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      // Set delay to 10 milliseconds
    }, 5);
  }



});

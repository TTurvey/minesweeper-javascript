document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');

  // Default settings
  let height = 15;
  let width = 10;
  let difficulty = "Easy";
  let squaresAmount = height * width;
  let squares = [];
  let isGameOver = false;
  let flagsUsed = 0;

  // Gets the user selected settings from session storage.
  let inputGameSize = JSON.parse(sessionStorage.getItem('inputGameSize'));
  let inputDifficulty = JSON.parse(sessionStorage.getItem('inputDifficulty'));
  let inputStyleMode = JSON.parse(sessionStorage.getItem('inputStyleMode'));

  // Sets the game size to the size the user selected. Variables and CSS elements changed.
  function setGameSize() {
    if (inputGameSize == "Tiny") {
      // height = 10;
      // width = 10;
      // grid.style.height = "300px";
      // grid.style.width = "300px";
    } else if (inputGameSize == "Small") {
      height = 10;
      width = 10;
      grid.style.height = "300px";
      grid.style.width = "300px";
    } else if (inputGameSize == "Medium") {
      height = 15;
      width = 15;
      grid.style.height = "450px";
      grid.style.width = "450px";
    } else if (inputGameSize == "Large") {
      height = 20;
      width = 20;
      grid.style.height = "600px";
      grid.style.width = "600px";
    }
  }
  setGameSize();

  squaresAmount = height * width;
  let mines = squaresAmount * 0.1;

  // Sets the game difficulty to the user inputted difficulty.
  function setGameDifficulty() {
    if (inputDifficulty == "Easy") {
      mines = Math.round(squaresAmount * 0.1);
    } else if (inputDifficulty == "Medium") {
      difficulty = "Medium";
      mines = Math.round(squaresAmount * 0.12);
    } else if (inputDifficulty == "Hard") {
      difficulty = "Hard";
      mines = Math.round(squaresAmount * 0.15);
    } else if (inputDifficulty == "Extra Hard") {
      difficulty = "Extra Hard";
      mines = Math.round(squaresAmount * 0.18);
    }
  }
  setGameDifficulty();

  function startGameStats() {
    const minesStatEl = document.getElementById('number-of-mines');
    const minesStatString = document.createTextNode(`${mines}`);
    minesStatEl.appendChild(minesStatString);

    const flagsUsedStatEl = document.getElementById('number-of-flags-used');
    const flagsUsedStatString = document.createTextNode(`${flagsUsed}`);
    flagsUsedStatEl.appendChild(flagsUsedStatString);

    const flagsRemainingStatEl = document.getElementById('number-of-flags-remaining');
    const flagsRemainingStatString = document.createTextNode(`${mines}`);
    flagsRemainingStatEl.appendChild(flagsRemainingStatString);

  }
  startGameStats();

  function setGameStyleMode() {
    const layoutTopPane = document.querySelector('.layout-top-pane');
    const layoutMiddlePaneLeftBox = document.querySelector('.layout-middle-pane-left-box');
    const sideBarText = document.querySelectorAll('.sidebar-text');
    const sideBarRadioText = document.querySelector('.sidebar-radio-text');
    const layoutMiddlePaneRightBox = document.querySelector('.layout-middle-pane-right-box');
    const layoutBottomPane = document.querySelector('.layout-bottom-pane');
    
  
    if (inputStyleMode == "Light mode") {
      layoutTopPane.style.background = "white";
      layoutMiddlePaneLeftBox.style.backgroundImage = "url('../images/sand-light-mode.jpg');";
      layoutBottomPane.style.background = "white";
    } else if (inputStyleMode == "Dark mode") {
      layoutTopPane.style.background = "black";
      layoutMiddlePaneLeftBox.style.background = "black";
      sideBarText.forEach((item) => {
        item.style.color = "white";
      })
      
      
      sideBarRadioText.style.color = "white";
      layoutMiddlePaneRightBox .style.backgroundImage = "url('../images/sand-dark-mode.jpg')";
      layoutBottomPane.style.background = "black";
  }}
  setGameStyleMode();

  // Creates the game board.
  function createBoard() {
  
    // Putting mines on the board.
    // Making an array the size of the amount of mines on the board. Fills each array index with a string 'mine'.
    const mineArray = Array(mines).fill('mine');

    // Making an array the size of the amount of empty squares on the board. Fills each array index with a string 'not a mine'.
    const emptyArray = Array(squaresAmount - mines).fill('not-a-mine');

    // Joining the mine and empty arrays.
    const boardArray = mineArray.concat(emptyArray);
      
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
    for (let i = 0 ; i < squaresAmount; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);
    
      //normal click
      square.addEventListener('click', function(event) {
        click(square);
      });

      //cntrl and left click
      square.oncontextmenu = function(event) {
        event.preventDefault();
        addFlag(square);
      };
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
        if (!farLeftColumn && !bottomRow && squares[i + width - 1].classList.contains('mine')) total ++;

        // below the current square (every square but the bottom row).
        if (!bottomRow && squares[i + width].classList.contains('mine')) total ++;
          
        // bottom-right diagonal of the current square (every square but the far right side and bottom row).
        if (!farRightColumn && !bottomRow && squares[i + width + 1].classList.contains('mine')) total ++;
          
        squares[i].setAttribute('data', total);
      }
    }
  }

  createBoard();

  //Right click adds a flag to the square
  function addFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains('checked')) {
      if (!square.classList.contains('flag') && (flagsUsed < mines)) {
        square.classList.add('flag');
        square.innerHTML = '🚩';
        flagsUsed ++;
        checkWin();
        console.log(square.classList.contains('flag'))
      }
      else if (square.classList.contains('flag')) {
        square.classList.remove('flag');
        square.innerHTML = '';
        flagsUsed --;
      }
    }
    changeFlagStat();
  }

  // Updates the statistics for the present game state for the flags used and remaining.
  function changeFlagStat() {
    const flagsUsedStatEl = document.getElementById('number-of-flags-used');
    flagsUsedStatEl.innerText = `Flags used: ${flagsUsed}`;
  
    const flagsRemainingStatEl = document.getElementById('number-of-flags-remaining');
    flagsRemainingStatEl.innerText = `Flags remaining: ${mines - flagsUsed}`;
  }

  //click on square actions
  function click(square) {
    let currentId = square.id;
    if (isGameOver) return;
    if (square.classList.contains('checked') || square.classList.contains('flag')) return;
    if (square.classList.contains('mine')) {
      gameOver(square);
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
    }, 10);
  }

  //game over
  function gameOver(square) {
    isGameOver = true;
    alert('GAME OVER');

    //show ALL the mines
    squares.forEach(square => {
      if (square.classList.contains('mine')) {
        square.innerHTML = '💣';
      }
    });
  }

  // Win
  function checkWin() {
    let correctFlagAmount = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].classList.contains('flag') && squares[i].classList.contains('mine')) {
        correctFlagAmount ++;
      }
      if (correctFlagAmount === mines) {
        alert('YOU WIN');
        isGameOver = true;
        console.log('you wiiiiiin');
        return;
      }
    }
  }
});




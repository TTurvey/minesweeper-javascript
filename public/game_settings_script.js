document.addEventListener('DOMContentLoaded', () => {

  // Selects the game settings input form html element
  let settingsInputForm = document.getElementById("settings-input-form");

  // When the submit button is pressed the difficulty and game size inputs are saved in session storage to be used in the game-script.
  settingsInputForm.addEventListener('submit', (e) => {
    let inputDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
    let inputGameSize = document.querySelector('input[name="game-size"]:checked').value;
    sessionStorage.setItem('inputGameSize', JSON.stringify(inputGameSize));
    sessionStorage.setItem('inputDifficulty', JSON.stringify(inputDifficulty));
    console.log(inputGameSize);
    console.log(inputDifficulty);

    let inputStyleMode = document.querySelector('input[name="style-mode"]:checked').value;
    sessionStorage.setItem('inputStyleMode', JSON.stringify(inputStyleMode));
    console.log(inputStyleMode);
  });
  
});

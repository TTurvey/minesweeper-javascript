document.addEventListener('DOMContentLoaded', () => {

  // Selects the game settings input form html element
  let settingsInputForm = document.getElementById("settings-input-form");

  // When the submit button is pressed the difficulty and game size inputs are saved in session storage to be used in the game-script.
  settingsInputForm.addEventListener('submit', (e) => {
    let inputDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
    let inputWidth = document.querySelector('input[name="grid-width"]:checked').value;
    sessionStorage.setItem('inputWidth', JSON.stringify(paseInt(inputWidth)));
    sessionStorage.setItem('inputDifficulty', JSON.stringify(inputDifficulty));
  });
  
});

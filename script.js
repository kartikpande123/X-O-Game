// Pig Game JavaScript

// Get all the necessary elements from the DOM
const player0Panel = document.querySelector('.player-0-panel');
const player1Panel = document.querySelector('.player-1-panel');
const player0Score = document.getElementById('score-0');
const player1Score = document.getElementById('score-1');
const player0CurrentScore = document.getElementById('current-0');
const player1CurrentScore = document.getElementById('current-1');
const thresholdDisplay = document.querySelector('.thresh-score');
const inputValue = document.querySelector('.input-value');
const setButton = document.querySelector('.btn-set-value');
const newGameButton = document.querySelector('.btn-new');
const rollButton = document.querySelector('.btn-roll');
const holdButton = document.querySelector('.btn-hold');
const diceImages = document.querySelectorAll('.dice');

let scores, roundScore, activePlayer, gamePlaying, thresholdValue;

// Initialize the game
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  thresholdValue = 100;
  thresholdDisplay.textContent = thresholdValue;

  player0Score.textContent = '0';
  player1Score.textContent = '0';
  player0CurrentScore.textContent = '0';
  player1CurrentScore.textContent = '0';

  diceImages.forEach(dice => (dice.style.display = 'none'));

  player0Panel.classList.add('active');
  player1Panel.classList.remove('active');
}

function nextPlayer() {
  roundScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = '0';
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  player0Panel.classList.toggle('active');
  player1Panel.classList.toggle('active');
}

setButton.addEventListener('click', function () {
  const value = parseInt(inputValue.value);
  if (value && value > 0) {
    thresholdValue = value;
    thresholdDisplay.textContent = thresholdValue;
  }
});

rollButton.addEventListener('click', function () {
  if (gamePlaying) {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    diceImages[0].src = `die${dice1}.png`;
    diceImages[1].src = `die${dice2}.png`;
    diceImages[0].style.display = 'inline';
    diceImages[1].style.display = 'inline';

    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

// Event listener for holding the score
holdButton.addEventListener('click', function () {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= thresholdValue) {
      document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
      diceImages[0].style.display = 'none';
      diceImages[1].style.display = 'none';
      player0Panel.classList.remove('active');
      player1Panel.classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

// Event listener for starting a new game
newGameButton.addEventListener('click', init);

// Initialize the game when the page loads
init();

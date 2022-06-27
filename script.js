"use strict";

// Creatin variables
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const current0 = document.querySelector(".current0");
const current1 = document.querySelector(".current1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

let score, currentScore, activePlayer, playing, reach, nonActivePlayer;
// setting initial score to 0 and hidding the dice.
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");

  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  reach = 100;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const foundWinner = function () {
  playing = false;

  // removing dice, dice button and hold button
  diceEl.classList.add("hidden");
  btnRoll.classList.add("hidden");
  btnHold.classList.add("hidden");
  current0.classList.add("hidden");
  current1.classList.add("hidden");

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");

  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];

  nonActivePlayer = activePlayer === 0 ? 1 : 0;
  document.getElementById(`score--${nonActivePlayer}`).textContent =
    score[nonActivePlayer];

  document.getElementById(`name--${activePlayer}`).textContent = `Winner 🥳`;

  document.getElementById(`name--${activePlayer === 0 ? 1 : 0}`).textContent =
    "Better Luck Next Time 😇";
};

// adding responce to roll btn
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate the random number in [1 , 6]
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Selcting corresponding dice to display
    diceEl.classList.remove("hidden");
    diceEl.src = `Images/dices/dice-${dice}.png`;

    // 3. checking if dice rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      if (score[activePlayer] + currentScore >= reach) {
        score[activePlayer] += currentScore;
        foundWinner();
      }
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// adding response to hold button
btnHold.addEventListener("click", function () {
  if (playing) {
    // updating the current score
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // check for winner
    if (score[activePlayer] >= reach) {
      foundWinner();
    } else {
      // switch the player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  playing = true;

  // removing dice, dice button and hold button
  diceEl.classList.add("hidden");
  btnRoll.classList.remove("hidden");
  btnHold.classList.remove("hidden");
  current0.classList.remove("hidden");
  current1.classList.remove("hidden");

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");

  init();

  document.querySelector(`.player--0`).classList.add("player--active");

  // Naming back the players :

  document.getElementById(`name--0`).textContent = `Player 1`;
  document.getElementById(`name--1`).textContent = "Player 2";
});

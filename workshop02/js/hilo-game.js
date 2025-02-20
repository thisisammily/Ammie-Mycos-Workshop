document.addEventListener("DOMContentLoaded", function () {
  const diceIcon = "🎲";
  let balance = 1000;

  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");
  const tryAgainScreen = document.getElementById("try-again-screen");

  const nameInput = document.getElementById("player-name");
  const displayName = document.getElementById("display-name");
  const balanceDisplay = document.getElementById("balance");
  const betInput = document.getElementById("bet");
  const rollButton = document.getElementById("roll-btn");
  const resultMessage = document.getElementById("result-message");
  const errorMessage = document.getElementById("error-message");

  const dice1 = document.getElementById("dice1");
  const dice2 = document.getElementById("dice2");
  const dice3 = document.getElementById("dice3");
  const diceTotal = document.getElementById("diceTotal");

  document.getElementById("start-btn").addEventListener("click", () => {
    const playerName = nameInput.value.trim();

    if (playerName === "") {
      alert("Please enter your name to start the game!");
      return;
    }

    displayName.innerText = playerName;
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
  });

  rollButton.addEventListener("click", () => {
    errorMessage.innerText = "";
    const betAmount = parseFloat(betInput.value);
    const selectedChoice = document.querySelector(
      "input[name='choice']:checked"
    );

    if (
      !selectedChoice ||
      isNaN(betAmount) ||
      betAmount <= 0 ||
      betAmount > balance
    ) {
      errorMessage.innerText = "Invalid bet or no choice selected!";
      return;
    }

    // Roll 3 dice
    let diceValues = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];

    let total = diceValues.reduce((a, b) => a + b, 0);

    // Display dice
    dice1.innerText = `${diceIcon} ${diceValues[0]}`;
    dice2.innerText = `${diceIcon} ${diceValues[1]}`;
    dice3.innerText = `${diceIcon} ${diceValues[2]}`;
    diceTotal.innerText = `${total}`;

    let won = false;
    let reward = 0;

    if (selectedChoice.value === "high" && total >= 12) {
      won = true;
      reward = betAmount * 2;
    } else if (selectedChoice.value === "mid" && total === 11) {
      won = true;
      reward = betAmount * 5;
    } else if (selectedChoice.value === "low" && total <= 10) {
      won = true;
      reward = betAmount * 2;
    }

    if (won) {
      balance += reward;
      resultMessage.innerText = `You won! 🎉 (+฿${reward})`;
    } else {
      balance -= betAmount;
      resultMessage.innerText = "You lost! 😢";
    }

    balanceDisplay.innerText = balance.toFixed(2);

    if (balance <= 0) {
      gameScreen.classList.add("hidden");
      tryAgainScreen.classList.remove("hidden");
    }
  });

  document.getElementById("retry-btn").addEventListener("click", () => {
    location.reload();
  });

  document.getElementById("exit-btn").addEventListener("click", () => {
    location.reload();
  });
});

const words = [
  "Carbon",
  "Hydrogen",
  "Nitrogen",
  "Oxygen",
  "Phosphorus",
  "Sulfur",
  "Silicon",
  "Calcium",
  "Bromine",
  "Helium",
  "Lithium",
  "Berylium",
  "Boron",
  "Fluorine",
  "Neon",
  "Magnesium",
  "Potassium",
  "Sodium",
  "Zinc"
];
let selectedWord = "";
let attemptsLeft = 0;
let guessedLetters = [];
let selectedWords = [];
let totalScore = 0;

const wordContainer = document.getElementById("word-container");
const letterInput = document.getElementById("letter-input");
const submitButton = document.getElementById("submit-button");
const attemptsDisplay = document.getElementById("attempts");
const messageDisplay = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

// Initialize Game
function startGame() {
  selectedWords = [];
  totalScore = 0;
  loadNewWord();
  updateScore();
}

// Load a New Random Word
function loadNewWord() {
  // Filter out already used words
  const availableWords = words.filter(
    (word) => !selectedWords.includes(word.toLowerCase())
  );

  if (availableWords.length === 0) {
    endGame("🎉 All words guessed! Final Score: " + totalScore);
    return;
  }

  // Select a new random word
  selectedWord =
    availableWords[
      Math.floor(Math.random() * availableWords.length)
    ].toLowerCase();
  attemptsLeft = selectedWord.length;
  guessedLetters = Array(selectedWord.length).fill("");
  selectedWords.push(selectedWord);

  // Reset UI
  wordContainer.innerHTML = guessedLetters
    .map(() => `<input type="text" disabled />`)
    .join("");
  attemptsDisplay.textContent = `Attempts Left: ${attemptsLeft}`;
  messageDisplay.textContent = "";
  letterInput.value = "";
  letterInput.focus();
  restartButton.style.display = "none";
}

// Update UI
function updateUI() {
  const inputs = wordContainer.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.value = guessedLetters[index] || "";
  });
  attemptsDisplay.textContent = `Attempts Left: ${attemptsLeft}`;
}

// Update Score Display
function updateScore() {
  const scoreDisplay = document.getElementById("score-display");
  if (!scoreDisplay) {
    const scoreElement = document.createElement("p");
    scoreElement.id = "score-display";
    scoreElement.textContent = `Score: ${totalScore}`;
    document.querySelector(".game-container").appendChild(scoreElement);
  } else {
    scoreDisplay.textContent = `Score: ${totalScore}`;
  }
}

// Handle Guess
function handleGuess() {
  const guessedLetter = letterInput.value.toLowerCase();
  letterInput.value = "";

  if (!guessedLetter || guessedLetter.length !== 1) {
    messageDisplay.textContent = "Please enter a single letter.";
    return;
  }

  if (selectedWord.includes(guessedLetter)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === guessedLetter) {
        guessedLetters[i] = guessedLetter;
      }
    }
  } else {
    attemptsLeft--;
  }

  updateUI();
  checkGameStatus();
}

// Check Game Status
function checkGameStatus() {
  if (guessedLetters.join("") === selectedWord) {
    const wordScore = selectedWord.length + attemptsLeft; // Calculate score for the current word
    totalScore += wordScore; // Update total score
    messageDisplay.textContent = `🎉 Successful! You scored ${wordScore} points for "${selectedWord}".`;
    updateScore(); // Display the updated score
    setTimeout(() => loadNewWord(), 2000); // Automatically load a new word
  } else if (attemptsLeft <= 0) {
    messageDisplay.textContent = `❌ Not Successful! The word was "${selectedWord}". Try Again.`;
    endGame();
  }
}
// function checkGameStatus() {
//   if (guessedLetters.join("") === selectedWord) {
//     const wordScore = selectedWord.length + attemptsLeft;
//     totalScore += wordScore;
//     messageDisplay.textContent = `🎉 🎉 Successful! You scored ${wordScore} points for "${selectedWord}".`;
//     score += selectedWord.length + attemptsLeft; // Calculate and add the score
//     updateScore(); // Call a method to display the updated score
//     setTimeout(() => startGame(), 2000); // Automatically start a new game after 2 seconds
//   } else if (attemptsLeft <= 0) {
//     messageDisplay.textContent = `❌ Not Successful! The word was "${selectedWord}". Try Again.`;
//     endGame();
//   }
// }

// End Game
function endGame(finalMessage) {
  messageDisplay.textContent = finalMessage;
  restartButton.style.display = "block";
  letterInput.disabled = true;
  submitButton.disabled = true;
}

// Restart Game
restartButton.addEventListener("click", () => {
  letterInput.disabled = false;
  submitButton.disabled = false;
  startGame();
});

// Add Event Listeners
submitButton.addEventListener("click", handleGuess);
letterInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") handleGuess();
});

// Start the game on page load
startGame();

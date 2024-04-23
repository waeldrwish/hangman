// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";
// Get Array Form Letters
let lettersArray = Array.from(letters);
// Select Letters Container
let lettersContainer = document.querySelector(".letters");
// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");
  // Create letter text node
  let theLetter = document.createTextNode(letter);
  // append letter to span
  span.appendChild(theLetter);
  // add class on span
  span.className = "letter-box";
  // append span to the letters container
  lettersContainer.appendChild(span);
});
// object of words + categories
const word = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "inception",
    "parasite",
    "interstellar",
    "whiplash",
    "memento",
    "coco",
    "up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Khalid bin al Walid",
  ],
  countries: ["syria", "palestine", "yemen", "egypt", "bahrain", "qatar"],
};
// Get Random Property
let allKeys = Object.keys(word);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = word[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueName = randomPropValue[randomValueNumber];
// set Document info
document.querySelector(".game-info .category span").innerHTML = randomPropName;
// select letter guess element
let letterGuessContainer = document.querySelector(".letters-guess");
// Cover Chosen word to array
let lettersAndSpace = Array.from(randomValueName);
// Create span depend on word
lettersAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");
  // if letter is space
  if (letter === " ") {
    emptySpan.className = "with-space";
  }
  // append span to the lettersGuessContainer
  letterGuessContainer.appendChild(emptySpan);
});
// Select guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");
// Wrong Attempts
let wrongAttempts = 0;
let theWord = new Array(lettersAndSpace.length).fill("");
// Select the draw element
const hangman = document.querySelector(".hangman-draw");
// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // set the choose status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    // get clicked letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    // the Chosen Word
    let theChosenWord = Array.from(randomValueName.toLowerCase());
    theChosenWord.forEach((wordLetter, wordIndex) => {
      // if the clicked letter equal to one of the chosen word letters
      if (theClickedLetter == wordLetter) {
        // the status is true
        theStatus = true;
        // Loop on all guess spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
            theWord[wordIndex] = theClickedLetter;
          }
        });
      }
    });
    // outside loop
    // If letter is wrong
    if (theStatus !== true) {
      // Increase wrong Attempts
      wrongAttempts++;
      // Check if Wrong Attempts is 8
      if (wrongAttempts == 8) {
        lettersContainer.classList.add("disable");
        endGame("You lost, try again");
      }
      // add class wrong-draw
      hangman.classList.add(`wrong-${wrongAttempts}`);
    }
    if (theWord.join("") === theChosenWord.join("")) {
      endGame("Congratulations you won. Do you want to play again?");
    }
  }
});
function endGame(endTxt) {
  const alert = document.createElement("span");
  alert.className = "alert";
  const alertText = document.createTextNode(endTxt);
  alert.appendChild(alertText);
  const tryAgain = document.createElement("a");
  tryAgain.href = "/";
  tryAgain.className = "try-again";
  const tryTxt = document.createTextNode("Try Again");
  tryAgain.appendChild(tryTxt);
  alert.appendChild(tryAgain);
  const body = document.querySelector("body");
  body.appendChild(alert);
}

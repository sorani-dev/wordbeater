/* Global variables */
// Avalibale levals
const LEVELS = {
  easy: 5,
  medium: 3,
  hard: 1,
}
Object.freeze(LEVELS)

// To change level
let currentLevel = LEVELS.easy

let time = 5 // time to type
let score = 0 // player score
let isPlaying // is the game going on?

/* DOM Elements */
const wordInput = document.querySelector('#word-input')
const currentWord = document.querySelector('#current-word')
const scoreDisplay = document.querySelector('#score')
const timeDisplay = document.querySelector('#time')
const message = document.querySelector('#message')
const seconds = document.querySelector('#seconds')

const highScoreDisplay = document.querySelector('#highscore')
const difficutySelect = document.querySelector('#difficulty')

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition',
]

// Initialize game
const init = () => {
  // Show number of seconds
  seconds.innerHTML = currentLevel

  // load word from array
  showWord(words)

  // Start matching on input
  wordInput.addEventListener('input', startMatch)

  // Select level difficulty
//   difficutySelect.addEventListener('click', selectDifficulty)

  // Call countdown every second
  setInterval(countdown, 1000)

  // Check game status
  setInterval(checkGameStatus, 50)
}

function selectDifficulty() {
//   const value = difficutySelect.value
//   if (Object.keys(LEVELS).includes(value)) {
//     seconds.innerHTML = LEVELS[value]
//     currentLevel = LEVELS[value]
//     countdown()
//   }
}

/**
 * Pick and show random word
 * @param {String[]} words
 */
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length)

  //   Output random word
  currentWord.innerHTML = words[randIndex]
}

/**
 * Countdown timer
 */
function countdown() {
  console.log('countdown')
  // Make sure the time is not run out
  if (time > 0) {
    //Decrement
    time--
  } else if (time === 0) {
    // Game is over
    isPlaying = false
  }
  // Show time remaining
  timeDisplay.innerHTML = time
}

/**
 * Check game status
 */
function checkGameStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over'
    score = -1
  }
}

function setScore(score) {
    const oldScore = window.localStorage.getItem('wordBeater')
    let newScore;
    if (oldScore === null) {
        newScore = score
    } else {
        if (score > JSON.parse(oldScore)) {
            newScore = score
        } else {
            newScore = JSON.parse(oldScore)
        }
    }
    window.localStorage.setItem('wordBeater', newScore)
    highScoreDisplay.innerHTML = newScore
}

/**
 * Start matching input to words
 */
function startMatch() {
  if (matchWords()) {
    isPlaying = true
    time = 6
    showWord(words)
    wordInput.value = ''
    score++
    setScore(score)
  }
  // If score is -1 display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0
  } else {
    scoreDisplay.innerHTML = score
  }
}

/**
 * Match currentWord to WordInput
 * @returns {Boolean}
 */
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct'
    return true
  } else {
    message.innerHTML = ''
    return false
  }
}

window.addEventListener('load', init)

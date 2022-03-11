// array of words
let hardWords = [
  'Programming',
  'Javascript',
  'Destructuring',
  'Dependencies',
  'Javascript',
  'Linkedin',
  'Paradigm',
  'Playing',
  'Leetcode',
  'Internet',
]
let normalWords = [
  'Country',
  'Styling',
  'Testing',
  'Working',
  'Youtube',
  'Twitter',
  'Cascade',
  'Github',
  'Python',
  'Coding',
]
let easyWords = [
  'Hello',
  'Code',
  'Town',
  'Scala',
  'Funny',
  'Task',
  'Runner',
  'Roles',
  'Test',
  'Rust',
]
let words

// setting levels
const lvls = {
  Easy: { time: 6, arrWord: easyWords },
  Normal: { time: 5, arrWord: normalWords },
  Hard: { time: 3, arrWord: hardWords },
}

// selectors
let startBtn = document.querySelector('.start')
let levelNameSpan = document.querySelector('.lvl')
let levelSecondsSpan = document.querySelector('.seconds')
let theWordContainer = document.querySelector('.the-word')
let theUpComingWords = document.querySelector('.upcoming-words')
let theInput = document.querySelector('.input')
let theTimeLeftSpan = document.querySelector('.time span')
let score = document.querySelector('.score .got')
let total = document.querySelector('.control .total')
let finishMessage = document.querySelector('.finish')
let selectBox = document.querySelector('select')
let messageContainer = document.querySelector('.message')
let playAgainBtn = document.querySelector('.play-again')

// default Level
let LevelName
let LevelSeconds
selectBox.onchange = function (e) {
  LevelName = e.target.value
  LevelSeconds = lvls[LevelName].time
  this.style.display = 'none'
  startBtn.style.display = 'block'
  messageContainer.style.display = 'block'
  levelNameSpan.innerHTML = LevelName
  levelSecondsSpan.innerHTML = LevelSeconds
  theTimeLeftSpan.innerHTML = LevelSeconds
  words = lvls[LevelName].arrWord
  total.innerHTML = words.length
}

theInput.onpaste = function () {
  return false
}

startBtn.onclick = function () {
  this.remove()
  theInput.focus()
  // generate word function
  generateWord()
}

function generateWord() {
  let randomNum = Math.floor(Math.random() * words.length)

  let randomWord = words[randomNum]
  theWordContainer.innerHTML = randomWord

  words = words.filter((word, index) => {
    return randomNum !== index
  })
  theUpComingWords.innerHTML = ''
  words.forEach((Word) => {
    theUpComingWords.innerHTML += `<div>${Word}</div>`
  })

  if (words.length === 9) {
    setTimeout(() => {
      startPlay()
    }, 3000)
  } else {
    startPlay()
  }
}

function startPlay() {
  theTimeLeftSpan.innerHTML = LevelSeconds
  let time = setInterval(() => {
    theTimeLeftSpan.innerHTML--

    if (theTimeLeftSpan.innerHTML === '0') {
      clearInterval(time)
      if (
        theWordContainer.innerHTML.toLowerCase() ===
        theInput.value.toLowerCase()
      ) {
        // theInput.value = ''
        score.innerHTML++
        theInput.value = ''
        if (words.length > 0) {
          generateWord()
        } else {
          let spanGood = document.createElement('span')
          spanGood.className = 'good'
          let spanGoodText = document.createTextNode('Congratulaions')
          spanGood.appendChild(spanGoodText)
          finishMessage.appendChild(spanGood)
          playAgainBtn.style.display = 'block'
        }
      } else {
        let spanBad = document.createElement('span')
        spanBad.className = 'bad'
        let spanBadText = document.createTextNode('Game Over')
        spanBad.appendChild(spanBadText)
        finishMessage.appendChild(spanBad)
        playAgainBtn.style.display = 'block'
      }
    }
  }, 1000)
}

playAgainBtn.onclick = function () {
  location.reload()
}

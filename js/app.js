/*----- constants -----*/

let playerColor = {
   'null': '#121212',
   '1': 'rgb(255, 3, 255)',
   '-1': '#ff8000'
}

let winCombinations = [[0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24],[20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20],[1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],[37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17],[7, 15, 23, 31], [34, 26, 18, 10], [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10],[13, 19, 25, 31], [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],[2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 17, 25, 33], [8, 16, 24, 32], [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9], [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 2], [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]]

/*----- app's state (variables) -----*/

let turn = null
let boardArr = []
let winner = null
let winCombo = []
let computerPossibleMoves = []
let secretNum = null

/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll('.board div'))
const resetBtn = document.getElementById('resetButton')
const message = document.getElementById('message')
const compGameBtn = document.getElementById('compGameButton')

/*----- event listeners -----*/

document.querySelector('.board').addEventListener('click', onClick)
resetBtn.addEventListener('click', init)
compGameBtn.addEventListener('click', (e) => {
  if (e.target.innerHTML === 'Play the computer'){
    e.target.innerHTML = 'Play with a pal'
    init()
  } 
  else {
    e.target.innerHTML = 'Play the computer'
    init()
  }
})


/*----- functions -----*/

function init (){
  turn = 1
  winner = null
  winCombo = []
  for (let i = 0; i <= 41; i++){
    boardArr[i] = null
  }
  squares.forEach(function(square){
    if (!square.classList.contains('baseLevel')){
      square.classList.remove('taken', 'animate__animated', 'animate__backInDown', 'animate__pulse')
    }
  })
  let startSound = new Audio('/audio/startsound.wav')
  startSound.play()
  render()
}

function onClick(e){
  let currentSquare = e.target.id
  if (winner) return
  else if (boardArr[Number(currentSquare)] || !squares[Number(currentSquare) + 7].classList.contains('taken')){
    message.innerHTML = `Please choose a valid circle.`
    message.style.color = 'rgb(255, 3, 255)'
    return
  } 
  else {
    boardArr[Number(currentSquare)] = turn
    e.target.className = 'taken'
    e.target.className += ' animate__animated animate__backInDown'
    turn *= -1
    isWinner()
    moveSound()
    render()
  }
}

function isWinner(){
  winCombinations.forEach(function(possibility){
    if (boardArr[possibility[0]] && boardArr[possibility[0]] === boardArr[possibility[1]] && boardArr[possibility[0]] === boardArr[possibility[2]] && boardArr[possibility[0]] === boardArr[possibility[3]]){
      winner = boardArr[possibility[0]]
      possibility.forEach((e) => {winCombo.push(e)})
      if (winner === -1 && compGameBtn.innerHTML === 'Play with a pal'){
        message.innerHTML = 'The computer won this round!'
        playerTwoSound()
        winnerAnimation()
      }
      return winner
    } 
    else if (!boardArr.includes(null)){
      winner = 'T'
      return winner
    } 
 }) 
}

function render(){
  boardArr.forEach(function(square, idx){
    squares[idx].style.background = playerColor[square]
  })
  if (turn === 1){
    message.style.color = 'rgb(80, 254, 53)'
    message.innerHTML = `It's player one's turn!`
  } 
  else if (turn === -1 && compGameBtn.innerHTML === 'Play the computer'){
    message.style.color = 'rgb(80, 254, 53)'
    message.innerHTML = `It's player two's turn!`
  } 
  else if (turn === -1 && compGameBtn.innerHTML === 'Play with a pal' && winner === null){
    message.style.color = 'rgb(80, 254, 53)'
    message.innerHTML = `It's the computer's turn`
    computerMoveExecute()
  }
  if (winner === 'T'){
    message.innerHTML = `It's a tie!`
    let tieSound = new Audio ('/audio/tiesound.wav')
    tieSound.play()
  } 
  else if (winner === 1) {
    message.innerHTML = `Player one wins this round!`
    winnerAnimation()
    let playerOneWin = new Audio ('/audio/playeronewin.wav')
    playerOneWin.play()
  } 
  else if (winner === -1){
    message.innerHTML = `Player two wins this round!`
    winnerAnimation()
    playerTwoSound()
  } 
}

function playerTwoSound(){
  let playerTwoWin = new Audio ('/audio/playertwowin.wav')
  playerTwoWin.play()
}

function moveSound(){
  let moveSound = new Audio ('/audio/movesound.wav')
  moveSound.play()
}

function winnerAnimation(){
  for (let i = 0; i <= winCombo.length - 1; i++){
    squares[winCombo[i]].classList.remove('animate__animated', 'animate__backInDown')
  }
  for (let i = 0; i <= winCombo.length - 1; i++){
    squares[winCombo[i]].className += (' animate__animated animate__pulse')
  }
}  

function computerMoveLogic(){
  computerPossibleMoves = []
  for (let i = 0; i <= 41; i++){
    if (i < 6 && squares[i+7].classList.contains('taken')){
      computerPossibleMoves.push(Number(squares[i].id))
    }
    else if (i > 6 && !squares[i].classList.contains('taken') && !squares[i - 7].classList.contains('taken') && squares[i + 7].classList.contains('taken')){
      computerPossibleMoves.push(Number(squares[i].id))
    } 
  }
  chooseRandom()
  let computerChoice = computerPossibleMoves[secretNum]
  setTimeout(() => {
    boardArr[computerChoice] = -1
    squares[computerChoice].classList.add('taken', 'animate__animated', 'animate__backInDown')
    render()
    moveSound()
    isWinner()
  }, 1000)
} 

function chooseRandom(){
  secretNum = null
  secretNum = Math.floor(Math.random()*6) + 1
}

function computerMoveExecute(){
  if (turn === -1 && compGameBtn.innerHTML === 'Play with a pal'){
    message.innerHTML = `It's the computer's turn!`
    computerMoveLogic()
    turn *= -1
  } 
  isWinner()
  if (winner != null){
    render()
  }
}

init()





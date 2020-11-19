/*----- constants -----*/
let playerColor = {
   'null': '#121212',
   '1': 'rgb(255, 0, 230)',
   '-1': '#ff8000'
}

let winCombinations = [[0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24],[20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20],[1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],[37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17],[7, 15, 23, 31], [34, 26, 18, 10], [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10],[13, 19, 25, 31], [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],[2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9], [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 2], [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]]



/*----- app's state (variables) -----*/
let turn = null
let boardArr = []
let winner = null

/*----- cached element references -----*/
const squares = Array.from(document.querySelectorAll('.board div'))
const resetBtn = document.getElementById('resetButton')
const message = document.getElementById('message')

/*----- event listeners -----*/

document.querySelector('.board').addEventListener('click', onClick)
resetBtn.addEventListener('click', init)

/*----- functions -----*/

function init (){
  turn = 1
  winner = null
  for (let i = 0; i <= 41; i++){
    boardArr[i] = null
  }
  squares.forEach(function(square){
    // console.log(square)
    if (!square.classList.contains('baseLevel')){
      square.classList.remove('taken')
      square.classList.remove('animate__animated')
      square.classList.remove('animate__backInDown')
    }
  })
  // console.log(boardArr)
  render()
}

function onClick(e){
  let currentSquare = e.target.id
  // console.log(currentSquare)
  // console.log(squares[Number(currentSquare) + 7].classList.contains('taken'))
  if (boardArr[Number(currentSquare)] || !squares[Number(currentSquare) + 7].classList.contains('taken') || winner){
    message.innerHTML = (`Please choose a valid square.`)
    message.style.color = "rgb(255, 0, 230)"
    return
  } 
  else {
    boardArr[Number(currentSquare)] = turn
    console.log(boardArr)
    e.target.className = 'taken'
    e.target.className += " animate__animated animate__backInDown"
    console.log(e.target.className)
    turn *= -1
    isWinner()
    render()
  }
}

function isWinner(){
  winCombinations.forEach(function(possibility){
    if (boardArr[possibility[0]] && boardArr[possibility[0]] === boardArr[possibility[1]] && boardArr[possibility[0]] === boardArr[possibility[2]] && boardArr[possibility[0]] === boardArr[possibility[3]]){
      winner = boardArr[possibility[0]]
      console.log(`There is a winner! ${winner}`)
      return winner
     } else if (!boardArr.includes(null)){
       winner = "T"
       console.log(`This is a tie game. ${winner}`)
       return winner
     }
 })
}


//When the entirety of the render function is written out, consider adding and changing a class to message cached reference element
//so that you can change the color of the hover :)

function render(){
  boardArr.forEach(function(square, idx){
    squares[idx].style.background = playerColor[square]
  })
  if (turn === 1){

    message.innerHTML = (`It's player one's turn!`)
    squares.forEach(function(square) {
      square.className += (' playerTwoHover')
      square.classList.remove('playerOneHover')
      // console.log(square.classList)
    })
    }
    if (winner === "T"){
      message.innerHTML = "It's a tie!"
      // tieSounds()
    } else if (winner === 1) {
      message.innerHTML = `Player one wins this round!`
      // playerOneWin()
    } else if (winner === -1){
       message.innerHTML = `Player two wins this round!`
      //  playerTwoWin()
    } else {
       if (turn === 1){
         message.style.color = "rgb(80, 254, 53)"
         message.innerHTML = `It's player one's turn!`
       } 
       else {
          message.style.color = "rgb(80, 254, 53)"
          message.innerHTML = `It's player two's turn!`
       }
     }
  // } else if (turn === -1){
  //   message.innerHTML = (`It's player two's turn!`)
  //   squares.classList.remove('playerTwoHover')
  //   squares.className = ('playerOneHover')
  //   console.log(squares.classList)
  // }
}


init()





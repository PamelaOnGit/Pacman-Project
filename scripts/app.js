import { hello } from "./grid.js"


// ***** Build the Grid *****
// to change the size of the grid, change const width and height and width in .grid div class in main.css
// you will also need to adjust the parameters when calling buildWall (firstCell and lastCell)

const grid = document.querySelector('.grid')
const cells = []
const width = 20
const cellCount = width * width
let score = 0

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const div = document.createElement('div')
    // div.textContent = i 
    grid.appendChild(div)
    cells.push(div)
  }
}


function addWall(array) {
  array.forEach(index => {
    cells[index].classList.add('wall')
  })
}

function addPerimeter() {
  const numArray = []
  for (let i = 0; i < cellCount; i++) {
    if (i < width || i >= cellCount - width || i % width === 0 || i % width === width - 1) {
      numArray.push(i)
    }
  }
  addWall(numArray)
}

function buildWall(orientation, firstCell, lastCell) {
  if (orientation === 'horizontal') {
    for (let i = firstCell; i < lastCell + 1; i++) {
      cells[i].classList.add('wall')
    }
  }
  if (orientation === 'vertical') {
    for (let i = firstCell; i < lastCell + width; i += width) {
      cells[i].classList.add('wall')
    }
  }
}

createGrid()
addPerimeter()
buildWall('horizontal', 42, 57)
buildWall('horizontal', 342, 357)
buildWall('vertical', 82, 302)
buildWall('horizontal', 42, 57)
buildWall('vertical', 95, 175)
buildWall('vertical', 235, 295)
buildWall('vertical', 97, 317)
buildWall('vertical', 126, 266)
buildWall('vertical', 133, 273)

buildWall('horizontal', 84, 88)
buildWall('horizontal', 91, 94)
buildWall('vertical', 104, 164)
buildWall('vertical', 224, 304)
buildWall('horizontal', 305, 308)
buildWall('horizontal', 311, 315)
buildWall('horizontal', 128, 131)
buildWall('horizontal', 268, 271)
buildWall('horizontal', 169, 171)
buildWall('horizontal', 228, 231)
buildWall('vertical', 191, 211)
buildWall('vertical', 168, 188)

// build Ghost Pen 
// an empty span is also added to the cells in the ghostpen, in order to avoid errors if Pacman moves into the ghost pen

const ghostPen = []
function buildGhostPen() {
  let topLeft = (cellCount / 2) - (width / 2) - 1
  for (let i = 0; i < cellCount; i++) {
    if (i === topLeft || i === topLeft + 1 || i === topLeft + width || i === topLeft + width + 1 || i === topLeft + width - 1) {
      ghostPen.push(cells[i])
    }
    ghostPen.forEach(cell => {
      const dotSpan = document.createElement('span')
      cell.appendChild(dotSpan)
    })
  }
}
buildGhostPen()

function addCrumb(cell) {
  const dotSpan = document.createElement('span')
  dotSpan.classList.add('dot')
  cell.appendChild(dotSpan)
}

// ***** Dots / crumbs for scoring points *****

// This function adds crumbs or dots to all the empty cells at the start of the game
// it also starts a timer which selects a dot / crumb every 60s and makes it flash for 10s
// if pacmanIndex === flashing crumb, pacman eats the flashing crumb and isFlashing = true for the ghosts
// if pacman fails to eat the flashing crumb, the flashing crumb is removed
// and the normal crumb, if it was there, is reinstated

const flashingCellArray = []
let flashingCrumbLongTimer = typeof setInterval
let flashingCrumbShortTimer = typeof setInterval

function addSpansToEmptyCells() {

  cells.forEach(cell => {
    if (!cell.classList.contains('wall') && !ghostPen.includes(cell)) {
      addCrumb(cell)
      flashingCellArray.push(cell)
    }
  })
  flashingCrumbLongTimer = setInterval(() => {
    const randomNum = Math.floor(Math.random() * flashingCellArray.length)
    console.log(randomNum)
    let counter = 0
    let thereWasGreenDotHere = false
    flashingCrumbShortTimer = setInterval(() => {
      counter++
      if (flashingCellArray[randomNum].childNodes[0].classList.contains('dot')) {
        thereWasGreenDotHere = true
        flashingCellArray[randomNum].childNodes[0].classList.remove('dot')
      }
      flashingCellArray[randomNum].childNodes[0].classList.add('flashing-dot')
      if (flashingCellArray[randomNum] === cells[pacmanIndex]) {
        flashingCellArray[randomNum].classList.remove('flashing-dot')
        if (thereWasGreenDotHere) {
          flashingCellArray[randomNum].childNodes[0].classList.add('dot')
        }
        clearInterval(flashingCrumbShortTimer)
      }
      if (counter > 100) {
        flashingCellArray[randomNum].childNodes[0].classList.remove('flashing-dot')
        if (thereWasGreenDotHere) {
          flashingCellArray[randomNum].childNodes[0].classList.add('dot')
        }
        clearInterval(flashingCrumbShortTimer)
      }
    }, 100)

  }, 60000)
}

addSpansToEmptyCells()




// ***** Game Functionality - starting and ending the game, scoring points **** // 

function gameOver() {
  clearInterval(ghost1Timer)
  clearInterval(ghost2Timer)
  clearInterval(ghost3Timer)
  //clearInterval(ghost4Timer)
  alert(`Game Over! Your score: ${score}`)
}


// ***** Ghosts *****

let isFlashing = false

class Ghost {
  constructor(ghostIndex) {
    this.ghostIndex = ghostIndex;
    this.lastMove = 0
  }


  removeGhost() {
    isFlashing ? cells[this.ghostIndex].classList.remove('flashing-ghost') : cells[this.ghostIndex].classList.remove('ghost')
  }

  addGhost() {
    isFlashing ? cells[this.ghostIndex].classList.add('flashing-ghost') : cells[this.ghostIndex].classList.add('ghost')
  }

  

  moveGhostIndex() {
    const directionArray = [-1, 1, -width, width]
    let newIndex = this.ghostIndex
    let prefIndex = this.ghostInex + this.lastMove
    // if (!cells[prefIndex].classList.contains('wall')
    // && !cells[prefIndex].classList.contains('ghost')
    // && !cells[prefIndex].classList.contains('flashing-ghost')) {
    //   let newIndex = prefIndex
    // } else 
      do {
        const randomNum = Math.floor(Math.random() * 4)
        newIndex = this.ghostIndex + directionArray[randomNum]
      } while (cells[newIndex].classList.contains('wall')
      || cells[newIndex].classList.contains('ghost')
        || cells[newIndex].classList.contains('flashing-ghost'))
    
    this.lastMove = newIndex - this.ghostIndex

    this.ghostIndex = newIndex

  }
}



const ghost1 = new Ghost(189)

const ghost1Timer = setInterval(() => {
  ghost1.removeGhost()
  if (ghost1.ghostIndex === 209 || ghost1.ghostIndex === 208) {
    ghost1.ghostIndex -= 1
  } else {
    ghost1.moveGhostIndex()
  }
  ghost1.addGhost()
  console.log(ghost1.lastMove)
  if (ghost1.ghostIndex === pacmanIndex && isFlashing) {
    clearInterval(ghost1Timer)
    ghost1.removeGhost()
  }
  if (ghost1.ghostIndex === pacmanIndex && !isFlashing) {
    gameOver()
  }
}, 500)

const ghost2 = new Ghost(190)
const ghost2Timer = setInterval(() => {
  ghost2.removeGhost()
  if (ghost2.ghostIndex === 209 || ghost2.ghostIndex === 208) {
    ghost2.ghostIndex -= 1
  } else {
    ghost2.moveGhostIndex()
  }
  ghost2.addGhost()
  if (ghost2.ghostIndex === pacmanIndex && isFlashing) {
    clearInterval(ghost2Timer)
    ghost2.removeGhost()
  }
  if (ghost2.ghostIndex === pacmanIndex && !isFlashing) {
    gameOver()
  }
}, 500)

const ghost3 = new Ghost(210)
const ghost3Timer = setInterval(() => {
  ghost3.removeGhost()
  if (ghost3.ghostIndex === 209 || ghost3.ghostIndex === 208) {
    ghost3.ghostIndex -= 1
  } else {
    ghost3.moveGhostIndex()
  }
  ghost3.addGhost()

  if (ghost3.ghostIndex === pacmanIndex && isFlashing) {
    clearInterval(ghost3Timer)
    ghost3.removeGhost()
  }
  if (ghost3.ghostIndex === pacmanIndex && !isFlashing) {
    gameOver()
  }
}, 500)

// const ghost4 = new Ghost(210)
// const ghost4Timer = setInterval(() => {
//   ghost4.removeGhost()
//   ghost4.moveGhostIndex()
//   ghost4.addGhost()
//   if (ghost4.ghostIndex === pacmanIndex && isFlashing) {
//     clearInterval(ghost4Timer)
//     ghost4.removeGhost()
//   }
//   if (ghost4.ghostIndex === pacmanIndex && !isFlashing) {
//     gameOver()
//   }
// }, 500)


// ***** Pacman ***** //

let pacmanIndex = 21
cells[pacmanIndex].childNodes[0].classList.remove('dot')


function removePacman() {
  cells[pacmanIndex].classList.remove('pacman')
}

function addPacman() {
  cells[pacmanIndex].classList.add('pacman')
}

function isCanMove(newIndex) {
  return !cells[newIndex].classList.contains('wall')
}


addPacman()

document.addEventListener('keyup', event => {

  // move Pacman around the grid
  removePacman()
  if (event.key === "ArrowRight" && isCanMove(pacmanIndex + 1)) {
    pacmanIndex++
  }
  if (event.key === "ArrowLeft" && isCanMove(pacmanIndex - 1)) {
    pacmanIndex--
  }
  if (event.key === "ArrowUp" && isCanMove(pacmanIndex - width)) {
    pacmanIndex -= width
  }
  if (event.key === "ArrowDown" && isCanMove(pacmanIndex + width)) {
    pacmanIndex += width
  }

  // check if ghosts are flashing and, if so, has Pacman caught a ghost?

  if (isFlashing) {
    if (pacmanIndex === ghost1.ghostIndex) {
      clearInterval(ghost1Timer)
      ghost1.removeGhost()
    }
    if (pacmanIndex === ghost2.ghostIndex) {
      clearInterval(ghost2Timer)
      ghost2.removeGhost()
    }
    if (pacmanIndex === ghost3.ghostIndex) {
      clearInterval(ghost3Timer)
      ghost3.removeGhost()
    }
    // if (pacmanIndex === ghost4.ghostIndex) { 
    //   clearInterval(ghost4Timer)
    //   ghost4.removeGhost()
    // }
  }

  // and if not - is Pacman about to be eaten?!

  if (!isFlashing) {
    if (cells[pacmanIndex].classList.contains('ghost')) {
      gameOver()
    }
  }

  if (cells[pacmanIndex].childNodes[0].classList.contains('dot')) {
    cells[pacmanIndex].childNodes[0].classList.remove('dot')
    score++
  }
  if (cells[pacmanIndex].childNodes[0].classList.contains('flashing-dot')) {
    let thisCell = cells[pacmanIndex]
    thisCell.childNodes[0].classList.remove('flashing-dot')
    clearInterval(flashingCrumbShortTimer)
    isFlashing = true


    cells.forEach(cell => {
      if (cell.classList.contains('ghost')) {
        cell.classList.remove('ghost')
      }
    })

  }
  addPacman()

})





const grid = document.querySelector('.grid')
const cells = []
const width = 20
const cellCount = width * width


// ***** GRID *****

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const div = document.createElement('div')
    // div.textContent = i
    grid.appendChild(div)
    cells.push(div)
  }
}
createGrid()

function addWall(direction, start, end) {
  if (direction === 'horizontal') {
    for (let i = start; i < end; i++) {
      cells[i].classList.add('wall')
    }
  }
  if (direction === 'vertical') {
    for (let i = start; i < end; i += width) {
      cells[i].classList.add('wall')
    }
  }
}

addWall('horizontal', 0, width)
addWall('horizontal', cellCount - width, cellCount)
addWall('vertical', 0, cellCount - width)
addWall('vertical', width - 1, cellCount - 1)

addWall('horizontal', 168, 172)
addWall('horizontal', 230, 232)
addWall('vertical', 191, 212)
addWall('vertical', 188, 248)
addWall('horizontal', 266, 274)
addWall('vertical', 133, 253)
addWall('horizontal', 126, 133)
addWall('vertical', 166, 266)
addWall('vertical', 95, 315)
addWall('vertical', 84, 324)
addWall('horizontal', 85, 94)
addWall('horizontal', 306, 316)
addWall('vertical', 42, 362)
addWall('vertical', 57, 377)
addWall('horizontal', 44, 57)
addWall('horizontal', 342, 356)

const emptyCells = cells.filter(cell => {
  return !cell.classList.contains('wall')
})

// every empty cells (ie not a wall) contains a span
// the classes on these spans are added and removed to depict 
// pacman, pellet, pellet, power, ghost, scared

function addSpans() {
  for (let i = 0; i < emptyCells.length; i++) {
    const emptySpan = document.createElement('span')
    emptyCells[i].appendChild(emptySpan)
  }
}
addSpans()

// *************************************************** PELLETS ******

function addPellets() {
  for (let i = 0; i < emptyCells.length; i++) {
    emptyCells[i].childNodes[0].classList.add('pellet')
  }
  const ghostPen = [189, 190, 210, 209, 229]
  ghostPen.forEach(index => {
    cells[index].childNodes[0].classList.remove('pellet')
  })
}
addPellets()

// select a random cell
// selected cell - may or may not contain a pellet
// must not contain a ghost or pacman
function selectPowerCell() {
  const powerArray = emptyCells.filter(cell => {
    return !cell.childNodes[0].classList.contains('ghost') && !cell.childNodes[0].classList.contains('pacman')
  })
  return powerArray[Math.floor(Math.random() * powerArray.length)]
}

let selectedCell = 0
let isContainedPellet = false

function addPowerPellet() {
  if (selectedCell.childNodes[0].classList.contains('pellet')) {
    isContainedPellet = true
    selectedCell.childNodes[0].classList.add('power')
  } else if (!selectedCell.childNodes[0].classList.contains('pellet')) {
    selectedCell.childNodes[0].classList.add('pellet')
    selectedCell.childNodes[0].classList.add('power')
  }
}

function removePowerPellet() {
  selectedCell.childNodes[0].classList.remove('power')
  if (!isContainedPellet) {
    selectedCell.childNodes[0].classList.remove('pellet')
  }
}

setTimeout(() => {
  selectedCell = selectPowerCell()
  addPowerPellet()
  let tenSecondTimer = 0
  const powerPelletInterval = setInterval(() => {
    tenSecondTimer++
    if (tenSecondTimer > 10) {
      removePowerPellet()
      clearInterval(powerPelletInterval)
    }
  }, 1000)
}, 30000)

// **************************************************** GHOSTS ***** 

let isScared = false

class Ghost {

  constructor(ghostIndex, color) {
    this.ghostIndex = ghostIndex
    this.color = color
    this.path = [this.ghostIndex]
    this.ghost = document.createElement('span')
    this.isPellet = true
    this.isPower
  }

  addGhost() {
    // if there is a pellet on the new ghost index span
    // the pellet class must be removed
    // and isPellet set to true so that it can be reinstated 
    if (cells[this.ghostIndex].childNodes[0].classList.contains('pellet')) {
      cells[this.ghostIndex].childNodes[0].classList.remove('pellet')
      this.isPellet = true
    }
    if (cells[this.ghostIndex].childNodes[0].classList.contains('power')) {
      cells[this.ghostIndex].childNodes[0].classList.remove('power')
      this.isPower = true
    }
    // isScared? 
    if (isScared) {
      cells[this.ghostIndex].childNodes[0].classList.add('ghost')
      cells[this.ghostIndex].childNodes[0].classList.add('scared')
    } else {
      cells[this.ghostIndex].childNodes[0].classList.add('ghost')
      cells[this.ghostIndex].childNodes[0].classList.add(`${this.color}`)
    }
  }

  removeGhost() {
    // isScared ?  
    if (isScared) {
      cells[this.ghostIndex].childNodes[0].classList.remove('ghost')
      cells[this.ghostIndex].childNodes[0].classList.remove('scared')
    } else {
      cells[this.ghostIndex].childNodes[0].classList.remove('ghost')
      cells[this.ghostIndex].childNodes[0].classList.remove(`${this.color}`)
    }
    if (this.isPellet) {
      cells[this.ghostIndex].childNodes[0].classList.add('pellet')
    }
    if (this.isPower) {
      cells[this.ghostIndex].childNodes[0].classList.add('power')
    }
    this.isPellet = false
    this.isPower = false
  }

  moveGhostIndex() {
    const directionArray = [this.ghostIndex - 1, this.ghostIndex + 1, this.ghostIndex - width, this.ghostIndex + width]
    const possArray = directionArray.filter(ind => {
      return !cells[ind].classList.contains('wall') && ind !== this.path[this.path.length - 2] && !cells[ind].innerHTML.includes('ghost')
    })

    if (possArray.length === 0) {
      this.ghostIndex = this.path[this.path.length - 2]
    } else if (possArray.length === 1) {
      this.ghostIndex = possArray[0]
    } else if (possArray.length > 1) {
      this.ghostIndex = possArray[Math.floor(Math.random() * possArray.length)]
    }
    this.path.push(this.ghostIndex)
  }

  eatPacman() {
    if (this.ghostIndex === pacmanIndex && !isScared) {
      gameOver()
    }
  }

}

// **************************************************************** GHOST INTERVALS ***** 

const pinkGhost = new Ghost(210, 'pink')
pinkGhost.addGhost()
let goPinkGhost = typeof setInterval

const blueGhost = new Ghost(209, 'blue')
blueGhost.addGhost()
let goBlueGhost = typeof setInterval

const orangeGhost = new Ghost(189, 'orange')
orangeGhost.addGhost()
let goOrangeGhost = typeof setInterval

const greenGhost = new Ghost(190, 'green')
greenGhost.addGhost()
let goGreenGhost = typeof setInterval


function pinkGhostInterval() {
  goPinkGhost = setInterval(() => {
    pinkGhost.removeGhost()
    pinkGhost.moveGhostIndex()
    pinkGhost.addGhost()
    pinkGhost.eatPacman()
    if (pinkGhost.ghostIndex === pacmanIndex && isScared === true) {
      clearInterval(goPinkGhost)
      pinkGhost.removeGhost()
    }
  }, 300)
}

function greenGhostInterval() {
  goGreenGhost = setInterval(() => {
    greenGhost.removeGhost()
    greenGhost.moveGhostIndex()
    greenGhost.addGhost()
    greenGhost.eatPacman()
    if (greenGhost.ghostIndex === pacmanIndex && isScared === true) {
      clearInterval(goGreenGhost)
      greenGhost.removeGhost()
    }
  }, 300)
}

function orangeGhostInterval() {
  goOrangeGhost = setInterval(() => {
    orangeGhost.removeGhost()
    orangeGhost.moveGhostIndex()
    orangeGhost.addGhost()
    orangeGhost.eatPacman()
    if (orangeGhost.ghostIndex === pacmanIndex && isScared === true) {
      clearInterval(goOrangeGhost)
      orangeGhost.removeGhost()
    }
  }, 300)
}

function blueGhostInterval() {
  goBlueGhost = setInterval(() => {
    blueGhost.removeGhost()
    blueGhost.moveGhostIndex()
    blueGhost.addGhost()
    blueGhost.eatPacman()
    if (blueGhost.ghostIndex === pacmanIndex && isScared === true) {
      clearInterval(goBlueGhost)
      blueGhost.removeGhost()
    }
  }, 300)
}

// ***************************************************************** PACMAN *****

let pacmanIndex = 21
let score = 0

function addPacman() {
  // if pacmanIndex cell contains a pellet, 
  // pacman must eat the pellet
  // and increment the score
  // if pacmanIndex cell contains a power-pellet, 
  // pacman should eat the power pellet and 
  // isScared should be set to 'true'
  if (cells[pacmanIndex].childNodes[0].classList.contains('power')) {
    cells[pacmanIndex].childNodes[0].classList.remove('power')
    cells[pacmanIndex].childNodes[0].classList.remove('pellet')
    isScared = true
    cells[pinkGhost.ghostIndex].childNodes[0].classList.remove('pink')
    cells[greenGhost.ghostIndex].childNodes[0].classList.remove('green')
    cells[blueGhost.ghostIndex].childNodes[0].classList.remove('blue')
    cells[orangeGhost.ghostIndex].childNodes[0].classList.remove('orange')
  }
  if (cells[pacmanIndex].childNodes[0].classList.contains('pellet')) {
    cells[pacmanIndex].childNodes[0].classList.remove('pellet')
    cells[pacmanIndex].childNodes[0].classList.add('pacman')
    score++
  } else {
    cells[pacmanIndex].childNodes[0].classList.add('pacman')
  }
}

function removePacman() {
  cells[pacmanIndex].childNodes[0].classList.remove('pacman')
}

function movePacman(event) {
  removePacman()
  if (event.key === 'ArrowRight' && !cells[pacmanIndex + 1].classList.contains('wall')) {
    pacmanIndex++
  }
  if (event.key === 'ArrowLeft' && !cells[pacmanIndex - 1].classList.contains('wall')) {
    pacmanIndex--
  }
  if (event.key === 'ArrowDown' && !cells[pacmanIndex + width].classList.contains('wall')) {
    pacmanIndex += width
  }
  if (event.key === 'ArrowUp' && !cells[pacmanIndex - width].classList.contains('wall')) {
    pacmanIndex -= width
  }
  addPacman()



  if (cells[pacmanIndex].childNodes[0].classList.contains('ghost') && !isScared) {
    console.log('Pacman got eaten!!!')
    gameOver()
  }

  if (pacmanIndex === pinkGhost.ghostIndex && isScared === true) {
    console.log('Eat the ghost, Pacman!')
    clearInterval(goPinkGhost)
    pinkGhost.removeGhost()

  }
  if (pacmanIndex === blueGhost.ghostIndex && isScared === true) {
    console.log('Eat the ghost, Pacman!')
    clearInterval(goBlueGhost)
    blueGhost.removeGhost()

  }
  if (pacmanIndex === greenGhost.ghostIndex && isScared === true) {
    console.log('Eat the ghost, Pacman!')
    clearInterval(goGreenGhost)
    greenGhost.removeGhost()
  }
  if (pacmanIndex === orangeGhost.ghostIndex && isScared === true) {
    clearInterval(goOrangeGhost)
    orangeGhost.removeGhost()
  }


}

document.addEventListener('keyup', movePacman)

addPacman()


// ****************************************************************** GAME FUNCTIONS ***** 

// START THE GHOSTS 

console.log(startGhosts)

function startGhosts(event) {
  if (event.key === " ") {
    blueGhostInterval()
    orangeGhostInterval()
    greenGhostInterval()
    pinkGhostInterval()
    document.removeEventListener('keyup', startGhosts)
  }
}
 

console.log(startGhosts)

document.addEventListener('keyup', startGhosts)


// END THE GAME AND SHOW THE SCORE
function gameOver() {
  document.removeEventListener('keyup', movePacman)
  cells[pacmanIndex].childNodes[0].classList.remove('pacman')
  clearInterval(goBlueGhost)

  clearInterval(goOrangeGhost)

  clearInterval(goGreenGhost)

  clearInterval(goPinkGhost)

  console.log(score)
}




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
// pacman, pellet, pellet, power-pellet, ghost, scared-ghost

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


// **************************************************** GHOSTS ***** 

class Ghost {

  constructor(ghostIndex, color) {
    this.ghostIndex = ghostIndex
    this.color = color
    this.path = [this.ghostIndex]
    this.ghost = document.createElement('span')
    this.isPellet = false
  } 

  addGhost() {
    if (cells[this.ghostIndex].childNodes[0].classList.contains('pellet')) {
      this.isPellet = true
      cells[this.ghostIndex].childNodes[0].classList.remove('pellet')
    }
    cells[this.ghostIndex].childNodes[0].classList.add(`ghost`)
    cells[this.ghostIndex].childNodes[0].classList.add(`${this.color}`)
    // cells[this.ghostIndex].appendChild(this.ghost)
    // this.ghost.setAttribute("class", `ghost ${this.color}`)
  }

  removeGhost() {
    cells[this.ghostIndex].childNodes[0].classList.remove('ghost')
    cells[this.ghostIndex].childNodes[0].classList.remove(`${this.color}`)
    if (this.isPellet) { 
      cells[this.ghostIndex].childNodes[0].classList.add('pellet')
    }
    // cells[this.ghostIndex].removeChild(this.ghost)
  }

  moveGhostIndex() {
    const directionArray = [this.ghostIndex - 1, this.ghostIndex + 1, this.ghostIndex - width, this.ghostIndex + width]
    const possArray = directionArray.filter(ind => {
      return !cells[ind].classList.contains('wall') && ind !== this.path[this.path.length - 2] && !cells[ind].innerHTML.includes('ghost')
    })
    const bestMove = possArray[Math.floor(Math.random() * possArray.length)]
    if (possArray.length === 0) {
      this.ghostIndex = this.path[this.path.length - 2]
    } else {
      this.ghostIndex = bestMove
    }
    this.path.push(this.ghostIndex)
  }

  eatPacman() {
    if (this.ghostIndex === pacmanIndex) {
      console.log(`The ${this.color} ghost ate Pacman!!!`)
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
  }, 500)
}

function greenGhostInterval() {
  goGreenGhost = setInterval(() => {
    greenGhost.removeGhost()
    greenGhost.moveGhostIndex()
    greenGhost.addGhost()
    greenGhost.eatPacman()
  }, 500)
}

function orangeGhostInterval() {
  goOrangeGhost = setInterval(() => {
    orangeGhost.removeGhost()
    orangeGhost.moveGhostIndex()
    orangeGhost.addGhost()
    orangeGhost.eatPacman()
  }, 500)
}

function blueGhostInterval() {
  goBlueGhost = setInterval(() => {
    blueGhost.removeGhost()
    blueGhost.moveGhostIndex()
    blueGhost.addGhost()
    blueGhost.eatPacman()
  }, 500)
}

// ***************************************************************** PACMAN *****

let pacmanIndex = 21
let score = 0
// const pacman = document.createElement('span')
// const span = document.querySelector('span')



function addPacman() {
  if (cells[pacmanIndex].innerHTML.includes('pellet')) {
    console.log(cells[pacmanIndex].childNodes[0].classList)
    cells[pacmanIndex].childNodes[0].classList.remove('pellet')
    cells[pacmanIndex].childNodes[0].classList.add('pacman')
    score ++
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



  if (cells[pacmanIndex].innerHTML.includes('ghost')) {
    console.log('Pacman got eaten!!!')
    gameOver()
  }

}

document.addEventListener('keyup', movePacman)

addPacman()



// ****************************************************************** GAME FUNCTIONS ***** 

// START THE GHOSTS 
function startGhosts(event) {
  if (event.key === " ") {
    blueGhostInterval()
    orangeGhostInterval()
    greenGhostInterval()
    pinkGhostInterval()
  }
}
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






import { hello } from "./grid.js"


// ***** Build the Grid *****
// to change the size of the grid, change const width and height and width in .grid div class in main.css
// you will also need to adjust the parameters when calling buildWall (firstCell and lastCell)

const grid = document.querySelector('.grid') 
const cells = []
const width = 20
const cellCount = width * width

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const div = document.createElement('div') 
    div.textContent = i 
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
    if (i < width || i >= cellCount - width || i % width ===0 || i % width === width - 1) {
      numArray.push(i)
    }
  }
  addWall(numArray)
}

function buildWall(orientation, firstCell, lastCell) { 
  if (orientation === 'horizontal') { 
    for (let i = firstCell ; i < lastCell + 1; i ++) { 
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

// ***** End Game **** // 

function gameOver() { 
  clearInterval(ghost1Timer)
  clearInterval(ghost2Timer)
  alert('Game Over!')
}


// ***** Ghosts *****

let isFlashing = false

class Ghost {
  constructor(ghostIndex) {
    this.ghostIndex = ghostIndex;
  }

  removeGhost() {
    isFlashing? cells[this.ghostIndex].classList.remove('flashing-ghost') : cells[this.ghostIndex].classList.remove('ghost')
  }

  addGhost() {
    isFlashing? cells[this.ghostIndex].classList.add('flashing-ghost') : cells[this.ghostIndex].classList.add('ghost')
  }

  moveGhostIndex() {
    const directionArray = [-1, 1, -width, width]
    let newIndex = this.ghostIndex
    do {
      const randomNum = Math.floor(Math.random() * 4)
      newIndex = this.ghostIndex + directionArray[randomNum]
    } while (cells[newIndex].classList.contains('wall') || cells[newIndex].classList.contains('ghost') || cells[newIndex].classList.contains('flashing-ghost'))
    this.removeGhost()
    this.ghostIndex = newIndex
    this.addGhost()
  }
} 

const ghost1 = new Ghost(189)
const ghost1Timer = setInterval(() => { 
  ghost1.removeGhost() 
  ghost1.moveGhostIndex() 
  ghost1.addGhost() 
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
  ghost2.moveGhostIndex() 
  ghost2.addGhost() 
  if (ghost2.ghostIndex === pacmanIndex && isFlashing) { 
    clearInterval(ghost2Timer)
    ghost2.removeGhost() 
  }
  if (ghost2.ghostIndex === pacmanIndex && !isFlashing) { 
    gameOver()
  }
}, 500)


// ***** Pacman ***** //

let pacmanIndex = 21


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
    pacmanIndex ++ 
  }
  if (event.key === "ArrowLeft" && isCanMove(pacmanIndex - 1)) { 
    pacmanIndex -- 
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
  }

  // and if not - is Pacman about to be eaten?!

if (!isFlashing) { 
  if (cells[pacmanIndex].classList.contains('ghost')) { 
    gameOver() 
  }
}

  addPacman() 
})


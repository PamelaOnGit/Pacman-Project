const grid = document.querySelector('.grid')
const cells = []
const width = 40
const cellCount = width * width

const text = document.querySelector('#text')
const displayScore = document.querySelector('#score')

// ***** MATHEMATICAL FUNCTIONS *********
// get the index of the smallest number in an array

function getIndexOfSmallest(array) {
  let indexOfSmallest = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] < array[indexOfSmallest]) {
      indexOfSmallest = i
    }
  }
  return indexOfSmallest
}

function getIndexOfBiggest(array) {
  let indexOfBiggest = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] > array[indexOfBiggest]) {
      indexOfBiggest = i
    }
  }
  return indexOfBiggest
}

function getDistance(possIndex, targetIndex) { 
  const possY = Math.floor(possIndex / width)
  const targetY = Math.floor(targetIndex / width)
  const possX = possIndex % width
  const targetX = targetIndex % width
  const aSquared = (targetY - possY) * (targetY - possY)
  const bSquared = (targetX - possX) * (targetX - possX)
  const distance = Math.sqrt(aSquared + bSquared)
  return distance
}

// function getDistance(a, b) {
//   return Math.abs(a - b)
// }


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

addWall('horizontal', 164, 178)
addWall('horizontal', 204, 218)
addWall('horizontal', 182, 196)
addWall('horizontal', 222, 236)

addWall('vertical', 164, 664)
addWall('vertical', 964, 1476)

addWall('horizontal', 1444, 1458)
addWall('horizontal', 1462, 1476)
addWall('horizontal', 1422, 1436)
addWall('horizontal', 1404, 1418)

addWall('vertical', 275, 715)
addWall('vertical', 995, 1435)

addWall('horizontal', 737, 739)
addWall('horizontal', 741, 744)
addWall('horizontal', 897, 903)

addWall('vertical', 736, 898)
addWall('vertical', 743, 904)

addWall('horizontal', 368, 378)
addWall('horizontal', 382, 392)

addWall('vertical', 408, 568)
addWall('vertical', 431, 591)

addWall('vertical', 1088, 1248)

addWall('vertical', 417, 577)
addWall('vertical', 422, 582)

addWall('horizontal', 1248, 1258)
addWall('horizontal', 1262, 1272)
addWall('vertical', 1111, 1291)

addWall('vertical', 1097, 1257)
addWall('vertical', 1102, 1262)

addWall('horizontal', 727, 733)
addWall('horizontal', 887, 893)

addWall('horizontal', 907, 913)
addWall('horizontal', 747, 753)
addWall('horizontal', 1052, 1054)
addWall('horizontal', 1092, 1094)
addWall('horizontal', 809, 814)
addWall('horizontal', 826, 831)
addWall('vertical', 705, 945)

addWall('vertical', 412, 602)
addWall('vertical', 413, 603)
addWall('horizontal', 1066, 1068)
addWall('horizontal', 1106, 1108)
addWall('vertical', 1004, 1476)
addWall('vertical', 426, 606)
addWall('vertical', 547, 627)

addWall('horizontal', 646, 659)
addWall('horizontal', 661, 674)
addWall('horizontal', 967, 993)
addWall('vertical', 767, 887)
addWall('vertical', 792, 902)

addWall('horizontal', 777, 779)
addWall('horizontal', 781, 783)
addWall('horizontal', 777, 779)


addWall('vertical', 313, 673)
addWall('vertical', 993, 1393)
addWall('vertical', 966, 1366)
addWall('vertical', 286, 646)

addWall('vertical', 522, 1083)
addWall('vertical', 647, 673)
addWall('vertical', 557, 1157)
addWall('horizontal', 857, 863)
addWall('horizontal', 1146, 1148)
addWall('horizontal', 1186, 1188)

addWall('horizontal', 1334, 1346)
addWall('horizontal', 294, 306)
addWall('horizontal', 82, 87)
addWall('vertical', 82, 402)
addWall('horizontal', 112, 117)
addWall('vertical', 117, 437)
addWall('vertical', 1277, 1517)
addWall('vertical', 1242, 1482)

addWall('vertical', 724, 924)
addWall('vertical', 725, 925)
addWall('vertical', 754, 954)
addWall('vertical', 755, 955)

addWall('horizontal', 48, 71)
addWall('horizontal', 88, 111)
addWall('horizontal', 179, 181)
addWall('horizontal', 219, 221)

addWall('horizontal', 1161, 1163)
addWall('horizontal', 1521, 1523)
addWall('horizontal', 477, 479)
addWall('horizontal', 441, 443)
addWall('horizontal', 1484, 1494)
addWall('horizontal', 1535, 1545)
addWall('horizontal', 1506, 1516)
addWall('horizontal', 1557, 1559)
addWall('horizontal', 1419, 1421)
addWall('horizontal', 1459, 1461)
addWall('horizontal', 1197, 1199)

addWall('vertical', 339, 619)
addWall('vertical', 340, 620)
addWall('horizontal', 163, 164)
addWall('horizontal', 196, 197)
addWall('horizontal', 1328, 1333)
addWall('horizontal', 1347, 1352)

addWall('horizontal', 288, 293)
addWall('horizontal', 307, 312)
addWall('vertical', 1059, 1309)
addWall('vertical', 1060, 1310)
addWall('vertical', 469, 590)
addWall('vertical', 464, 664)
//  
addWall('vertical', 455, 655)
addWall('vertical', 694, 934)
addWall('vertical', 1015, 1215)
addWall('vertical', 1024, 1224)
addWall('horizontal', 1226, 1228)
addWall('horizontal', 1132, 1134)
addWall('horizontal', 1172, 1174)
addWall('horizontal', 1212, 1214)
addWall('vertical', 427, 547)
addWall('horizontal', 631, 633)
addWall('vertical', 1069, 1229)
addWall('vertical', 1050, 1210)
addWall('horizontal', 1007, 1009)
addWall('horizontal', 1031, 1033)
addWall('vertical', 450, 610)
addWall('horizontal', 607, 609)
addWall('horizontal', 622, 624)
addWall('horizontal', 616, 618)
addWall('horizontal', 1016, 1018)
addWall('horizontal', 1022, 1024)

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

function powerPelletTimeout() {
  setTimeout(() => {
    selectedCell = selectPowerCell()
    addPowerPellet()
    let tenSecondTimer = 0
    const powerPelletInterval = setInterval(() => {
      tenSecondTimer++
      if (tenSecondTimer > 15) {
        removePowerPellet()
        clearInterval(powerPelletInterval)
      }
    }, 1000)
  }, 30000)
}

// **************************************************** GHOSTS ***** 

let isScared = false

class Ghost {

  constructor(ghostIndex, color) {
    this.ghostIndex = ghostIndex
    this.color = color
    this.path = [this.ghostIndex]
    this.ghost = document.createElement('span')
    this.isPellet = true
    this.isPower = false
    this.timer = 0
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
    if (possArray.includes(pacmanIndex)) {
      this.ghostIndex = pacmanIndex
    }
    if (possArray.length === 0) {
      this.ghostIndex = this.path[this.path.length - 2]
    } else if (possArray.length === 1) {
      this.ghostIndex = possArray[0]
    } else if (possArray.length > 1) {
      this.ghostIndex = possArray[Math.floor(Math.random() * possArray.length)]
    }
    this.path.push(this.ghostIndex)
  }

  runAway() {
    const directionArray = [this.ghostIndex - 1, this.ghostIndex + 1, this.ghostIndex - width, this.ghostIndex + width]
    const possArray = directionArray.filter(ind => {
      return !cells[ind].classList.contains('wall') && ind !== this.path[this.path.length - 2] && !cells[ind].innerHTML.includes('ghost')
    })
    if (possArray.includes(pacmanIndex)) {
      this.ghostIndex = pacmanIndex
    }
    if (possArray.length === 0) {
      this.ghostIndex = this.path[this.path.length - 2]
    } else if (possArray.length === 1) {
      this.ghostIndex = possArray[0]
    } else if (possArray.length > 1) {
      const distanceArray = possArray.map(item => {
        return getDistance(item, pacmanIndex)
      })
      const indexOfBiggest = getIndexOfBiggest(distanceArray)
      this.ghostIndex = possArray[indexOfBiggest]
    }
    this.path.push(this.ghostIndex)
  }

  hunt(targetIndex) {
    const directionArray = [this.ghostIndex - 1, this.ghostIndex + 1, this.ghostIndex - width, this.ghostIndex + width]
    const possArray = directionArray.filter(ind => {
      return !cells[ind].classList.contains('wall') && ind !== this.path[this.path.length - 2] && !cells[ind].innerHTML.includes('ghost')
    })
    if (possArray.includes(pacmanIndex)) {
      this.ghostIndex = pacmanIndex
    }
    if (possArray.length === 0) {
      this.ghostIndex = this.path[this.path.length - 2]
    } else if (possArray.length === 1) {
      this.ghostIndex = possArray[0]
    } else if (possArray.length > 1) {
      const distanceArray = possArray.map(item => {
        return getDistance(item, targetIndex)
      })
      const indexOfSmallest = getIndexOfSmallest(distanceArray)
      this.ghostIndex = possArray[indexOfSmallest]
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



const pinkGhost = new Ghost(818, 'pink')
pinkGhost.addGhost()
let goPinkGhost = typeof setInterval

const blueGhost = new Ghost(819, 'blue')
blueGhost.addGhost()
let goBlueGhost = typeof setInterval

const orangeGhost = new Ghost(820, 'orange')
orangeGhost.addGhost()
let goOrangeGhost = typeof setInterval

const greenGhost = new Ghost(821, 'green')
greenGhost.addGhost()
let goGreenGhost = typeof setInterval


function pinkGhostInterval() {
  goPinkGhost = setInterval(() => {
    pinkGhost.timer++
    pinkGhost.removeGhost()
    if (!isScared) {
      if (pinkGhost.timer < 120) {
        pinkGhost.hunt(pacmanIndex)
      } else if (pinkGhost.timer < 180) {
        pinkGhost.hunt(82)
      } else if (pinkGhost.timer < 240) {
        pinkGhost.hunt(1474)
      } else if (pinkGhost.timer < 300) {
        pinkGhost.hunt(193)
      } else if (pinkGhost.timer < 360) {
        pinkGhost.hunt(1445)
      } else if (pinkGhost.timer < 420) {
        pinkGhost.moveGhostIndex()
      }
    } else {
      pinkGhost.runAway()
    }
    if (pinkGhost.timer === 420) {
      pinkGhost.timer = 0
    }
    pinkGhost.addGhost()
    pinkGhost.eatPacman()
    if (pinkGhost.ghostIndex === pacmanIndex && isScared === true) {
      clearInterval(goPinkGhost)
      pinkGhost.removeGhost()
    }
  }, 200)
}

function greenGhostInterval() {
  goGreenGhost = setInterval(() => {
    greenGhost.timer++
    greenGhost.removeGhost()
    if (!isScared) {
      if (greenGhost.timer < 30) {
        greenGhost.hunt(82)
      } else if (greenGhost.timer < 60) {
        greenGhost.hunt(1474)
      } else if (greenGhost.timer < 90) {
        greenGhost.hunt(193)
      } else if (greenGhost.timer < 120) {
        greenGhost.hunt(1445)
      } else if (greenGhost.timer < 180) {
        greenGhost.moveGhostIndex()
      } else if (greenGhost.timer < 360) {
        greenGhost.hunt(pacmanIndex)
      }
    } else {
      greenGhost.runAway()
    }
    if (greenGhost.timer === 360) {
      greenGhost.timer = 0
    }
    greenGhost.addGhost()
    greenGhost.eatPacman()
    if (greenGhost.ghostIndex === pacmanIndex && isScared === true) {
      clearInterval(goGreenGhost)
      greenGhost.removeGhost()
    }
  }, 200)
}

function orangeGhostInterval() {
  goOrangeGhost = setInterval(() => {
    orangeGhost.timer++
    orangeGhost.removeGhost()
    if (!isScared) {
      if (orangeGhost.timer < 30) {
        orangeGhost.moveGhostIndex()
      } else if (orangeGhost.timer < 60) {
        orangeGhost.hunt(193)
      } else if (orangeGhost.timer < 90) {
        orangeGhost.hunt(1445)
      } else if (orangeGhost.timer < 120) {
        orangeGhost.hunt(1474)
      } else if (orangeGhost.timer < 360) {
        orangeGhost.hunt(pacmanIndex - 2)
      } else if (orangeGhost.timer < 390) {
        orangeGhost.hunt(82)
      }
    } else {
      orangeGhost.runAway()
    }
    if (orangeGhost.timer === 390) {
      orangeGhost.timer = 0
    }
    orangeGhost.addGhost()
    orangeGhost.eatPacman()
    if (orangeGhost.ghostIndex === pacmanIndex && isScared === true) {
      clearInterval(goOrangeGhost)
      orangeGhost.removeGhost()
    }
  }, 200)
}

function blueGhostInterval() {
  goBlueGhost = setInterval(() => {
    blueGhost.timer++
    blueGhost.removeGhost()
    if (!isScared) {
      if (blueGhost.timer < 30) {
        blueGhost.hunt(193)
      } else if (blueGhost.timer < 60) {
        blueGhost.hunt(1445)
      } else if (blueGhost.timer < 90) {
        blueGhost.moveGhostIndex()
      } else if (blueGhost.timer < 300) {
        blueGhost.hunt(pacmanIndex + 2)
      } else if (blueGhost.timer < 360) {
        blueGhost.hunt(82)
      } else if (blueGhost.timer < 420) {
        blueGhost.hunt(1474)
      }
    } else {
      blueGhost.runAway()
    }
    if (blueGhost.timer === 420) {
      blueGhost.timer = 0
    }
    blueGhost.addGhost()
    blueGhost.eatPacman()
    if (blueGhost.ghostIndex === pacmanIndex && isScared === true) {
      clearInterval(goBlueGhost)
      blueGhost.removeGhost()
      // const eatGhost = document.querySelector('audio')
      // eatGhost.src = 'assets/sounds/pacman_eatghost.wav'
      // eatGhost.play()
    }
  }, 200)
}

// ***************************************************************** PACMAN *****

let pacmanIndex = 41
cells[pacmanIndex].childNodes[0].classList.remove('pellet')
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
    let scaredCounter = 0
    const scaredTimer = setInterval(() => {
      scaredCounter++
      if (scaredCounter > 20) {
        isScared = false
        cells[pinkGhost.ghostIndex].childNodes[0].classList.remove('scared')
        cells[greenGhost.ghostIndex].childNodes[0].classList.remove('scared')
        cells[blueGhost.ghostIndex].childNodes[0].classList.remove('scared')
        cells[orangeGhost.ghostIndex].childNodes[0].classList.remove('scared')
        clearInterval(scaredTimer)
      }
    }, 1000)
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
  console.log(pacmanIndex)
  addPacman()



  if (cells[pacmanIndex].childNodes[0].classList.contains('ghost') && !isScared) {
    gameOver()
  }

  if (pacmanIndex === pinkGhost.ghostIndex && isScared === true) {

    clearInterval(goPinkGhost)
    pinkGhost.removeGhost()

    // const eatGhost = document.querySelector('audio')
    // eatGhost.src = 'assets/sounds/pacman_eatghost.wav'
    // eatGhost.play()

  }
  if (pacmanIndex === blueGhost.ghostIndex && isScared === true) {
    clearInterval(goBlueGhost)
    blueGhost.removeGhost()

    // const eatGhost = document.querySelector('audio')
    // eatGhost.src = 'assets/sounds/pacman_eatghost.wav'
    // eatGhost.play()

  }
  if (pacmanIndex === greenGhost.ghostIndex && isScared === true) {
    clearInterval(goGreenGhost)
    greenGhost.removeGhost()

    // const eatGhost = document.querySelector('audio')
    // eatGhost.src = 'assets/sounds/pacman_eatghost.wav'
    // eatGhost.play()
  }
  if (pacmanIndex === orangeGhost.ghostIndex && isScared === true) {
    clearInterval(goOrangeGhost)
    orangeGhost.removeGhost()

    // const eatGhost = document.querySelector('audio')
    // eatGhost.src = 'assets/sounds/pacman_eatghost.wav'
    // eatGhost.play()

  }


}



addPacman()


// ****************************************************************** GAME FUNCTIONS ***** 

// START THE GHOSTS 


function startGhosts(event) {
  if (event.key === " ") {
    text.style.color = 'black'
    cells[pacmanIndex].childNodes[0].classList.remove('pellet')
    blueGhostInterval()
    orangeGhostInterval()
    greenGhostInterval()
    pinkGhostInterval()
    document.removeEventListener('keyup', startGhosts)
    document.addEventListener('keyup', movePacman)
    powerPelletTimeout()
    // const pacmanBeginning = document.querySelector('audio') 
    // pacmanBeginning.src = 'assets/pacman_beginning.wav'
    // pacmanBeginning.play()
  }
}


document.addEventListener('keyup', startGhosts)


// END THE GAME AND SHOW THE SCORE


function addLetter(direction, start, end) {
  if (direction === 'h') {
    for (let i = start; i < end; i++) {
      cells[i].classList.add('letter1')
    }
  }
  if (direction === 'v') {
    for (let i = start; i < end; i += width) {
      cells[i].classList.add('letter1')      
    }
  }
}

function writeGameOver() {
  // G
  addLetter('v', 163, 603)
  addLetter('h', 123, 129)
  addLetter('v', 129, 329)
  addLetter('h', 603, 609)
  addLetter('v', 449, 609)
  addLetter('v', 124, 145)
  addLetter('h', 446, 450)
  // A
  addLetter('h', 132, 138)
  addLetter('h', 451, 458)
  addLetter('v', 171, 651)
  addLetter('v', 178, 658)

  // M
  addLetter('v', 140, 660)
  addLetter('v', 148, 668)
  addLetter('v', 141, 221)
  addLetter('v', 147, 227)
  addLetter('v', 182, 262)
  addLetter('v', 186, 266)
  addLetter('v', 223, 303)
  addLetter('v', 225, 305)
  addLetter('v', 264, 344)

  // E
  addLetter('v', 150, 650)
  addLetter('h', 150, 157)
  addLetter('h', 470, 476)
  addLetter('h', 631, 637)

  // O 
  addLetter('v', 1004, 1403)
  addLetter('v', 1010, 1410)
  addLetter('h', 965, 970)
  addLetter('h', 1405, 1410)

  // V 
  addLetter('v', 972, 1332)
  addLetter('v', 979, 1339)
  addLetter('v', 1333, 1413)
  addLetter('h', 1374, 1375)
  addLetter('h', 1377, 1379)
  addLetter('h', 1338, 1339)
  addLetter('h', 1415, 1417)

  // E
  addLetter('v', 981, 1441)
  addLetter('h', 981, 988)
  addLetter('h', 1301, 1307)
  addLetter('h', 1422, 1428)

  // R
  addLetter('v', 990, 1470)
  // addLetter('h', 238, 298)
  // addLetter('v', 358, 378)

  addLetter('h', 990, 995)
  addLetter('h', 1035, 1036)
  addLetter('v', 1076, 1117)
  addLetter('h', 1155, 1156)
  addLetter('h', 1190, 1195)
  addLetter('v', 1233, 1273)
  addLetter('v', 1274, 1314)
  addLetter('v', 1315, 1355)
  addLetter('v', 1356, 1476)

  const purpleArray = []
  const backgroundArray = []
  const allSpans = document.querySelectorAll('span')
  allSpans.forEach(span => { 
    span.classList.add('pellet')
  })
  cells.forEach(cell => {
    if (cell.classList.contains('letter1')) {
      purpleArray.push(cell)
      setInterval(() => {
        const randomNum = Math.floor(Math.random() * 2)
        if (randomNum === 0) {
          cell.classList.toggle('letter2')
        }
      }, 100)
    } else {
      backgroundArray.push(cell)
    }
  })
  backgroundArray.forEach(cell => {
    cell.classList.add('transparent')
  })
  // setInterval(() => { 
  //   purpleArray.forEach(cell => {
  //     //  
  //     //  
  //     const randomNum = Math.floor(Math.random() * 3)
  //     if (randomNum === 0) {
  //       cell.childNodes[0].classList.toggle('letter3')
  //     }
  //   })
  // }, 500)
}

// gameOver()


function gameOver() {

  displayScore.innerHTML = `Score: ${score}`
  document.removeEventListener('keyup', movePacman)
  cells[pacmanIndex].childNodes[0].classList.remove('pacman')
  clearInterval(goBlueGhost)

  clearInterval(goOrangeGhost)

  clearInterval(goGreenGhost)

  clearInterval(goPinkGhost)

  console.log(score)

  writeGameOver()

  text.style.color = 'white'
  text.innerHTML = 'RESET'
  text.addEventListener('click', reset)

  // const pacmanDeath = document.querySelector('audio')
  // pacmanDeath.src = 'assets/sounds/pacman_death.wav'
  // pacmanDeath.play() 

}

function reset() {
  location.reload()
}








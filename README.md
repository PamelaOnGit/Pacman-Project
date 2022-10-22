# Pac-man Project

## Description

I chose to build a version of the eighties classic game Pac Man as my first project of the part-time GA software engineering course.  The requirements were as follows: 
1. Player should be able to clear at least one board
2. Player score should be displayed at the end of the game

I also wanted to include smart ghosts that could chase Pac Man and run away from him when they were scared.


Information about the original Pac Man game can be found here:
https://en.wikipedia.org/wiki/Pac-Man

## Deployment Links

My game can be found here: 
https://pamelaongit.github.io/Pacman-Project/

## Timeframe and Working Team

This was a solo project. 

I spent two weeks working on it, part-time. 

## Technologies and Development Tools

- JavaScript 
- HTML 
- CSS 
- VS Code
- Git and Github

## Brief

- Difficulty level: 2-3

- Pac Man is a classic arcade game from the 80s. The player aims eat all the food in a maze whilst being hunted by ghosts.

- If the player eats special flashing food the ghosts start to flash and can now be captured by the player, sending them back to their holding pen, from where they can once again start to hunt the player.  The aim is to achieve the highest score possible before being killed by the ghosts.
 
- The player should be able to clear at least one board-* The player's score should be displayed at the end of the game

- Suggested enhancements include: Smart Ghosts, Responsive design, Each board gets more difficult, Persistent leaderboard using `localStorage.`

- The biggest challenge here is managing the ghost movement. With random movement, this project gets a rating of 2, but with smart movement of the ghosts going towards where PacMan is, it becomes a 3.

## Planning

1. I started by listing the elements of my game - maze, ghosts and Pac Man - and listing the basic functionalities of each element, how the player should be able to interact with it, and the data type I planned to use for it.  

2. I planned a simple grid: 

![grid_pseudo_code](/assets/images/grid_pseudo_code.png)

3. Next, I decided to concentrate on the ghosts and how they should move around the grid.  My first bash at pseudo-coding my ghosts, moving randomly, looked like this: 

![ghosts_class_pseudo_code](/assets/images/ghost-class-pseudo-code.png)

4. I wrote the following pseudo-code for an event listener allowing the player to move Pac Man around the grid using the arrow keys: 

![pac_man_event_listener_pseudo_code](/assets/images/pac_man_movement_pseudo_code.png)

5. At this point, I wanted to get started, coding my game! 

## Build/Code Process

1. I created a function for building my grid using HTML and JavaScript. I added a function for building the walls of my maze and I added a single span to each empty cell. I planned to add and remove CSS classes to this span to make a ghost (a colored circle or flashing circle, when scared), Pac Man (a yellow square), a pellet (a small white circle), or a flashing pellet. 

2. I created a ghost class with the basic functions for moving a ghost CSS class around the grid - addGhost(), removeGhost() and moveGhostIndex(). At this point, I used random movement for my ghosts.  I was concerned with making sure they could move around the grid and handle collisions with the walls and with other ghosts.  In this first iteration of my game, I tried using a do/while loop to make a random selection between the empty cells adjacent to the ghost (see point 1 of the Challenges section below).  This worked adequately for up to three ghosts to make random movements around a simple grid, on a setInterval(). 

3. Each ghost consisted of an instance of the Ghost class, and contained a setInterval(), which timed its movement around the grid.

4. I created an eventListener for moving the Pac Man index around the grid. 

5. I created  functions for eatPacman() and eatGhost() and called these in both the Ghost class and the Pac Man event listener.  I created functions for Pac Man to eat the pellets.  

6. I added functions for a flashing pellet, which would appear after a period of time had elapsed, in a random cell on the grid.  I added a boolean outside my Ghost class called isScared, which could be set to 'true' if Pac Man 'ate' the flashing pellet.  

## Challenges

### Random Ghost Movement 
As  I was experimenting with random ghost movement, my first thought was to use a do/while loop to select a random direction for the new ghostIndex, as shown in my pseudo code for my ghost class.  This worked quite well for two or three ghosts, but it quickly broke when three ghosts collided with one another.  I also saw that it was unnecessarily complicated.  I simplified the moveGhostIndex() function so that it worked by compiling an array of possible moves for the ghost (ie. adjacent empty cells) in the possArray.  I used if/else statements to choose assign a means of choosing the next move, depending on whether there were 0, 1, 2 or 3 empty cells adjacent to the current ghostIndex.  I added a variable to my Ghost class called this.path, which tracked the path of the ghost around the grid.  This allowed me to specify that the ghost should back track only as a last resort, for example when it reached a dead end or collided with another ghost.    

![move_Ghost_Index_func](/assets/images/move_Ghost_Index_func.png)

This code was much clearer and handled collisions well.  It also formed the basis for the moveGhostIndex() method (which moves the ghosts randomly), the hunt() method and the runAway() method. 

### Intelligent Ghost Movement
Once I had clarified the random ghost movement, implementing the smart movement was straightforward and required only a minor modification to the moveGhostIndex() method.  I wrote some general functions to calculate the distance between any two cells on the grid and then to get the index of the smallest and largest numbers in an array.  I then used these functions to select the best move for the ghost from possible moves, when faced with more than one option (ie at a junction).  

![hunt_func](/assets/images/hunt_func.png)

In exactly the same way, I was able to create a runAway() method, to get the ghosts to flee from Pac Man when isScared was set to 'true'.

## Wins

Once the game was functioning, I was able to make a more complex maze using the createGrid() and buildWall() functions.  I was also able to easily adjust the behaviours of each ghost individually.  This allows me to give each ghost its own specific behaviours, to chase Pac Man or aim for a cell near him in order to intercept him, to scatter to its own area of the grid, to select a direction at random.  I also added a timer to the Ghost class so that the ghosts take turns to chase Pac Man, scatter around the grid and move at random.  These can be very easily altered to make the game easier or more difficult.  

![pinkGhost_instance](/assets/images/pinkGhost_instance.png)

## Key Learnings 

Building this game represented a consolidation of much of the JavaScript I have recently learned.  In particular, I found it useful to practise using classes and timed functions.  

## Bugs

There is a slight tendency for my ghosts to 'stick' together for short intervals as they move around the grid.  Given more time, I would like to work out how it is possible to make them separate immediately and proceed in opposite directions.  

## Future Improvements

There are many improvements I would like to make to this game.

Had time allowed, I had planned to work on the presentation of the game and hoped to start learning how to animate it and work on the presentation.  I did add some sound effects from the original game but have commented these out as they are very annoying.  

Creating levels of increasing difficultly should now be a straightforward matter.











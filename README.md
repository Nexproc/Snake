# Conway's Snake of Death
## Overview
### Description
A JavaScript and jQuery version of the Snake. When the player dies, the individual links of the snake's body are used as a seed to begin [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

### Gameplay
Eat the the apples on the ground to increase the size of your snake. Upon death, the game will invoke the game of life until a reset is triggered.

## Controls
### Directions
Use WSAD or the arrow keys to change the direction that your head is facing.

### Reset / New Game
Press any key after losing to start a new game.

## Technical Details
### Languages Used
- Javascript
- jQuery
- CSS3
- HTML5

### The Board
#### Front End
The board is a `ul` composed of `li`s to represent the rows. These are composed of `div`s to represent the individual cells in each row. Cells are then given a class to represent what the node should be rendered as:

- `H` is for the head of the snake
- `S` is for the body of the snake
- `A` is for apple
- `e` is for an empty cell

Each cell is given a class based on the `art` that is returned from `board`'s `#render()`.

#### Back End
The game itself consists of a few separate classes:

- `Coord`: Simply stores the current position of a cell and compares it to other coordinate arrays.
- `Snake`: Consists of an `array` of `coordinate`s and has a given direction, the snake is completely repsonsible for moving itself.  The movement is achieved by appending a new coord to the beginning of the array and removing the last coord from the end.
- `Board`: Consists of 20 `array`s (rows), each of which is composed of 20 `char`s to represent the current state of the given cell. These states are exactly the same as the `class`es of the `div`s on the front end and are used to define the new classes for those `div`s.

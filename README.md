
<h1 align="center">React Snake</h1>
<h2>About</h2>

React Snake is my implementation of the popular video game, [Snake](https://en.wikipedia.org/wiki/Snake_(video_game_genre)/), 
and it is also my first ever personal React project. <br>
Originally, I have made it using vanilla Javascript and React, and, while the game functionalities were working, <br>
I was unsatisfied with the structure of my code as it was difficult to follow and predict the state changes.  <br>
Consequently, I have refactored and improved my code using Typescript and Redux, resulting a more structured and predictable codebase.

<h2>Game features</h2>

The game includes 2 modes: with and without borders. <br>
The first mode is the default mode in which the game resets when the player (snake) hits the borders of the game grid. <br>
In the second mode the player teleports to the opposite side of the grid once they touch a border. <br>

The player's score increases when they consume the fruit, and the game saves the high score using local storage so that it doesn't get lost 
when page gets refreshed or the browser gets closed.

You can control the movement of the snake using the A, W, S, D, and the arrow keys.
<h2>Tech stack</h2>

* Typescript
* React
* Redux

<h2>Installation</h2>

```git clone https://github.com/skorotky/react-snake.git``` <br>
```cd react-snake``` <br>
```npm i``` <br>
```npm run dev``` <br>

This will serve the project at http://localhost:5173/
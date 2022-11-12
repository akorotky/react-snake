import { useEffect, useState, useRef, useCallback } from "react";
import Grid from "./Grid";
import * as utils from "../utils";

const initialSnakeState = () => [
  { row: 10, col: 9 },
  { row: 10, col: 10 },
  { row: 10, col: 11 },
];
const initialDirectionState = () => {
  return { row: 0, col: 0 };
};

const initialMatrixState = () =>
  utils.createMatrix(NUM_ROWS, NUM_COLS, {
    isSnake: false,
    isFood: false,
    isHead: false,
  });

const NUM_ROWS = 15,
  NUM_COLS = 19;

const MODE = {
  withWalls: 0,
  noWalls: 1,
};

function GameBoard() {
  var speed = 150; // delay value
  const snake = useRef(initialSnakeState());
  const food = useRef(utils.generateFood(NUM_ROWS, NUM_COLS));
  const score = useRef(0);
  const currDirection = useRef(initialDirectionState());
  const newDirection = useRef(initialDirectionState());
  const [matrix, setMatrix] = useState(initialMatrixState());
  const didRender = useRef(false);

  const [gameMode, setGameMode] = useState(MODE.withWalls);

  const resetGameVariables = useCallback(() => {
    const newSnake = initialSnakeState();
    const newScore = 0;
    currDirection.current = newDirection.current = initialDirectionState();
    return [newSnake, newScore];
  }, []);

  const updateGameVariables = useCallback(
    (matrix, direction, snake, food, score) => {
      let newSnake = snake,
        newFood = food,
        newScore = score;

      newSnake = utils.updateSnake(snake, direction);

      if (utils.didCollisionHappen(newSnake, matrix)) {
        const snakeHead = utils.getSnakeHead(newSnake);
        // move snake head to the opposite side of the board if mode is noWalls
        if (gameMode === 1 && utils.isSnakeOutOfBounds(snakeHead, matrix)) {
          let positionShift;
          if (snakeHead.row < 0) positionShift = { row: matrix.length, col: 0 };
          else if (snakeHead.row >= matrix.length)
            positionShift = { row: matrix.length * -1, col: 0 };
          else if (snakeHead.col < 0)
            positionShift = { row: 0, col: matrix[0].length };
          else if (snakeHead.col >= matrix[0].length)
            positionShift = { row: 0, col: matrix[0].length * -1 };

          newSnake = utils.updateSnake(newSnake, positionShift);
        } else [newSnake, newScore] = resetGameVariables();
      } else {
        const newSnakeHead = utils.getSnakeHead(newSnake);

        if (newSnakeHead.row === food.row && newSnakeHead.col === food.col) {
          [newSnake, newFood, newScore] = utils.consumeFood(
            newSnake,
            newScore,
            matrix.length,
            matrix[0].length
          );
        }
      }
      const newMatrix = utils.updateMatrix(
        initialMatrixState(),
        newSnake,
        newFood
      );

      return [newMatrix, newSnake, newFood, newScore];
    },
    [resetGameVariables, gameMode]
  );

  const setNewDirection = (newValue) => (newDirection.current = newValue);
  const getCurrentDirection = () => currDirection.current;

  const handleKeyDown = useCallback((e) => {
    const positionShift = { row: 0, col: 0 };
    const key = e.which;
    if (key === 38 || key === 87) positionShift.row--; // up
    else if (key === 40 || key === 83) positionShift.row++; // down
    else if (key === 39 || key === 68) positionShift.col++; // right
    else if (key === 37 || key === 65) positionShift.col--; // left
    else return; // if key is different then do nothing
    const currentDirection = getCurrentDirection();
    if (
      currentDirection.row !== positionShift.row ||
      currentDirection.col !== positionShift.col
    ) {
      setNewDirection(positionShift);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const game = () => {
    // prevent from firing renders continuously beyond the first render after game reset
    if (
      newDirection.current.row === newDirection.current.col &&
      didRender.current
    )
      return;

    // verify that the new direction is not opposite to the previous one
    if (
      utils.isValidDirectionChange(currDirection.current, newDirection.current)
    )
      currDirection.current = newDirection.current;

    const gameArgs = [
      matrix,
      currDirection.current,
      snake.current,
      food.current,
      score.current,
    ];
    let newMatrix;

    [newMatrix, snake.current, food.current, score.current] =
      updateGameVariables(...gameArgs);
    setMatrix(newMatrix);

    if (!didRender.current) didRender.current = true;
  };

  // main program
  useEffect(() => {
    const timer = setInterval(game, speed);
    return () => clearInterval(timer);
  });

  const toggleCellStyle = (cell) => {
    return cell.isHead
      ? "snake-head"
      : cell.isSnake
      ? "snake-cell"
      : cell.isFood
      ? "food-cell"
      : "";
  };

  return (
    <div style={{ display: "inline-flex" }}>
      <div id="grid-container">
        <div id="score">Score: {score.current}</div>
        <Grid matrix={matrix} cellStyle={toggleCellStyle}></Grid>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Toggle Game Mode</button>
        <div className="dropdown-content">
          <button onClick={() => setGameMode(MODE.withWalls)}>
            With Walls
          </button>
          <button onClick={() => setGameMode(MODE.noWalls)}>No Walls</button>
        </div>
      </div>
    </div>
  );
}

export default GameBoard;

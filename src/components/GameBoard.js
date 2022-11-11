import { useEffect, useState, useRef, useCallback } from "react";
import useDirection from "../utils/useDirection";
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
  NUM_COLS = 18;


function GameBoard() {
  var speed = 150; // timeout value
  const snake = useRef(initialSnakeState());
  const [direction, setDirection] = useDirection(initialDirectionState());
  const prevDirection = useRef(initialDirectionState());

  const fruit = useRef(utils.generateFruit(NUM_ROWS, NUM_COLS)); 
  const score = useRef(0);
  const [matrix, setMatrix] = useState(initialMatrixState());
  const didRender = useRef(false);

  const eatFruit = () => {
    snake.current = utils.growSnake(snake.current);
    fruit.current = utils.generateFruit(NUM_ROWS, NUM_COLS);
    score.current = utils.updateScore(score.current);
  };

  const resetGame = useCallback(() => {
    snake.current = initialSnakeState();
    score.current = 0
    setDirection(initialDirectionState());
  }, [setDirection]);

  const snakeGameLoop = useCallback(
    (direction, score, matrix, setMatrix) => {
    
       snake.current = utils.updateSnake(snake.current, direction);

      if (utils.didCollisionHappen(snake.current, matrix)) {
        resetGame();
      } else {
        const newSnakeHead = utils.getSnakeHead(snake.current);

        if (
          newSnakeHead.row === fruit.current.row &&
          newSnakeHead.col === fruit.current.col
        ) {
          eatFruit();
        }
      }
      const matrixArgs = [
        initialMatrixState(),
        setMatrix,
        snake.current,
        fruit.current,
      ];
      utils.updateMatrix(...matrixArgs);
    },
    [resetGame]
  );

  useEffect(() => {
    const timer = setTimeout(() => {

      // prevent from firing renders continuously beyond the first render after gane reset
      if (direction.row === direction.col && didRender.current) return;
      
      // verify that the new direction is not opposite to the previous one
      if(utils.isValidDirectionChange(prevDirection.current, direction)) prevDirection.current = direction
      const gameArgs = [prevDirection.current, score.current, matrix, setMatrix];

      // game loop
      snakeGameLoop(...gameArgs);

      if (!didRender.current) didRender.current = true;

    }, speed);
    return () => clearTimeout(timer);
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
  <>
    <div style={{color:"white", fontSize: "5vh"}}>Score: {score.current}</div>
    <Grid matrix={matrix} cellStyle={toggleCellStyle}></Grid>;
  </>
  )
}

export default GameBoard;


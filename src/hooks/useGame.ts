import { useEffect } from "react";
import { GAME_MODE, initialPositionShiftState } from "../constants";
import { eat, GameState, move, reset } from "../redux/game-slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TPosition } from "../types";
import {
  didCollisionHappen,
  didSnakeCollide,
  isSamePosition,
  position,
  positionID,
} from "../utils";
import useKeyDown from "./useKeyDown";
import useTimer from "./useTimer";

function useGame() {
  const { positionShift, setPositionShift } = useKeyDown();
  const tick = useTimer();
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game);
  const { snake, food } = gameState;

  // animation must happen consistently with the same delay
  useEffect(() => {
    handleMovement(positionShift);
  }, [tick]);

  useEffect(() => {
    handleCollision(gameState);
    handleFoodConsumption(gameState);
  }, [snake, food]);

  function handleMovement(positionShift: TPosition) {
    if (isSamePosition(positionShift, initialPositionShiftState)) return;
    dispatch(move(positionShift));
  }

  function handleCollision(gameState: GameState) {
    const { snake, mode, grid } = gameState;

    if (snake.head === undefined) return;
    if (didCollisionHappen(snake.head, snake.bodyArray, grid)) {
      if (didSnakeCollide(snake.head, snake.bodyArray)) {
        resetGame();
      } else {
        if (mode === GAME_MODE.WALLS) resetGame();
        else if (mode === GAME_MODE.NO_WALLS) handleIsOutOfBounds(gameState);
      }
    }
  }

  function resetGame() {
    setPositionShift(initialPositionShiftState);
    dispatch(reset());
  }

  function handleFoodConsumption(gameState: GameState) {
    const { snake, food } = gameState;
    if (positionID(food) in snake.bodyMap) {
      dispatch(eat());
    }
  }

  function handleIsOutOfBounds(gameState: GameState) {
    const { snake, grid } = gameState;
    const snakeHead = snake.head;

    if (snakeHead === undefined) return;

    let newPosition;
    if (snakeHead.row < 0) newPosition = position(grid.length, 0);
    else if (snakeHead.row >= grid.length)
      newPosition = position(grid.length * -1, 0);
    else if (snakeHead.col < 0) newPosition = position(0, grid[0].length);
    else if (snakeHead.col >= grid[0].length)
      newPosition = position(0, grid[0].length * -1);

    dispatch(move(newPosition as TPosition));
  }

  return { snake: snake, food: food };
}

export default useGame;

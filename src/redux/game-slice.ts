import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GAME_MODE,
  initialFoodState,
  initialGridState,
  initialSnakeState,
} from "../constants";
import { TPosition, TSnakeBodyMap } from "../types";
import { generateFood, position, positionID } from "../utils";

export interface SnakeState {
  head: TPosition | undefined;
  tail: TPosition | undefined;
  bodyArray: TPosition[];
  bodyMap: TSnakeBodyMap;
  canGrow: boolean;
}

export interface GameState {
  snake: SnakeState;
  food: TPosition;
  score: number;
  grid: number[][];
  mode: string;
}

const initialState: GameState = {
  snake: initialSnakeState,
  food: initialFoodState,
  score: 0,
  grid: initialGridState,
  mode: GAME_MODE.WALLS,
};

const snakeSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    move: (state, action: PayloadAction<TPosition>) => {
      const positionShift = action.payload;
      const snake = state.snake;

      // set the head and tail when first starting to move
      if (snake.head === undefined && snake.tail === undefined) {
        if (positionShift.col > 0) {
          snake.head = snake.bodyArray.at(-1);
          snake.tail = snake.bodyArray[0];

          // swap head and tail
          const tmp = snake.bodyArray[0];
          snake.bodyArray[0] = snake.bodyArray[snake.bodyArray.length - 1];
          snake.bodyArray[snake.bodyArray.length - 1] = tmp;
        } else {
          snake.head = snake.bodyArray[0];
          snake.tail = snake.bodyArray.at(-1);
        }
      }

      const currentHead = snake.head as TPosition;
      const newHead = position(
        currentHead.row + positionShift.row,
        currentHead.col + positionShift.col
      );
      // updare head position
      snake.head = newHead;
      if (snake.canGrow === false) {
        // remove previous tail and update it
        snake.bodyArray = snake.bodyArray.slice(0, snake.bodyArray.length - 1);
        delete snake.bodyMap[positionID(snake.tail as TPosition)];
        snake.tail = snake.bodyArray[snake.bodyArray.length - 1];
      } else snake.canGrow = false;

      // update body with the new head
      snake.bodyMap[positionID(newHead)] = newHead;
      snake.bodyArray.unshift(newHead);
    },

    eat(state) {
      state.snake.canGrow = true;
      state.score++;
      state.food = generateFood(state.snake.bodyMap, state.grid);
    },

    reset: (state) => {
      state.snake = initialSnakeState;
      state.score = 0;
    },

    toggleGameMode(state) {
      switch (state.mode) {
        case GAME_MODE.NO_WALLS:
          state.mode = GAME_MODE.WALLS;
          break;
        case GAME_MODE.WALLS:
          state.mode = GAME_MODE.NO_WALLS;
          break;
      }
    },
  },
});

export const { move, reset, eat, toggleGameMode } = snakeSlice.actions;
export default snakeSlice.reducer;

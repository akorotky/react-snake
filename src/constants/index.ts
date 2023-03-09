import { SnakeState } from "../redux/game-slice";
import { createGrid, generateFood, position, positionID } from "../utils";

const NUM_ROWS = 15;
const NUM_COLS = 15;

const ANIMATION_DELAY = 160;

const initialGridState = createGrid(NUM_ROWS, NUM_COLS);

const initialSnakeBodyArray = [
  position(7, 6),
  position(7, 7),
  position(7, 8),
];
const initialSnakeBodyMap = Object.fromEntries(
  initialSnakeBodyArray.map((pos) => [positionID(pos), pos])
);

const initialSnakeState: SnakeState = {
  head: undefined,
  tail: undefined,
  bodyArray: initialSnakeBodyArray,
  bodyMap: initialSnakeBodyMap,
  canGrow: false,
};

const initialFoodState = generateFood(initialSnakeBodyMap, initialGridState);

const initialPositionShiftState = position(0, 0);

const GAME_MODE = {
  WALLS: "WALLS",
  NO_WALLS: "NO_WALLS",
};

export {
  NUM_ROWS,
  NUM_COLS,
  ANIMATION_DELAY,
  initialPositionShiftState,
  initialSnakeState,
  initialGridState,
  initialFoodState,
  GAME_MODE,
};

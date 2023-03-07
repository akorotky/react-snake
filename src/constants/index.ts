import Position from "../classes/Position";
import Snake from "../classes/Snake";

const NUM_ROWS = 15;
const NUM_COLS = 15;

const initialSnakeState = new Snake([
  new Position(10, 9),
  new Position(10, 10),
  new Position(10, 11),
]);

export { NUM_ROWS, NUM_COLS, initialSnakeState };

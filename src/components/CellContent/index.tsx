import { TCellContentProps } from "../../types";
import { isFoodCell, isSnakeCell } from "../../utils";
import FoodCell from "../FoodCell";
import SnakeCell from "../SnakeCell";

function CellContent({ row, col, snake, food }: TCellContentProps) {
  return isSnakeCell(row, col, snake.bodyMap) ? (
    <SnakeCell snake={snake} row={row} col={col} />
  ) : isFoodCell(row, col, food) ? (
    <FoodCell />
  ) : null;
}

export default CellContent;

import { TCellContentProps } from "../types";
import { isFoodCell, isSnakeCell } from "../utils";
import FoodCell from "./FoodCell";
import SnakeCell from "./SnakeCell";

function CellContent({ row, col, snake, food }: TCellContentProps) {
  return isSnakeCell(row, col, snake) ? (
    <SnakeCell />
  ) : isFoodCell(row, col, food) ? (
    <FoodCell />
  ) : null;
}

export default CellContent;

import Position from "../classes/Position";
import Snake from "../classes/Snake";

type TMatrix = number[][];

type TGridProps = {
  numRows: number;
  numCols: number;
};

type TCellContentProps = {
  row: number;
  col: number;
  snake: Snake;
  food: Position;
};

export type { TMatrix, TGridProps, TCellContentProps };

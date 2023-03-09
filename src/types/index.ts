import { SnakeState } from "../redux/game-slice";

type TPosition = {
  row: number;
  col: number;
};

type TMatrix = number[][];

type TCellContentProps = {
  row: number;
  col: number;
  snake: SnakeState;
  food: TPosition;
};

type TSnakeBodyMap = { [key: string]: TPosition };

type TGridProps = {
  grid: number[][];
};

type TSnakeCellProps = {
  snake: SnakeState;
  row: number;
  col: number;
};

export type {
  TMatrix,
  TGridProps,
  TCellContentProps,
  TPosition,
  TSnakeBodyMap,
  TSnakeCellProps,
};

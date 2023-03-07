import Position from "../classes/Position";
import Snake from "../classes/Snake";
import { TMatrix } from "../types";

function createMatrix(numRows: number, numCols: number): number[][] {
  const m = [];
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(j);
    }
    m.push(row);
  }
  return m;
}

function positionID(row: number, col: number): string {
  return `${row} ${col}`;
}

function isSnakeCell(row: number, col: number, snake: Snake): boolean {
  return snake.has(new Position(row, col));
}

function isFoodCell(rowIdx: number, colIdx: number, food: Position) {
  return rowIdx === food.getRow() && colIdx === food.getCol();
}

function getRandInt(interval: number) {
  return Math.floor(Math.random() * interval);
}

function isOutOfBounds(snake: Snake, matrix: TMatrix) {
  const snakeHead = snake.getHead();
  return (
    snakeHead.getRow() < 0 ||
    snakeHead.getCol() < 0 ||
    snakeHead.getRow() >= getNumRows(matrix) ||
    snakeHead.getCol() >= getNumCols(matrix)
  );
}

function generateFood(snake: Snake, matrix: TMatrix) {
  const emptyCells = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const pos = new Position(i, j);
      if (snake.has(pos) == false) emptyCells.push(pos);
    }
  }
  const randomIdx = getRandInt(emptyCells.length);
  return emptyCells[randomIdx];
}

function getNumRows(matrix: TMatrix) {
  return matrix.length;
}

function getNumCols(matrix: TMatrix) {
  return matrix[0].length;
}

function didSnakeCollide(snake: Snake) {
  const snakeHead = snake.getHead();
  const snakeBody = snake.getBody();
  for (let i = 1; i < snakeBody.length; i++) {
    if (
      snakeHead.getRow() === snakeBody[i].getRow() &&
      snakeHead.getCol() === snakeBody[i].getCol()
    )
      return true;
  }
  return false;
}

export const didCollisionHappen = (snake: Snake, matrix: TMatrix) => {
  return isOutOfBounds(snake, matrix) || didSnakeCollide(snake);
};

export {
  createMatrix,
  positionID,
  isSnakeCell,
  isFoodCell,
  didSnakeCollide,
  generateFood,
};

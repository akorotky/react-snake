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

function isFoodCell(rowIdx:number, colIdx:number, food:Position){
    return rowIdx === food.row && colIdx === food.col
}


function getRandInt(interval: number) {
  return Math.floor(Math.random() * interval);
}

function isOutOfBounds(snake: Snake, matrix: TMatrix) {
  const snakeHead = snake.getHead();
  return (
    snakeHead.row < 0 ||
    snakeHead.col < 0 ||
    snakeHead.row >= getNumRows(matrix) ||
    snakeHead.col >= getNumCols(matrix)
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
      snakeHead.row === snakeBody[i].row &&
      snakeHead.col === snakeBody[i].col
    )
      return true;
  }
  return false;
}

export const didCollisionHappen = (snake: Snake, matrix: TMatrix) => {
  return isOutOfBounds(snake, matrix) || didSnakeCollide(snake);
};

export { createMatrix, positionID, isSnakeCell, isFoodCell, didSnakeCollide, generateFood };

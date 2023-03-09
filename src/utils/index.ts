import { TMatrix, TPosition, TSnakeBodyMap } from "../types";

function position(row: number, col: number): TPosition {
  return {
    row: row,
    col: col,
  };
}

function isSamePosition(posA: TPosition, posB: TPosition) {
  return posA.row === posB.row && posA.col == posB.col;
}
function createGrid(numRows: number, numCols: number): number[][] {
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

function positionID(position: TPosition): string {
  return `${position.row} ${position.col}`;
}

function isSnakeCell(
  row: number,
  col: number,
  snakeBody: TSnakeBodyMap
): boolean {
  return positionID(position(row, col)) in snakeBody;
}

function isFoodCell(rowIdx: number, colIdx: number, food: TPosition) {
  return rowIdx === food.row && colIdx === food.col;
}

function getRandInt(interval: number) {
  return Math.floor(Math.random() * interval);
}

function isOutOfBounds(snakeHead: TPosition, matrix: TMatrix) {
  return (
    snakeHead.row < 0 ||
    snakeHead.col < 0 ||
    snakeHead.row >= getNumRows(matrix) ||
    snakeHead.col >= getNumCols(matrix)
  );
}

function generateFood(snakeBody: TSnakeBodyMap, matrix: TMatrix) {
  const emptyCells = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const pos = position(i, j);
      if (snakeBody[positionID(pos)] !== null) emptyCells.push(pos);
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

function didSnakeCollide(snakeHead: TPosition, snakeBody: TPosition[]) {
  for (let i = 1; i < snakeBody.length; i++) {
    if (
      snakeHead.row === snakeBody[i].row &&
      snakeHead.col === snakeBody[i].col
    )
      return true;
  }
  return false;
}

export const didCollisionHappen = (
  snakeHead: TPosition,
  snakeBody: TPosition[],
  matrix: TMatrix
) => {
  return (
    isOutOfBounds(snakeHead, matrix) || didSnakeCollide(snakeHead, snakeBody)
  );
};

function isValidDirectionChange(
  prevDirection: TPosition,
  newDirection: TPosition
) {
  /*
    directions must not be opposite
    */
  return prevDirection.row !== 0
    ? -1 * prevDirection.row !== newDirection.row
    : true && prevDirection.col !== 0
    ? -1 * prevDirection.col !== newDirection.col
    : true;
}

export {
  createGrid,
  positionID,
  isSnakeCell,
  isFoodCell,
  didSnakeCollide,
  generateFood,
  isValidDirectionChange,
  position,
  isSamePosition,
  isOutOfBounds,
};

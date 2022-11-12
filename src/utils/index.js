export const createMatrix = (numRows, numCols, optionalProps) => {
  const matrix = [];
  for (let row = 0; row < numRows; row++) {
    matrix[row] = [];
    for (let col = 0; col < numCols; col++) {
      matrix[row][col] = { row, col, ...optionalProps };
    }
  }
  return matrix;
};

export const getRandomValue = (range) => {
  return Math.floor(Math.random() * range);
};

export const isValidDirectionChange = (currentDirection, newDirection) => {
  const isValidKeyPressed = newDirection.row !== newDirection.col;
  const areDirectionsDifferent =
    newDirection.row !== currentDirection.row ||
    newDirection.col !== currentDirection.col;
  const areDirectionsNotOpposite =
    newDirection.row !== currentDirection.row * -1 ||
    newDirection.col !== currentDirection.col * -1;

  if (isValidKeyPressed && areDirectionsDifferent && areDirectionsNotOpposite) {
    return true;
  } else return false;
};

export const isSnakeOutOfBounds = (snakeHead, grid) => {
  if (
    snakeHead.row < 0 ||
    snakeHead.col < 0 ||
    snakeHead.row >= grid.length ||
    snakeHead.col >= grid[0].length
  ) {
    return true;
  } else return false;
};

export const getSnakeHead = (snake) => snake[0];

export const growSnake = (snake) => {
  return [...snake, snake.at(-1)];
};

export const updateScore = (score) => {
  const newScore = score + 1;
  return newScore;
};

export const consumeFood = (snake, score, rowRange, colRange) => {
  const newSnake = growSnake(snake);
  const newFood = generateFood(rowRange, colRange);
  const newScore = updateScore(score);
  return [newSnake, newFood, newScore];
};

export const generateFood = (rowRange, colRange) => {
  return {
    row: getRandomValue(rowRange),
    col: getRandomValue(colRange),
  };
};

export const hasSnakeHitItself = (snake) => {
  const snakeHead = getSnakeHead(snake);
  for (let i = 1; i < snake.length; i++) {
    if (snakeHead.row === snake[i].row && snakeHead.col === snake[i].col)
      return true;
  }
  return false;
};

export const didCollisionHappen = (snake, matrix) => {
  const snakeHead = getSnakeHead(snake);
  return isSnakeOutOfBounds(snakeHead, matrix) || hasSnakeHitItself(snake);
};

export const updateMatrix = (newMatrixValue, snake, food) => {
  const newMatrix = [...newMatrixValue];

  snake.forEach((cell, index) => {
    if (!isSnakeOutOfBounds(cell, newMatrix)) {
      if (index === 0) newMatrix[cell.row][cell.col].isHead = true;
      newMatrix[cell.row][cell.col].isSnake = true;
    }
  });

  newMatrix[food.row][food.col].isFood = true;

  return newMatrix;
};

export const updateSnake = (snake, positionShift) => {
  const snakeHead = getSnakeHead(snake);
  const newSnake = [
    {
      row: snakeHead.row + positionShift.row,
      col: snakeHead.col + positionShift.col,
    },
  ];
  for (let i = 0; i < snake.length - 1; i++) {
    newSnake[i + 1] = snake[i];
  }
  return [...newSnake];
};

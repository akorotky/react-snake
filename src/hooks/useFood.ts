import { useEffect, useState } from "react";
import Position from "../classes/Position";
import Snake from "../classes/Snake";
import { TMatrix } from "../types";
import { generateFood } from "../utils";

function useFood(snake: Snake, matrix: TMatrix) {
  const [food, setFood] = useState<Position>(generateFood(snake, matrix));
  useEffect(() => {
    if (snake.has(food)) setFood(generateFood(snake, matrix));
  }, [snake]);

  return food;
}

export default useFood;

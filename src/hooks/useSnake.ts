import { useEffect, useState } from "react";
import Snake from "../classes/Snake";
import useKeyDown from "./useKeyDown";

function useSnake(initialSnakeState: Snake) {
  const positionShift = useKeyDown();
  const [snake, setSnake] = useState<Snake>(initialSnakeState);

  useEffect(() => {
    const frameID = setInterval(() => {
      if (positionShift.row === 0 && positionShift.col === 0) return;
      const newSnake = new Snake(snake.getBody());
      newSnake.move(positionShift);
      setSnake(new Snake(newSnake.getBody()));
    }, 150);
    return () => clearInterval(frameID);
  }, [positionShift, snake]);

  return snake;
}
export default useSnake;

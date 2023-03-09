import { SnakeState } from "../../redux/game-slice";
import { useAppSelector } from "../../redux/hooks";
import { TSnakeCellProps } from "../../types";
import { isSamePosition, position } from "../../utils";
import styles from "./snake-cell.module.css";

function SnakeCell({ snake, row, col }: TSnakeCellProps) {
  const { score } = useAppSelector((state) => state.game);

  function getClassName(snake: SnakeState) {
    return isSnakeHead(snake) ? styles.head : styles.body;
  }

  function isSnakeHead(snake: SnakeState) {
    return snake.head && isSamePosition(snake.head, position(row, col));
  }
  
  return (
    <div className={styles.snake}>
      <div className={getClassName(snake)}>
        {isSnakeHead(snake) ? score : null}
      </div>
    </div>
  );
}

export default SnakeCell;

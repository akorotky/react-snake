import { useRef } from "react";
import { initialSnakeState } from "../constants";
import useFood from "../hooks/useFood";
import useSnake from "../hooks/useSnake";
import { TGridProps } from "../types";
import { createMatrix } from "../utils";
import CellContent from "./CellContent";
import styles from "./grid.module.css";

function Grid({ numRows, numCols }: TGridProps) {
  const snake = useSnake(initialSnakeState);
  const matrix = useRef(createMatrix(numRows, numCols));
  const food = useFood(snake, matrix.current);

  return (
    <div className={styles.container}>
      <div className={styles.gridbox}>
        {matrix.current.map((row, rowIdx) => (
          <div className={styles.row} key={rowIdx}>
            {row.map((col, colIdx) => (
              <div className={styles.cell} key={colIdx}>
                <CellContent
                  row={rowIdx}
                  col={colIdx}
                  snake={snake}
                  food={food}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid;

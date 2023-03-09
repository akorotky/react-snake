import useGame from "../../hooks/useGame";
import { TGridProps } from "../../types";
import CellContent from "../CellContent";
import styles from "./grid.module.css";

function Grid({ grid }: TGridProps) {
  const { snake, food } = useGame();

  return (
    <div className={styles.container}>
      <div className={styles.gridbox}>
        {grid.map((row, rowIdx) => (
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

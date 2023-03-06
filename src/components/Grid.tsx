import { useState } from "react";
import styles from "./grid.module.css"

type GridPropsType = {
  numRows: number;
  numCols: number;
};

function Grid({ numRows, numCols }: GridPropsType) {
  const [matrix, setMatrix] = useState(createMatrix(numRows, numCols));

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

  return (
    <div className={styles.container}>
        <div className={styles.gridbox}> {matrix.map((row, rowIdx) => (
            <div className={styles.row} key={rowIdx}>
              {row.map((col, colIdx) => (
                <div className={styles.cell} key={colIdx}>{col}</div>
              ))}
            </div>
          ))}</div>
     
    </div>
  );
}

export default Grid;

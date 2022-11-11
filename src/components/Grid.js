import Cell from "./Cell";
import "./Grid.css";
import "./GameBoard.css"

function Grid(props) {
  const { matrix, cellStyle } = props;
  return (
    <div className="grid">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="grid-column">
              <Cell cellStyle={cellStyle(cell)}></Cell>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;

import { NUM_COLS, NUM_ROWS } from "../constants";
import styles from "./app.module.css";
import Grid from "./Grid";

function App() {
  return (
    <div className={styles.app}>
      <Grid numRows={NUM_ROWS} numCols={NUM_COLS}></Grid>
    </div>
  );
}

export default App;

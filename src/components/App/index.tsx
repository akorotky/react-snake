import { GAME_MODE } from "../../constants";
import useHighScore from "../../hooks/useHighScore";
import { toggleGameMode } from "../../redux/game-slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Grid from "../Grid";
import styles from "./app.module.css";

function App() {
  const { score, grid, mode } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const highScore = useHighScore(score);

  function showGameMode(mode: string) {
    return mode === GAME_MODE.WALLS ? "w/ walls" : "w/o walls";
  }

  return (
    <div className={styles.app}>
      <div className={styles.score}>
        <div>
          <strong>Score: </strong>
          <span className={styles.number}>{score}</span>
        </div>
        <div>
          <strong>High score: </strong>
          <span className={styles.number}>{highScore}</span>
        </div>
      </div>
      <div className={styles.changemode}>
        <button onClick={() => dispatch(toggleGameMode())}>
          Toggle Gamemode
        </button>
        <div>Current: {showGameMode(mode)}</div>
      </div>

      <Grid grid={grid} />
    </div>
  );
}

export default App;

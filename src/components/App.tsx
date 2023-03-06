import styles from "./app.module.css"
import Grid from './Grid'
import Toolbar from './Toolbar'

function App() {
  return (
    <div className={styles.app}>
      <Toolbar></Toolbar>
      <Grid numRows={15} numCols={15}></Grid>
    </div>
  )
}

export default App

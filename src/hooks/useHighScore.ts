import { useEffect, useState } from "react";

function useHighScore(score: number) {
  const [highScore, setHighScore] = useState(getHighScore());

  useEffect(() => {
    if (score > highScore) {
      setNewHighScore(score);
    }
  }, [score]);

  function getHighScore(): number {
    return parseInt(localStorage.getItem("highScore") || "0");
  }

  function setNewHighScore(newHighScore: number) {
    localStorage.setItem("highScore", newHighScore.toString());
    setHighScore(newHighScore);
  }

  return highScore;
}

export default useHighScore;

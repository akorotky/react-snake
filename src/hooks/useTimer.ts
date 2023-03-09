import { useEffect, useState } from "react";
import { ANIMATION_DELAY } from "../constants";

function useTimer() {
  const [timer, setTimer] = useState(true);

  useEffect(() => {
    const frameID = setInterval(() => {
      setTimer((timer) => !timer);
    }, ANIMATION_DELAY);
    return () => clearInterval(frameID);
  }, []);

  return timer;
}

export default useTimer;

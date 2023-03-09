import { useEffect, useState } from "react";
import { TPosition } from "../types";
import { isSamePosition, isValidDirectionChange, position } from "../utils";

function useKeyDown() {
  const [positionShift, setPositionShift] = useState<TPosition>(position(0, 0));

  useEffect(() => {
    /* 
    Must include positionShift in the dependencies, 
    otherwise its updates will not be reflected
    */
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [positionShift]);

  function handlePositionShift(prevPositionShift: TPosition, key: string) {
    const newPositionShift = position(0, 0);

    if (key === "KeyW" || key == "ArrowUp") newPositionShift.row--;
    else if (key === "KeyS" || key == "ArrowDown") newPositionShift.row++;
    else if (key === "KeyA" || key == "ArrowLeft") newPositionShift.col--;
    else if (key === "KeyD" || key == "ArrowRight") newPositionShift.col++;
    else return prevPositionShift; /* if any other key is pressed */

    return isValidDirectionChange(prevPositionShift, newPositionShift)
      ? newPositionShift
      : prevPositionShift;
  }

  function handleKeyDown(e: KeyboardEvent) {
    const newPositionShift = handlePositionShift(positionShift, e.code);
    // update state only when its different
    if (isSamePosition(positionShift, newPositionShift) === false)
      setPositionShift(newPositionShift);
  }

  return { positionShift: positionShift, setPositionShift: setPositionShift };
}

export default useKeyDown;

import { useEffect, useState } from "react";
import Position from "../classes/Position";
import { isValidDirectionChange } from "../utils";

function useKeyDown() {
  const [positionShift, setPositionShift] = useState<Position>(
    new Position(0, 0)
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    /* 
    Must include positionShift in the dependencies, 
    otherwise it will be reset to its initial state on every key press
    */
  }, [positionShift]);

  function handlePositionShift(prevPositionShift: Position, key: string) {
    const newPositionShift = new Position(0, 0);

    if (key === "KeyW" || key == "ArrowUp") newPositionShift.shiftRow(-1);
    else if (key === "KeyS" || key == "ArrowDown") newPositionShift.shiftRow(1);
    else if (key === "KeyA" || key == "ArrowLeft")
      newPositionShift.shiftCol(-1);
    else if (key === "KeyD" || key == "ArrowRight")
      newPositionShift.shiftCol(1);
    else return prevPositionShift; /* if any other key is pressed */
    
    return isValidDirectionChange(prevPositionShift, newPositionShift)
      ? newPositionShift
      : prevPositionShift;
  }

  function handleKeyDown(e: KeyboardEvent) {
    const newPositionShift = handlePositionShift(positionShift, e.code);
    setPositionShift(newPositionShift);
  }

  return positionShift;
}

export default useKeyDown;

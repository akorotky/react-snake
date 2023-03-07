import { useEffect, useState } from "react";
import Position from "../classes/Position";

function useKeyDown() {
  const [positionShift, setPositionShift] = useState<Position>(
    new Position(0, 0)
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handlePositionShift(key: string) {
    const newPositionShift = new Position(0, 0);

    if (key === "KeyW" || key == "ArrowUp") newPositionShift.shiftRow(-1);
    else if (key === "KeyS" || key == "ArrowDown") newPositionShift.shiftRow(1);
    else if (key === "KeyA" || key == "ArrowLeft")
      newPositionShift.shiftCol(-1);
    else if (key === "KeyD" || key == "ArrowRight")
      newPositionShift.shiftCol(1);
    return newPositionShift;
  }

  function handleKeyDown(e: KeyboardEvent) {
    const newPositionShift = handlePositionShift(e.code);
    setPositionShift(newPositionShift);
  }

  return positionShift;
}

export default useKeyDown;

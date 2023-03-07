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
    console.log(key);
    if (key === "KeyW" || key == "ArrowUp") newPositionShift.row--;
    else if (key === "KeyS" || key == "ArrowDown") newPositionShift.row++;
    else if (key === "KeyA" || key == "ArrowLeft") newPositionShift.col--;
    else if (key === "KeyD" || key == "ArrowRight") newPositionShift.col++;
    return newPositionShift;
  }

  function handleKeyDown(e: KeyboardEvent) {
    const newPositionShift = handlePositionShift(e.code);
    setPositionShift(newPositionShift);
  }

  return positionShift;
}

export default useKeyDown;

import { useState, useCallback, useEffect } from "react";

function useDirection(initialShift) {
  const [direction, setDirection] = useState(initialShift);

  const handleKeyDown = useCallback(
    (e) => {
      const positionShift = { row: 0, col: 0 };
      const key = e.which;
      if (key === 38 || key === 87) positionShift.row--; // up
      if (key === 40 || key === 83) positionShift.row++; // down
      if (key === 39 || key === 68) positionShift.col++; // right
      if (key === 37 || key === 65) positionShift.col--; // left
      if (
        direction.row !== positionShift.row ||
        direction.col !== positionShift.col
      ) {
        setDirection(positionShift);
      }
    },
    [direction, setDirection]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return [direction, setDirection];
}

export default useDirection;

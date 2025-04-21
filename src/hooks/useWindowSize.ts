import { useLayoutEffect, useState } from "react";

/**
 * useWindowSize
 *
 * Tracks the current window size (width and height) and updates on resize.
 *
 * @returns An object with:
 * - `width`: The current width of the window in pixels.
 * - `height`: The current height of the window in pixels.
 */
const useWindowSize = () => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const handleWindowSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleWindowSize();
    window.addEventListener("resize", handleWindowSize);

    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);

  return size;
};

export default useWindowSize;

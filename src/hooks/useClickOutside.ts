import { useEffect, RefObject } from "react";

/**
 * useClickOutside
 *
 * Detects clicks or touches outside the referenced element and triggers a callback.
 *
 * @param ref - A ref object pointing to the target element.
 * @param callback - Function to execute on outside click.
 *
 * This is useful for dismissing modals, dropdowns, popovers, etc., when the user clicks outside them.
 */
const useClickOutside = (ref: RefObject<HTMLElement | null>, callback: () => void): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;

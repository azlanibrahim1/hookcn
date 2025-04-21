import { useEffect, useState } from "react";

/**
 * useDebounce
 *
 * Delays updating a value until after a specified delay period.
 *
 * @param value - The input value to debounce.
 * @param delay - The delay in milliseconds before updating the debounced value.
 *
 * @returns The debounced version of the input value.
 */
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

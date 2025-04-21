import { useEffect, useState } from "react";

/**
 * useLocalStorage
 *
 * Synchronizes a state value with localStorage.
 *
 * @param key - The key under which the value is stored in localStorage.
 * @param initialValue - The initial value to use if no value is found in localStorage.
 *
 * @returns A tuple containing the current value and a setter function.
 * - `value`: The current state value.
 * - `setValue`: Function to update the state and localStorage.
 */
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing localStorage key:", key, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;

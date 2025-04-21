import { useEffect, useState } from "react";

/**
 * useSessionStorage
 *
 * Synchronizes a state value with sessionStorage.
 *
 * @param key - The key under which the value is stored in sessionStorage.
 * @param initialValue - The initial value to use if no value is found in sessionStorage.
 *
 * @returns A tuple containing the current value and a setter function.
 * - `value`: The current state value.
 * - `setValue`: Function to update the state and sessionStorage.
 */
const useSessionStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const storedValue = window.sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error reading sessionStorage key:", key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing sessionStorage key:", key, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
};

export default useSessionStorage;

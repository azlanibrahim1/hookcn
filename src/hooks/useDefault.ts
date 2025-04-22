import { useState } from "react";

/**
 * useDefault
 *
 * Returns a fallback value if the current state is null or undefined.
 *
 * @param initialValue - The initial state value.
 * @param defaultValue - The fallback value returned if state is null or undefined.
 *
 * @returns A tuple containing the current state (or default) and a setter function.
 */
const useDefault = <T>(initialValue: T, defaultValue: T) => {
  const [state, setState] = useState<T>(initialValue);

  if (typeof state === "undefined" || state === null) {
    return [defaultValue, setState] as const;
  }

  return [state, setState] as const;
};

export default useDefault;

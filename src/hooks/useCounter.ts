import { useCallback, useState } from "react";

interface UseCounterOptions {
  step?: number;
  min?: number;
  max?: number;
}

/**
 * useCounter
 *
 * Manages a numeric counter with optional step, min, and max boundaries.
 *
 * @param initialValue - Optional. The starting value of the counter. Default is 0.
 * @param options - Optional. Configuration for step size, min, and max limits.
 * - `step`: Amount to increment or decrement by. Default is 1.
 * - `min`: Minimum allowed value. Default is Number.MIN_SAFE_INTEGER.
 * - `max`: Maximum allowed value. Default is Number.MAX_SAFE_INTEGER.
 *
 * @returns An object containing:
 * - `count`: The current count value.
 * - `increment`: Function to increase the count by the step value.
 * - `decrement`: Function to decrease the count by the step value.
 * - `reset`: Function to reset the count to the initial value.
 */
const useCounter = (
  initialValue = 0,
  { step = 1, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER }: UseCounterOptions = {}
) => {
  if (initialValue < min) initialValue = min;
  if (initialValue > max) initialValue = max;

  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prevCount) => {
      const nextCount = prevCount + step;
      return nextCount > max ? max : nextCount;
    });
  }, [max, step]);

  const decrement = useCallback(() => {
    setCount((prevCount) => {
      const nextCount = prevCount - step;
      return nextCount < min ? min : nextCount;
    });
  }, [min, step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset };
};

export default useCounter;

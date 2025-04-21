# useCounter

Manages a numeric counter with optional step, min, and max boundaries.

### Installation

```bash
npx hookcn add useCounter
```

### Description

The `useCounter` hook provides a numeric counter with functions to increment, decrement, and reset the count. It supports configurable step size and optional minimum and maximum limits for precise control.

### Usage

```typescript
import useCounter from "src/hooks/useCounter";
//..
const { count, increment, decrement, reset } = useCounter(0, { step: 1, min: 0, max: 10 });
```

### Parameters

| Name           | Type     | Default value             | Description                          |
| -------------- | -------- | ------------------------- | ------------------------------------ |
| `initialValue` | `number` | `0`                       | The starting value of the counter.   |
| `options`      | `object` | `{}`                      | Configuration options for the hook.  |
| `options.step` | `number` | `1`                       | Amount to increment or decrement by. |
| `options.min`  | `number` | `Number.MIN_SAFE_INTEGER` | Minimum allowed value.               |
| `options.max`  | `number` | `Number.MAX_SAFE_INTEGER` | Maximum allowed value.               |

### Return Value

| Name        | Type         | Description                                       |
| ----------- | ------------ | ------------------------------------------------- |
| `count`     | `number`     | The current count value.                          |
| `increment` | `() => void` | Function to increase the count by the step value. |
| `decrement` | `() => void` | Function to decrease the count by the step value. |
| `reset`     | `() => void` | Function to reset the count to the initial value. |

### Example

```typescript
import useCounter from "src/hooks/useCounter";

const CounterComponent = () => {
  const { count, increment, decrement, reset } = useCounter(0, { step: 1, min: 0, max: 10 });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

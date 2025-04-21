# useDefault

Returns a fallback value if the current state is null or undefined.

### Installation

```bash
npx hooksy add useDefault
```

### Description

The `useDefault` hook manages a state value and returns a fallback value if the state is null or undefined. It provides a tuple with the current state (or default) and a setter function for updating the state.

### Usage

```typescript
import useDefault from "src/hooks/useDefault";
//..
const [value, setValue] = useDefault<string | null>(null, "default");
```

### Parameters

| Name           | Type | Default value | Description                                                    |
| -------------- | ---- | ------------- | -------------------------------------------------------------- |
| `initialValue` | `T`  | -             | The initial state value.                                       |
| `defaultValue` | `T`  | -             | The fallback value returned if state is `null` or `undefined`. |

### Return Value

| Name       | Type                 | Description                           |
| ---------- | -------------------- | ------------------------------------- |
| `value`    | `T`                  | The current state (or default) value. |
| `setValue` | `(value: T) => void` | Function to update the state.         |

### Example

```typescript
import useDefault from "src/hooks/useDefault";

const DefaultComponent = () => {
  const [value, setValue] = useDefault<string | null>(null, "default");

  return (
    <div>
      <p>Current value: {value}</p>
      <button onClick={() => setValue("updated")}>Update Value</button>
      <button onClick={() => setValue(null)}>Set to Null</button>
    </div>
  );
};
```

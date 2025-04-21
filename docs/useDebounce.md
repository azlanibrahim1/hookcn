# useDebounce

Delays updating a value until after a specified delay period.

### Installation

```bash
npx use-cli add useDebounce
```

### Description

The `useDebounce` hook delays updating a value until a specified delay period has passed. It is useful for optimizing performance in scenarios like search inputs, where frequent updates need to be throttled.

### Usage

```typescript
import useDebounce from "src/hooks/useDebounce";
//..
const debouncedValue = useDebounce(inputValue, 500);
```

### Parameters

| Name    | Type     | Default value | Description                                                      |
| ------- | -------- | ------------- | ---------------------------------------------------------------- |
| `value` | `string` | -             | The input value to debounce.                                     |
| `delay` | `number` | -             | The `delay` in milliseconds before updating the debounced value. |

### Return Value

| Name             | Type     | Description                               |
| ---------------- | -------- | ----------------------------------------- |
| `debouncedValue` | `string` | The debounced version of the input value. |

### Example

```typescript
import useDebounce from "src/hooks/useDebounce";

const SearchComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  return (
    <div>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type to search..." />
      <p>Debounced value: {debouncedValue}</p>
    </div>
  );
};
```

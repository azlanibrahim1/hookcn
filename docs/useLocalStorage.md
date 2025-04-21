# useLocalStorage

Synchronizes a state value with localStorage.

### Installation

```bash
npx use-cli add useLocalStorage
```

### Description

The `useLocalStorage` hook manages a piece of state that is persisted in `localStorage`. It initializes the state from `localStorage` if a value exists, and updates the stored value whenever the state changes. It works seamlessly for both reading and writing JSON-serializable values.

### Usage

```typescript
import useLocalStorage from "src/hooks/useLocalStorage";
//..
const [name, setName] = useLocalStorage<string>("username", "Guest");
```

### Parameters

| Name           | Type   | Default value | Description                                                |
| -------------- | ------ | ------------- | ---------------------------------------------------------- |
| `key`          | string | -             | The key under which the value is stored in `localStorage`. |
| `initialValue` | `T`    | -             | The initial value used if none is found in `localStorage`. |

### Return Value

| Name       | Type                 | Description                                        |
| ---------- | -------------------- | -------------------------------------------------- |
| `value`    | `T`                  | The current state value synchronized with storage. |
| `setValue` | `(value: T) => void` | Function to update the state and `localStorage`.   |

### Example

```typescript
import useLocalStorage from "src/hooks/useLocalStorage";

const LocalStorageComponent = () => {
  const [username, setUsername] = useLocalStorage<string>("username", "Guest");

  return (
    <div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <p>Stored username: {username}</p>
    </div>
  );
};
```

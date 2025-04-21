# useSessionStorage

Synchronizes a state value with sessionStorage.

### Installation

```bash
npx use-cli add useSessionStorage
```

### Description

The `useSessionStorage` hook manages a piece of state that is persisted in `sessionStorage`. It initializes the state from `sessionStorage` if a value exists, and updates the stored value whenever the state changes. This is useful for persisting state across page reloads within a session.

### Usage

```typescript
import useSessionStorage from "src/hooks/useSessionStorage";
//..
const [page, setPage] = useSessionStorage<number>("currentPage", 1);
```

### Parameters

| Name           | Type   | Default value | Description                                                  |
| -------------- | ------ | ------------- | ------------------------------------------------------------ |
| `key`          | string | -             | The key under which the value is stored in `sessionStorage`. |
| `initialValue` | `T`    | -             | The initial value used if none is found in `sessionStorage`. |

### Return Value

| Name       | Type                 | Description                                        |
| ---------- | -------------------- | -------------------------------------------------- |
| `value`    | `T`                  | The current state value synchronized with storage. |
| `setValue` | `(value: T) => void` | Function to update the state and `sessionStorage`. |

### Example

```typescript
import useSessionStorage from "src/hooks/useSessionStorage";

const PaginationComponent = () => {
  const [currentPage, setCurrentPage] = useSessionStorage<number>("currentPage", 1);

  return (
    <div>
      <p>Current page: {currentPage}</p>
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next Page</button>
    </div>
  );
};
```

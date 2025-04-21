# useOnline

Tracks whether the browser is currently online or offline.

### Installation

```bash
npx use-me add useOnline
```

### Description

The `useOnline` hook monitors the browser’s network status. It returns a boolean indicating whether the browser is online or offline, updating automatically when the network status changes.

### Usage

```typescript
import useOnline from "src/hooks/useOnline";
//..
const isOnline = useOnline();
```

### Return Value

| Name       | Type      | Description                                          |
| ---------- | --------- | ---------------------------------------------------- |
| `isOnline` | `boolean` | `true` if the browser is online, `false` if offline. |

### Example

```typescript
import useOnline from "src/hooks/useOnline";

const NetworkStatusComponent = () => {
  const isOnline = useOnline();

  return (
    <div>
      <p>Status: {isOnline ? "Online" : "Offline"}</p>
    </div>
  );
};
```

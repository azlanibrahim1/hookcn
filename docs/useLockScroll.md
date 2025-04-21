# useLockScroll

Locks or unlocks scrolling on the document body.

### Installation

```bash
npx use-me add useLockScroll
```

### Description

The `useLockScroll` hook manages the scroll locking behavior of the body element. When scroll is locked, it disables scrolling and compensates for the scrollbar width, ensuring layout stability.

### Usage

```typescript
import useLockScroll from "src/hooks/useLockScroll";
//...
const setLock = useLockScroll();
```

### Return Value

| Name      | Type                      | Description                           |
| --------- | ------------------------- | ------------------------------------- |
| `setLock` | `(lock: boolean) => void` | Function to lock or unlock scrolling. |

### Example

```typescript
const [isModalOpen, setIsModalOpen] = useState(false);
const setLock = useLockScroll();

const handleOpenModal = () => {
  setIsModalOpen(true);
  setLock(true);
};
```

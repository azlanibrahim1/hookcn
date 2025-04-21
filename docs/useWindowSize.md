# useWindowSize

Tracks the current window size (width and height) and updates on resize.

### Installation

```bash
npx use-me add useWindowSize
```

### Description

The `useWindowSize` hook tracks the current width and height of the window. It updates the size whenever the window is resized, making it useful for responsive designs and layouts.

### Usage

```typescript
import useWindowSize from "src/hooks/useWindowSize";
//..
const { width, height } = useWindowSize();
```

### Return Value

| Name     | Type     | Description                       |
| -------- | -------- | --------------------------------- |
| `width`  | `number` | The current width of the window.  |
| `height` | `number` | The current height of the window. |

### Example

```typescript
const { width, height } = useWindowSize();

<div>
  <p>Window width: {width}</p>
  <p>Window height: {height}</p>
</div>;
```

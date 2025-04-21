# useInViewport

Detects when an element is visible within the viewport.

### Installation

```bash
npx use-cli add useInViewport
```

### Description

The `useInViewport` hook checks if an element is visible in the viewport. You can adjust how much of the element needs to be visible or add a margin around the viewport to control when the element is considered visible.

### Usage

```typescript
import useInViewport from "src/hooks/useInViewport";
//..
const isInViewport = useInViewport(ref, 0.1, 0);
```

### Parameters

| Name         | Type                     | Default value | Description                                         |
| ------------ | ------------------------ | ------------- | --------------------------------------------------- |
| `ref`        | `RefObject<HTMLElement>` | -             | The `ref` of the HTML element to observe.           |
| `threshold`  | `number`                 | `0.1`         | Percentage of the element that needs to be visible. |
| `rootMargin` | `number`                 | `0`           | Margin around the viewport to consider.             |

### Return Value

| Name           | Type      | Description                                                  |
| -------------- | --------- | ------------------------------------------------------------ |
| `isInViewport` | `boolean` | `true` if the element is in the viewport, otherwise `false`. |

### Example

```typescript
import { useRef } from "react";
import useInViewport from "src/hooks/useInViewport";

const VisibilityComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(ref, 0.1, 0);

  return (
    <div>
      <div ref={ref} style={{ height: "200px", background: isInViewport ? "lightgreen" : "lightgray" }}>
        Scroll to see me!
      </div>
      <p>{isInViewport ? "Element is visible" : "Element is not visible"}</p>
    </div>
  );
};
```

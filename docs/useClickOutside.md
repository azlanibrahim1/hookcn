# useClickOutside

Detects when a click or tap occurs outside a referenced element and triggers a callback.

### Installation

```bash
npx use-me add useClickOutside
```

### Description

The `useClickOutside` hook listens for `mousedown` and `touchstart` events on the document and checks if the event target is outside of the provided element. If so, it invokes the given callback. This is especially useful for dismissing UI elements like modals, dropdowns, or sidebars.

### Usage

```ts
import useClickOutside from "src/hooks/useClickOutside";
//...
useClickOutside(ref, () => {
  // handle outside click
});
```

### Parameters

| Name       | Type                             | Description                                      |
| ---------- | -------------------------------- | ------------------------------------------------ |
| `ref`      | `RefObject<HTMLElement \| null>` | Ref to the element to detect outside clicks from |
| `callback` | `() => void`                     | Function called when a click outside is detected |

### Example

```tsx
import { useRef, useState } from "react";
import useClickOutside from "src/hooks/useClickOutside";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>
      {isOpen && (
        <div
          ref={ref}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "white",
            border: "1px solid #ccc",
            padding: "1rem",
            zIndex: 100,
          }}
        >
          <p>This is a dropdown. Click outside to close it.</p>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
```

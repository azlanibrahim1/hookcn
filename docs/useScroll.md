# useScroll

Tracks scroll position and provides scroll-related info about the page.

### Installation

```bash
npx hooksy add useScroll
```

### Description

The `useScroll` hook monitors the scroll position of the window and provides detailed information about it, including:

- Current scroll position (`scrollY`)
- Scroll progress in percentage (`scrollPercent`)
- Whether the page is scrolled to the top or bottom
- A helper method to scroll back to the top smoothly

This is useful for triggering animations, showing scroll progress indicators, or rendering "back to top" buttons.

### Usage

```ts
import useScroll from "src/hooks/useScroll";
//...
const { scrollY, scrollPercent, isAtTop, isAtBottom, scrollToTop } = useScroll();
};
```

### Return Value

| Name            | Type         | Description                                        |
| --------------- | ------------ | -------------------------------------------------- |
| `scrollY`       | `number`     | Vertical scroll position in pixels.                |
| `scrollPercent` | `number`     | Percentage of the document that has been scrolled. |
| `isAtTop`       | `boolean`    | Whether the window is at the top of the page.      |
| `isAtBottom`    | `boolean`    | Whether the window is at the bottom of the page.   |
| `scrollToTop`   | `() => void` | Smoothly scrolls the window back to the top.       |

### Example

```typescript
import useScroll from "src/hooks/useScroll";

const ScrollAwareComponent = () => {
  const { scrollY, scrollPercent, isAtTop, isAtBottom, scrollToTop } = useScroll();

  return (
    <div style={{ height: "200vh", padding: "2rem" }}>
      <p>Scroll Y Position: {scrollY}px</p>
      <p>Scroll Percent: {scrollPercent}%</p>

      {isAtTop && <p>You are at the top of the page.</p>}
      {isAtBottom && <p>You are at the bottom of the page.</p>}

      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          padding: "0.5rem 1rem",
          background: "black",
          color: "white",
          borderRadius: "8px",
          display: scrollPercent > 10 ? "block" : "none",
        }}
      >
        Scroll to Top
      </button>
    </div>
  );
};

export default ScrollAwareComponent;
```

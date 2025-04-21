# useBreakpoint

Detects if the current screen size matches mobile, tablet, or desktop breakpoints.

### Installation

```bash
npx use-cli add useBreakpoint
```

### Description

The `useBreakpoint` hook identifies the current screen size based on predefined breakpoints. It returns an object indicating whether the screen matches mobile `<768px`, tablet `768px–1023px`, or desktop `≥1024px` sizes, updating on window resize.

### Usage

```typescript
import useBreakpoint from "src/hooks/useBreakpoint";
//..
const { isMobileSize, isTabletSize, isDesktopSize } = useBreakpoint();
```

### Return Value

| Name            | Type      | Description                                         |
| --------------- | --------- | --------------------------------------------------- |
| `isMobileSize`  | `boolean` | true if width is less than `768px`.                 |
| `isTabletSize`  | `boolean` | true if width is between `768px` and `1023px`.      |
| `isDesktopSize` | `boolean` | true if width is greater than or equal to `1024px`. |

### Example

```typescript
import useBreakpoint from "src/hooks/useBreakpoint";

const ResponsiveComponent = () => {
  const { isMobileSize, isTabletSize, isDesktopSize } = useBreakpoint();

  return (
    <div>
      {isMobileSize && <p>Mobile view</p>}
      {isTabletSize && <p>Tablet view</p>}
      {isDesktopSize && <p>Desktop view</p>}
    </div>
  );
};
```

# useTabSwitchCount

Counts how many times the user has switched away from the browser tab.

### Installation

```bash
npx hookcn add useTabSwitchCount
```

### Description

The `useTabSwitchCount` hook tracks how many times the user switches away from the browser tab by monitoring the document’s visibility state. It increments a counter each time the tab becomes hidden.

### Usage

```typescript
import useTabSwitchCount from "src/hooks/useTabSwitchCount";
//..
const tabSwitchCount = useTabSwitchCount();
```

### Return Value

| Name             | Type     | Description                                                  |
| ---------------- | -------- | ------------------------------------------------------------ |
| `tabSwitchCount` | `number` | The number of times the user has switched away from the tab. |

### Example

```typescript
import useTabSwitchCount from "src/hooks/useTabSwitchCount";

const TabSwitchComponent = () => {
  const tabSwitchCount = useTabSwitchCount();

  return (
    <div>
      <p>Tab switched away: {tabSwitchCount} times</p>
    </div>
  );
};
```

# useCopyToClipboard

Copies a given string to the user's clipboard.

### Installation

```bash
npx use-cli add useCopyToClipboard
```

### Description

The `useCopyToClipboard` hook allows you to copy a string to the clipboard and keeps track of the most recently copied text. It leverages the Clipboard API for seamless and asynchronous clipboard operations.

### Usage

```typescript
import useCopyToClipboard from "src/hooks/useCopyToClipboard";
//..
const { copiedText, copyToClipboard } = useCopyToClipboard();
```

### Return Value

| Name              | Type                      | Description                                 |
| ----------------- | ------------------------- | ------------------------------------------- |
| `copiedText`      | `string`                  | The most recently copied text.              |
| `copyToClipboard` | `(value: string) => void` | Function to copy a string to the clipboard. |

### Example

```typescript
import useCopyToClipboard from "src/hooks/useCopyToClipboard";

const CopyComponent = () => {
  const { copiedText, copyToClipboard } = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard("abc@example.com");
  };

  return (
    <div>
      <button onClick={handleCopy}>Copy Email</button>
      <p>Copied text: {copiedText}</p>
    </div>
  );
};
```

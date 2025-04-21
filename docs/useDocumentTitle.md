# useDocumentTitle

Sets the document's title to the provided string.

### Installation

```bash
npx use-me add useDocumentTitle
```

### Description

The `useDocumentTitle` hook updates the document's title dynamically whenever the provided title changes. It is useful for updating the browser tab title in response to state or prop changes.

### Usage

```typescript
import useDocumentTitle from "src/hooks/useDocumentTitle";
//..
useDocumentTitle("Your New Title");
```

### Parameters

| Name    | Type     | Default value | Description                              |
| ------- | -------- | ------------- | ---------------------------------------- |
| `title` | `string` | -             | The string to set as the document title. |

### Example

```typescript
const App = () => {
  useDocumentTitle("Hoocs");
};

// Or

const changeDocumentTitle = ({ newTitle }: string) => {
  useDocumentTitle(newTitle);
};
```

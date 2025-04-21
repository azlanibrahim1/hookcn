# useTheme

Manages light, dark, and system theme preferences with support for persistence and auto-detection.

### Installation

```bash
npx use-me add useTheme
```

### Description

The `useTheme` hook handles theme preferences for light, dark, or system modes. It saves the user’s choice, applies the selected theme to the document, and updates automatically when the system theme changes if `system` is selected.

### Usage

```typescript
import useTheme from "src/hooks/useTheme";

const { theme, currentTheme, setTheme, toggleTheme } = useTheme("system");

// Force dark
const { theme, currentTheme, setTheme, toggleTheme } = useTheme("dark");
```

### Parameters

| Name           | Type                      | Default value | Description                                                          |
| -------------- | ------------------------- | ------------- | -------------------------------------------------------------------- |
| `defaultTheme` | `light`, `dark`, `system` | `system`      | The initial theme to use. Can be `"light"`, `"dark"`, or `"system"`. |

### Return Value

| Name           | Type                      | Description                                     |
| -------------- | ------------------------- | ----------------------------------------------- |
| `theme`        | `light`, `dark`, `system` | The user's theme preference                     |
| `currentTheme` | `light`, `dark`           | The current applied theme                       |
| `setTheme`     | `(theme: string) => void` | Function to set the theme (Light, dark, system) |
| `toggleTheme`  | `() => void`              | Function to toggle between light and dark mode  |

### Example

```typescript
import useTheme from "src/hooks/useTheme";

const ThemeSwitcher = () => {
  const { theme, currentTheme, setTheme, toggleTheme } = useTheme("system");

  return (
    <div>
      <p>Current Theme: {currentTheme}</p>
      <p>Preference: {theme}</p>
      <button onClick={() => setTheme("light")}>Set Light</button>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme("system")}>Set System</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

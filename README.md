<div align="center">

# hookcn — All your hooks in one command

A CLI tool that instantly copies React hooks into your codebase.

![npm version](https://img.shields.io/npm/v/hookcn.svg)
![downloads](https://img.shields.io/npm/dm/hookcn)
![license](https://img.shields.io/npm/l/hookcn)

<br />

![Cover Image](https://github.com/user-attachments/assets/f59f8103-d669-4478-9505-97566d424aad)

</div>

> **hookcn** started as a personal tool. Now it’s open for everyone. It lets you copy TypeScript React hooks directly into your codebase — no dependencies, full ownership.

<br>

## 🛠 Getting Started

Install the CLI globally:

```bash
npm install -g hookcn
```

> [!TIP]
> You can then run commands using `hookcn`, `hcn`, or `use-hook-cli`.

## ⚙️ Setup

### Step 1: Initialize the Config

```bash
npx hookcn init
```

This creates a `hooks.json` file at your project root:

```json
{
  "destination": "src/hooks"
}
```

This tells the CLI where to place downloaded hooks. You can update it anytime.

### Step 2: Add a Hook

List available hooks from the registry:

```bash
npx hookcn list
```

Install a hook by name:

```bash
npx hookcn add <hook-name>
```

The hook will be copied into the directory defined in `hooks.json` (default: `src/hooks/`).

<br>

## 📚 Documentation

Every hook comes with a markdown file inside the `docs/` folder.

You can also explore all available hooks and their documentation online on [Gitbook](https://azlanibrahim.gitbook.io/hookcn/).

## 🤝 Contributing

Contributions are always welcome — whether it’s new hooks, CLI improvements, or documentation fixes.

Refer to this guide [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

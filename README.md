<div align="center">

# hookcn — All your hooks in one command

A CLI tool that instantly copies React hooks into your codebase.

![npm version](https://img.shields.io/npm/v/hookcn.svg)
![downloads](https://img.shields.io/npm/dm/hookcn)
![license](https://img.shields.io/npm/l/hookcn)

<br />

![Cover Image]()

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

### 🔧 Adding a New Hook

1. Create your hook in `src/hooks/` (e.g., `useMyHook.ts`).
2. Test it locally to make sure it works.
3. Add documentation in `docs/` (you can use `DOCS_TEMPLATE.md` as a starting point).
4. Add your hook to `registry.json` to make it discoverable.
5. Submit a pull request.

> [!IMPORTANT]
> Don't bump the version in package.json for hook additions. The CLI is a separate package and only needs version updates when you make changes to `cli/`

Need more clarity? Check out the `ci.yml` file — it outlines which files/folders are ignored.

### 🛠 Contributing to CLI or Docs

Have ideas to improve the CLI experience or docs structure? Please open an issue or PR — we’d love your input.

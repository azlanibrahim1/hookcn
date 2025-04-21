# Contributing to HookCN

We're glad you're interested in contributing to HookCN!

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

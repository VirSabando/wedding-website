# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Medium Blog Auto Sync

This project can auto-sync the latest 5 Medium posts into the blog section.

### Data source

- Generated file: `src/content/medium-posts.json`
- Sync script: `scripts/sync-medium-posts.mjs`

### Run locally

```bash
npm run sync:medium
```

You can override the feed URL if needed:

```bash
MEDIUM_FEED_URL="https://medium.com/feed/@virsabando" npm run sync:medium
```

### Automation

- Workflow: `.github/workflows/sync-medium-posts.yml`
- Runs daily and can also be triggered manually.
- Set repository variable `MEDIUM_FEED_URL` for your profile feed.

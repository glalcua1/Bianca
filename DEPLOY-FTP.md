# FTP Deployment Guide

## Quick start

**Upload only the contents of the `dist/` folder** — nothing else.

```
dist/
├── index.html
└── assets/          ← upload this folder too
```

## Do NOT upload

| Folder/File  | Size  | Why skip |
|--------------|-------|----------|
| `node_modules/` | ~386 MB | Build dependencies, not needed on server |
| `.git/` | ~31 MB | Version control, not needed |
| `src/` | ~600 KB | Source code, already compiled in dist |
| `public/` | ~34 MB | Images bundled into dist/assets/ |
| `dist/` root PNGs | — | Removed; images are in dist/assets/ |

## Steps

1. Run `npm run build` to generate `dist/`
2. Upload everything **inside** `dist/` to your web root (e.g. `public_html/` or `www/`)
3. Ensure `index.html` and the `assets/` folder are at the same level

## Create a deploy zip (optional)

```bash
cd dist && zip -r ../bianca-deploy.zip . && cd ..
```

Then upload `bianca-deploy.zip` and extract it on the server.

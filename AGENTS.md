# AGENTS.md

## Cursor Cloud specific instructions

### What this is
Bianca Diamonds — a single Vite + React (TypeScript) SPA for a lab-grown diamond jewellery brand. There is one service: the Vite dev server. API endpoints (`/api/*`) are served in-process by Vite plugins (see `server/vite-*-api-plugin.js`), not a separate backend. Standard commands live in `package.json` and `README.md`.

### Running / lint / build / test
- Run (dev): `npm run dev` — serves the SPA and the `/api/*` endpoints on `http://localhost:5173` (port is `strictPort`, host `0.0.0.0`).
- Lint: `npm run lint`.
- Build: `npm run build` (runs image optimization via `sharp`, then `vite build`, then asset verification).
- There is no automated test suite; validate changes via the dev server and lint/build.

### Non-obvious caveats
- `npm run lint` currently reports 3 pre-existing errors in `scripts/optimize-public-images.mjs` (`no-unused-vars`) plus warnings. These are unrelated to environment setup — treat a clean run of your own changes as the bar, not zero total problems.
- The consultation lead form persists to a local SQLite DB at `database/consultation_leads.db` (auto-created on first API call by `server/db.js`; gitignored). After writing the lead, the UI redirects to WhatsApp — this is expected behaviour, not an error.
- `native modules`: `better-sqlite3` and `sharp` are compiled during `npm install`; if the DB or build fails, reinstall to rebuild them.
- Optional Golden Ratio AI feature: needs a Python venv (`npm run setup:golden-ratio`) and a `GEMINI_API_KEY` in `.env` (see `.env.example`). Not required to run/browse the site; the app falls back gracefully without it.
- iOS/Capacitor (`cap:*` scripts) require macOS/Xcode and are out of scope in the Linux cloud VM.

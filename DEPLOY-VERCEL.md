# Vercel Deployment Guide

## Live URLs

| Environment | URL |
|-------------|-----|
| Production (alias) | https://biancadiamonds.vercel.app |
| Custom domain | https://www.biancadiamonds.com |
| Vercel dashboard | https://vercel.com/gauravlal-6528s-projects/bianca |

## Project

| Setting | Value |
|---------|-------|
| Project name | `bianca` |
| Team / scope | `gauravlal-6528s-projects` |
| Framework | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 24.x |
| Git remote | `https://github.com/glalcua1/Bianca.git` (branch `main`) |

Project is linked via `.vercel/project.json` (do not commit `.vercel/` — it is gitignored).

---

## Quick deploy (recommended)

From the project root:

```bash
# 1. Commit any local changes first
git status
git add <files>
git commit -m "Your message"

# 2. Install Vercel CLI locally (if not already present)
NPM_CONFIG_CACHE=/tmp/npm-cache-bianca npm install vercel@54.9.1 --no-save

# 3. Deploy to production
./node_modules/.bin/vercel deploy --prod --yes
```

This uploads source, builds on Vercel, and promotes to production. Typical runtime: ~1 minute.

---

## Alternative: prebuilt deploy (smaller upload)

Use when the full source upload is slow or blocked:

```bash
NPM_CONFIG_CACHE=/tmp/npm-cache-bianca npm install vercel@54.9.1 --no-save
./node_modules/.bin/vercel pull --yes --environment=production
npm run build
./node_modules/.bin/vercel build --prod --yes
./node_modules/.bin/vercel deploy --prebuilt --prod --yes
```

**Note:** `vercel build` runs `npm install` and may remove the locally installed `vercel` package. Re-install it before `vercel deploy` if that step fails.

---

## Git push (auto-deploy)

If Vercel Git integration is connected, pushing to `main` triggers a deployment:

```bash
git push origin main
```

**Credential requirement:** pushes must use the `glalcua1` GitHub account. This environment may be authenticated as `UXDRG`, which causes:

```
remote: Permission to glalcua1/Bianca.git denied to UXDRG.
```

Run `git push` from a machine/session logged in as `glalcua1` to sync GitHub.

---

## Known issues

| Issue | Fix |
|-------|-----|
| `npx vercel` fails with `TAR_ENTRY_ERROR` / `spawn sh ENOENT` | Use a fresh cache: `NPM_CONFIG_CACHE=/tmp/npm-cache-bianca npm install vercel@54.9.1 --no-save`, then `./node_modules/.bin/vercel` |
| `vercel build` fails with `Cannot find module './data/libFiles'` | Skip local `vercel build`; use direct `vercel deploy --prod --yes` instead |
| GitHub push denied | Deploy via Vercel CLI (above); sync GitHub separately with correct credentials |

---

## Latest production deployment

| Field | Value |
|-------|-------|
| Date | 2026-06-06 |
| Commit | `3c524b0` — Refresh atelier catalogue and bespoke enquiry layout |
| Deployment URL | https://bianca-9mu0zpjjn-gauravlal-6528s-projects.vercel.app |
| Inspect | https://vercel.com/gauravlal-6528s-projects/bianca/2G78KeDZwLYXbQGCv7pnsrFGxMN2 |
| Deployment ID | `dpl_2G78KeDZwLYXbQGCv7pnsrFGxMN2` |

**Included in that deploy:**
- New ring, earring, and bracelet atelier pieces
- Cream-well image sorting in the atelier grid
- Bespoke enquiry section with sketch-led layout
- Cannes hero and earlier bespoke changes from commits `0b5ea46`, `9e1fa61`

---

## Verify after deploy

```bash
./node_modules/.bin/vercel inspect biancadiamonds.vercel.app
```

Or open the inspect URL from the deploy output in the Vercel dashboard.

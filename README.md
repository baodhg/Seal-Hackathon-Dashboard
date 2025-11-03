# SEAL HACKATHON – Realtime Commit Dashboard

A realtime dashboard that visualizes Git commit activities from hackathon teams. It features a neon/cyberpunk theme, per-hour heatmap, repo highlighting when new commits arrive, and a countdown clock.

---

## Tech Stack
- React 19 + Vite 7
- React Router 7
- Tailwind CSS 3
- Firebase Realtime Database
- Framer Motion (animation)

## Prerequisites
- Node.js 18+ (20+ recommended)
- npm 9+

---

## Getting Started

1) Install dependencies
```bash
npm install
```

2) Configure environment variables
- Create a `.env` file at the project root (use `.env.template` as a reference).
- Required variables:
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```
Get these values from Firebase Console → Project settings → Your apps (Web app).

3) Run in development
```bash
npm run dev
```
Default URL: http://localhost:5173/

4) Build and preview production
```bash
npm run build
npm run preview
```

---

## Project Structure
```text
Seal-Hackathon-Dashboard/
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
├─ process-commit.json                # original n8n export (kept for compatibility)
├─ docs/
│  ├─ images/                         # documentation images
│  │  ├─ dashboard.png
│  │  ├─ start_frame.png
│  │  ├─ workflows.png
│  │  ├─ animation.png
│  │  └─ workflow_summary.png
│  └─ workflows/
│     └─ process-commit.json          # curated copy of n8n workflow export
├─ README.md
├─ index.html
├─ src/
│  ├─ main.jsx                  # React entrypoint
│  ├─ index.css                 # Global styles + Tailwind
│  ├─ App.jsx                   # App component (renders routes)
│  ├─ common/
│  │  └─ path.js               # Route path definitions
│  ├─ hooks/
│  │  ├─ useRealtimeCommits.js
│  │  └─ useRootesCoustom.jsx  # Route configuration via react-router
│  ├─ pages/
│  │  └─ HomePage.jsx          # Main page (effects + commit board)
│  ├─ components/
│  │  ├─ CommitBoard/CommitBoard.jsx
│  │  ├─ MainHeader/MainHeader.jsx
│  │  ├─ CountdownClock.jsx
│  │  └─ PageNotFound/PageNotFound.jsx
│  ├─ service/
│  │  ├─ realtimeManager.js    # Provider abstraction
│  │  └─ realtimeProviders/
│  │     └─ firebaseProvider.js # Listen to commits from Firebase
│  ├─ template/
│  │  └─ MainTemplate/MainTemplate.jsx
│  └─ utils/
│     └─ converCommitToHeapmap.js
└─ .env.template                # Example env variables (safe to commit)
```

---

## Backend (n8n) – Overview & How to Run

This project uses n8n for the backend. The workflow(s) are exported to JSON and can be imported directly into n8n.

### What the backend does
- Receives or pulls commit events
- Normalizes and maps them to the dashboard schema
- Writes to Firebase Realtime Database at the `commit` path

### Quick start (Node.js, no Docker)
1) Install n8n globally or locally
```bash
npm install -g n8n   # or: npm install n8n && npx n8n
```
2) Run n8n
```bash
n8n
```
Open http://localhost:5678

3) Import the workflow
- n8n UI → Workflows → Import → choose one of:
  - `docs/workflows/process-commit.json` (curated copy)
  - `process-commit.json` (original export)

4) Configure credentials/env in n8n as needed (e.g., Firebase keys)

### Using Docker (optional)
```bash
docker run -it --rm \
  -p 5678:5678 \
  -e N8N_HOST=localhost \
  -e N8N_PORT=5678 \
  -e N8N_PROTOCOL=http \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n:latest
```

### Workflow screenshots
- Overall dashboard
  ![Dashboard](docs/images/dashboard.png)

- Start frame
  ![Start Frame](docs/images/start_frame.png)

- Workflow list
  ![Workflows](docs/images/workflows.png)

- Animation overview
  ![Animation](docs/images/animation.png)

- Workflow summary
  ![Workflow Summary](docs/images/workflow_summary.png)

---

## Firebase Notes
- Minimum required: `VITE_FIREBASE_PROJECT_ID` and `VITE_FIREBASE_DATABASE_URL`.
- Ensure Realtime Database rules allow reading at the path you use (default in code: `commit`).
- If you see “Can't determine Firebase Database URL…”, verify `.env` values and restart `npm run dev`.

---

## Available Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint (if configured)

---

## Troubleshooting
- Blank page: check the browser Console for Firebase/env errors. Make sure `.env` is filled correctly and restart the dev server.
- CSS error “@import must precede …”: the `@import` Google Fonts line must appear before all `@tailwind` directives in `src/index.css`.
- No data: confirm your Realtime Database contains data at the `commit` path and that `databaseURL`/project settings are correct.

---

Made with ❤️ for SEAL Hackathon.


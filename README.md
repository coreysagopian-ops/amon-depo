# AMON Demo

**Agent Trust Infrastructure — Interactive Demo**  
R&D Session 1 // March 2026

---

## What This Is

A 30-second interactive demo showing why agent-to-agent interactions need a trust layer. Split-screen: two AI agents interact in real time. Same interaction shown twice — once without Amon (rejected), once with Amon (routed through). The contrast tells the story.

- No database. No auth. No LLM calls.
- One project, one port, one `npm start`.
- Real API calls visible in the browser Network tab during Act 2.

---

## Local Development

```bash
npm install
npm start
```

Opens at `http://localhost:3000`

For hot-reload dev mode (frontend on 5173, backend on 3000):

```bash
npm run dev
```

---

## Deploy to a Live URL

### Option 1 — Railway (fastest, recommended)

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select the repo — Railway auto-detects Node.js
4. Set the start command to `npm start` if not auto-detected
5. Done. Live URL in ~2 minutes.

No environment variables needed. No config files needed.

### Option 2 — Render

1. Push to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect repo
4. Build command: `npm install && npm run build`
5. Start command: `node dist/server.js`
6. Done.

### Option 3 — Fly.io

```bash
npm install -g flyctl
flyctl launch
flyctl deploy
```

Fly auto-detects the Node app. Accept defaults.

---

## API Endpoints

Both endpoints return hardcoded data. They exist so the Network tab shows real calls.

### `GET /api/registry/query?agentId=amon://contractly/sdr-v3`

```json
{
  "verified": true,
  "entity": "Contractly Inc.",
  "agentId": "amon://contractly/sdr-v3",
  "trustScore": 87,
  "percentile": 12,
  "interactions": 2341,
  "responseRate": 0.94,
  "category": "contract_management",
  "categoryMatch": true,
  "activeEvaluation": "Contract Management",
  "recommendation": "ROUTE_TO_HUMAN",
  "issuedAt": "<timestamp>"
}
```

### `POST /api/interact`

Request: `{ "agentId": "...", "target": "...", "hasCredential": true | false }`

Response (with credential): `{ "status": "routed", "routedTo": "Sarah Chen, Procurement" }`  
Response (without credential): `{ "status": "rejected" }`

---

## File Structure

```
amon-demo/
├── src/
│   ├── server.ts                       # Express — API routes + static serving
│   ├── shared/
│   │   └── types.ts                    # Shared TypeScript types
│   └── client/
│       ├── index.tsx                   # React entry point
│       ├── index.html                  # Vite HTML shell
│       ├── App.tsx                     # Root component
│       ├── styles.css                  # Full design system
│       ├── components/
│       │   ├── DemoRunner.tsx          # State machine — drives all demo logic
│       │   ├── AgentPanel.tsx          # Single agent panel with log output
│       │   ├── LogLine.tsx             # Animated log line
│       │   ├── TrustPassport.tsx       # Amon Trust Passport card
│       │   ├── RegistryResponse.tsx    # Amon Registry Response card
│       │   └── EndScreen.tsx          # Final branding screen
│       └── data/
│           ├── withoutAmon.ts          # Act 1 timed event sequence
│           └── withAmon.ts             # Act 2 timed event sequence
├── package.json
├── tsconfig.json
├── tsconfig.client.json
├── vite.config.ts
└── README.md
```

---

## Notes

- Font: JetBrains Mono + Syne, loaded from Google Fonts. In restricted network environments the fallback is system monospace — visually functional but less polished.
- Total demo runtime: Act 1 ~15s, Act 2 ~13s, end screen holds until Reset.
- The Reset button clears all timers and restores initial state cleanly.

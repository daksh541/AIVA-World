# AIVA World - Frontend & Backend

Modern Vite + React (TypeScript) frontend styled with Tailwind & shadcn/ui, now backed by an Express + MongoDB API.

## Stack

- Frontend: Vite, React 19, TypeScript, Tailwind CSS, shadcn/ui, Zustand, TanStack Query, Framer Motion
- Backend: Node.js, Express, MongoDB (Mongoose), JWT auth, bcrypt

## Project Structure

```
/src          → React application
/server       → Express API
/.env.example → Frontend environment template
/server/.env.example → Backend environment template
```

## Frontend

```bash
pnpm install
cp .env.example .env        # optional, override API URL
pnpm run dev                # http://localhost:5173
pnpm run build              # production build
```

Key files:

- `src/App.tsx` – app shell + routing
- `src/lib/api.ts` – API helper (respects `VITE_API_URL`)
- `src/lib/store.ts` – auth & avatar Zustand stores (persisted auth)
- `src/components/**` / `src/pages/**` – UI

## Backend

```bash
cd server
npm install
cp .env.example .env        # set MONGODB_URI & JWT_SECRET
npm run dev                 # http://localhost:5000
```

Routes:

- `POST /api/auth/signup` – create user, returns JWT + profile
- `POST /api/auth/login` – authenticate
- `GET  /api/auth/me` – fetch profile (Bearer token)
- `GET  /api/avatars` – list seeded avatars
- `POST /api/avatars` – create avatar (protected)

> MongoDB must be running locally or reachable via `MONGODB_URI`.

## Environment Variables

Frontend `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

Backend `.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aiva_world
JWT_SECRET=super-secret-key
CLIENT_ORIGIN=http://localhost:5173
```

## Connecting Frontend & Backend

1. Start MongoDB (`mongod`).
2. Run the backend (`npm run dev` inside `server/`).
3. Run the frontend (`pnpm run dev` from project root).
4. Ensure `VITE_API_URL` matches the backend URL (default `http://localhost:5000/api`).

Auth modals now call the API, persist JWT + profile, and Community avatars hydrate from the database (with graceful fallback data if the API is unavailable).

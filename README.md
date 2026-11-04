# Irya Web

Frontend application for Minha Irya.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

## Requirements

- Node.js 20+
- npm

## Environment Variables

### Development (`.env.development`)

```env
VITE_API_URL=http://localhost:3001
```

### Production (`.env.production`)

```env
VITE_API_URL=https://irya-api-production.up.railway.app
```

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Default local URL: `http://localhost:5173`.

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Project Structure

- `src/pages`: route-level pages (`Login`, `Cadastro`, `Home`, `Questionario`, `Resultado`)
- `src/components`: reusable UI components
- `src/hooks`: reusable hooks
- `src/utils`: helpers (phone formatting, session, API errors)
- `src/api.ts`: Axios client config

## Authentication and API

- JWT is stored in local session utilities.
- Axios automatically sends `Authorization: Bearer <token>` when available.
- Make sure the API CORS allowlist includes your frontend domain.

## Deployment Notes

Version 0.1.1 formats Portal dates in `America/Sao_Paulo`, independently of the
device timezone. Calendar values (`YYYY-MM-DD`) preserve their day; missing or
invalid values display `-`. This changes presentation, without rewriting saved dates.
Validation: `npm test` (6 tests), `npm run lint`, `npm run build`.

- For Vercel, keep SPA rewrite in `vercel.json`:
  - `/(.*) -> /`
- Set `VITE_API_URL` in your hosting environment (do not rely only on local `.env.production`).


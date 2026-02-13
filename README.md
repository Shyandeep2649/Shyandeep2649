# WorkTrack X — Precision in Every Presence

A futuristic command-center web app for smart attendance and cash intelligence.

## Stack
- Next.js + TypeScript
- Tailwind CSS + Framer Motion + Recharts
- Prisma + PostgreSQL schema
- JWT auth scaffold

## Quick Start
```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

## What changed for new users
- Removed all hardcoded/mock dashboard values
- Dashboard now resolves from live database aggregates
- Fresh install shows clean empty states until real attendance/cash records are added

## Next Build Steps
- Connect attendance and cashbook forms to write APIs
- Add role-based guards in middleware
- Implement export to PDF/Excel
- Add PWA manifest/service worker and offline caching

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

## Features Implemented
- Dark futuristic dashboard with glowing glassmorphism cards
- Sidebar navigation: Dashboard, Attendance, Cashbook, Reports, Staff, Settings
- Attendance and cashbook module scaffolds
- Smart alerts panel and analytics charts
- JWT login API scaffold and core API endpoints
- Prisma schema for users, staff, attendance, and transactions

## Next Build Steps
- Connect forms to API and persistence
- Add role-based guards in middleware
- Implement export to PDF/Excel
- Add PWA manifest/service worker and offline caching

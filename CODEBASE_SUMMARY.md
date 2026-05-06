# Amex Card Business Dashboard — Repo Summary

## Purpose

Next.js demo app: American Express card business leadership view (KPIs, products, segments, transactions, network, revenue). **Mock data only** — no production APIs or databases.

## Stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS, OpenLayers (network map), lucide-react

## Layout

- **UI**: `app/layout.tsx` — shell with sidebar and header; pages under `app/` (dashboard, card-products, segments, transactions, network, revenue).
- **API**: `app/api/card-business/*` — route handlers backed by `lib/card-business/mock-data.ts`.
- **Components**: `components/card-business/` — navigation, metrics, charts, and shared shell pieces.

## Notes

- No authentication or persistence in this demo.
- Run locally with `pnpm dev` (see `README.md`).

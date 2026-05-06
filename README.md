# American Express — Card Business Leadership Dashboard

A Next.js demo application for an executive / leadership view of American Express card business KPIs: cards in force, billed business, revenue, products, segments, transaction analytics, global network, and revenue mix.

## Features

- **Executive dashboard**: Cards in force, billed business (TTM), total revenue, net income, YoY trends, recent activity
- **Card products**: Tier filters, acquisitions trend, spend and revenue contribution by product
- **Business segments**: U.S. Consumer, Small Business, Commercial, International — revenue, cards, billed business
- **Transaction analytics**: Volume, authorization rate, fraud/disputes, cross-border share, recent transactions
- **Global network**: Regional merchants, volume, indicative share, schematic footprint
- **Revenue breakdown**: Discount revenue, net interest, fees, travel commissions — composition and YoY

## Getting Started

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/` — App Router pages and API route handlers
- `components/card-business/` — Dashboard shell, metrics, recent activity
- `lib/card-business/` — Types and mock data for the card business domain

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

/**
 * American Express card business leadership dashboard — mock data & types
 */

export type CardTier = 'platinum' | 'gold' | 'green' | 'blue' | 'cobrand';

export type CardTransactionType = 'purchase' | 'return' | 'cash-advance';

export type CardTransactionStatus = 'approved' | 'declined' | 'flagged';

export type RevenueCategory =
  | 'discount-revenue'
  | 'net-interest'
  | 'card-fees'
  | 'travel-commissions'
  | 'other';

export interface CardProduct {
  id: string;
  name: string;
  tier: CardTier;
  cardsInForce: number;
  avgSpendPerCard: number;
  annualFee: number;
  acquisitionsThisQuarter: number;
  attritionRate: number;
  revenueContribution: number;
}

export interface BusinessSegment {
  id: string;
  name: string;
  revenue: number;
  cardsInForce: number;
  billedBusiness: number;
  yoyGrowth: number;
}

export interface CardTransaction {
  id: string;
  type: CardTransactionType;
  amount: number;
  merchantCategory: string;
  region: string;
  status: CardTransactionStatus;
  timestamp: string;
}

export interface TransactionMetrics {
  totalVolume: number;
  authorizationRate: number;
  fraudRate: number;
  disputeRate: number;
  crossBorderPct: number;
  avgTransactionSize: number;
}

export interface NetworkRegion {
  id: string;
  region: string;
  merchantCount: number;
  transactionVolume: number;
  marketSharePct: number;
  latitude: number;
  longitude: number;
}

export interface RevenueStream {
  id: string;
  category: RevenueCategory;
  label: string;
  amount: number;
  yoyChange: number;
  pctOfTotal: number;
}

export interface ExecutiveOverview {
  cardsInForce: number;
  billedBusiness: number;
  totalRevenue: number;
  netIncome: number;
  yoyCardsGrowth: number;
  yoyBilledBusinessGrowth: number;
  yoyTotalRevenueGrowth: number;
  yoyNetIncomeGrowth: number;
  lastUpdated: string;
}

export interface AcquisitionTrendPoint {
  month: string;
  acquisitions: number;
}

const now = new Date().toISOString();

export const mockExecutiveOverview: ExecutiveOverview = {
  cardsInForce: 148_200_000,
  billedBusiness: 1_420_000_000_000,
  totalRevenue: 60_500_000_000,
  netIncome: 8_300_000_000,
  yoyCardsGrowth: 4.2,
  yoyBilledBusinessGrowth: 7.8,
  yoyTotalRevenueGrowth: 9.4,
  yoyNetIncomeGrowth: 11.2,
  lastUpdated: now,
};

export const mockCardProducts: CardProduct[] = [
  {
    id: 'cp-platinum',
    name: 'The Platinum Card',
    tier: 'platinum',
    cardsInForce: 3_200_000,
    avgSpendPerCard: 42_500,
    annualFee: 695,
    acquisitionsThisQuarter: 118_000,
    attritionRate: 2.1,
    revenueContribution: 8_900_000_000,
  },
  {
    id: 'cp-gold',
    name: 'American Express Gold Card',
    tier: 'gold',
    cardsInForce: 8_100_000,
    avgSpendPerCard: 18_200,
    annualFee: 325,
    acquisitionsThisQuarter: 312_000,
    attritionRate: 3.4,
    revenueContribution: 6_200_000_000,
  },
  {
    id: 'cp-green',
    name: 'American Express Green Card',
    tier: 'green',
    cardsInForce: 1_950_000,
    avgSpendPerCard: 12_400,
    annualFee: 150,
    acquisitionsThisQuarter: 64_000,
    attritionRate: 4.0,
    revenueContribution: 1_100_000_000,
  },
  {
    id: 'cp-blue-cash',
    name: 'Blue Cash Preferred',
    tier: 'blue',
    cardsInForce: 12_400_000,
    avgSpendPerCard: 9_800,
    annualFee: 95,
    acquisitionsThisQuarter: 890_000,
    attritionRate: 5.2,
    revenueContribution: 4_800_000_000,
  },
  {
    id: 'cp-delta-plat',
    name: 'Delta SkyMiles Platinum',
    tier: 'cobrand',
    cardsInForce: 2_800_000,
    avgSpendPerCard: 22_100,
    annualFee: 350,
    acquisitionsThisQuarter: 142_000,
    attritionRate: 3.8,
    revenueContribution: 2_400_000_000,
  },
  {
    id: 'cp-hilton-aspire',
    name: 'Hilton Honors Aspire',
    tier: 'cobrand',
    cardsInForce: 1_100_000,
    avgSpendPerCard: 28_600,
    annualFee: 550,
    acquisitionsThisQuarter: 48_000,
    attritionRate: 2.9,
    revenueContribution: 1_650_000_000,
  },
  {
    id: 'cp-business-plat',
    name: 'Business Platinum Card',
    tier: 'platinum',
    cardsInForce: 1_850_000,
    avgSpendPerCard: 56_200,
    annualFee: 695,
    acquisitionsThisQuarter: 52_000,
    attritionRate: 2.4,
    revenueContribution: 3_100_000_000,
  },
  {
    id: 'cp-blue-business',
    name: 'Blue Business Plus',
    tier: 'blue',
    cardsInForce: 4_200_000,
    avgSpendPerCard: 31_500,
    annualFee: 0,
    acquisitionsThisQuarter: 210_000,
    attritionRate: 4.6,
    revenueContribution: 1_900_000_000,
  },
];

export const mockBusinessSegments: BusinessSegment[] = [
  {
    id: 'seg-us-consumer',
    name: 'U.S. Consumer',
    revenue: 28_400_000_000,
    cardsInForce: 72_000_000,
    billedBusiness: 680_000_000_000,
    yoyGrowth: 6.1,
  },
  {
    id: 'seg-small-business',
    name: 'Small Business',
    revenue: 14_200_000_000,
    cardsInForce: 18_500_000,
    billedBusiness: 410_000_000_000,
    yoyGrowth: 9.4,
  },
  {
    id: 'seg-commercial',
    name: 'Global Commercial Services',
    revenue: 12_800_000_000,
    cardsInForce: 4_200_000,
    billedBusiness: 245_000_000_000,
    yoyGrowth: 5.8,
  },
  {
    id: 'seg-international',
    name: 'International Card Services',
    revenue: 5_100_000_000,
    cardsInForce: 53_500_000,
    billedBusiness: 85_000_000_000,
    yoyGrowth: 11.2,
  },
];

export const mockTransactionMetrics: TransactionMetrics = {
  totalVolume: 412_000_000_000,
  authorizationRate: 97.4,
  fraudRate: 0.09,
  disputeRate: 0.42,
  crossBorderPct: 18.6,
  avgTransactionSize: 118.5,
};

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
}

export const mockTransactions: CardTransaction[] = [
  { id: 'txn-1', type: 'purchase', amount: 1_240.5, merchantCategory: 'Airlines', region: 'North America', status: 'approved', timestamp: hoursAgo(0.5) },
  { id: 'txn-2', type: 'purchase', amount: 86.2, merchantCategory: 'Restaurants', region: 'Europe', status: 'approved', timestamp: hoursAgo(1) },
  { id: 'txn-3', type: 'purchase', amount: 3_420.0, merchantCategory: 'Hotels', region: 'Asia Pacific', status: 'flagged', timestamp: hoursAgo(2) },
  { id: 'txn-4', type: 'return', amount: 199.99, merchantCategory: 'Retail', region: 'North America', status: 'approved', timestamp: hoursAgo(3) },
  { id: 'txn-5', type: 'purchase', amount: 12_500.0, merchantCategory: 'Professional Services', region: 'North America', status: 'approved', timestamp: hoursAgo(5) },
  { id: 'txn-6', type: 'purchase', amount: 54.0, merchantCategory: 'E-commerce', region: 'Latin America', status: 'declined', timestamp: hoursAgo(8) },
  { id: 'txn-7', type: 'cash-advance', amount: 500.0, merchantCategory: 'ATM', region: 'North America', status: 'approved', timestamp: hoursAgo(12) },
  { id: 'txn-8', type: 'purchase', amount: 2_180.75, merchantCategory: 'Travel & Entertainment', region: 'Europe', status: 'approved', timestamp: hoursAgo(18) },
  { id: 'txn-9', type: 'purchase', amount: 320.0, merchantCategory: 'Healthcare', region: 'North America', status: 'approved', timestamp: hoursAgo(24) },
  { id: 'txn-10', type: 'purchase', amount: 89.5, merchantCategory: 'Restaurants', region: 'Asia Pacific', status: 'approved', timestamp: hoursAgo(30) },
];

export const mockNetworkRegions: NetworkRegion[] = [
  { id: 'net-na', region: 'North America', merchantCount: 12_400_000, transactionVolume: 215_000_000_000, marketSharePct: 24.8, latitude: 39.8283, longitude: -98.5795 },
  { id: 'net-eu', region: 'Europe', merchantCount: 8_200_000, transactionVolume: 98_000_000_000, marketSharePct: 18.2, latitude: 50.1109, longitude: 8.6821 },
  { id: 'net-apac', region: 'Asia Pacific', merchantCount: 15_100_000, transactionVolume: 72_000_000_000, marketSharePct: 14.6, latitude: 22.3193, longitude: 114.1694 },
  { id: 'net-latam', region: 'Latin America', merchantCount: 3_600_000, transactionVolume: 18_500_000_000, marketSharePct: 9.1, latitude: -15.7939, longitude: -47.8828 },
  { id: 'net-mea', region: 'Middle East & Africa', merchantCount: 2_100_000, transactionVolume: 8_500_000_000, marketSharePct: 6.4, latitude: 25.2048, longitude: 55.2708 },
];

const revenueTotal = 60_500_000_000;

export const mockRevenueStreams: RevenueStream[] = [
  { id: 'rev-1', category: 'discount-revenue', label: 'Discount revenue', amount: 32_800_000_000, yoyChange: 8.1, pctOfTotal: (32_800_000_000 / revenueTotal) * 100 },
  { id: 'rev-2', category: 'net-interest', label: 'Net interest income', amount: 12_400_000_000, yoyChange: 12.4, pctOfTotal: (12_400_000_000 / revenueTotal) * 100 },
  { id: 'rev-3', category: 'card-fees', label: 'Card & other fees', amount: 9_200_000_000, yoyChange: 5.6, pctOfTotal: (9_200_000_000 / revenueTotal) * 100 },
  { id: 'rev-4', category: 'travel-commissions', label: 'Travel & lifestyle commissions', amount: 4_800_000_000, yoyChange: 15.2, pctOfTotal: (4_800_000_000 / revenueTotal) * 100 },
  { id: 'rev-5', category: 'other', label: 'Other revenue', amount: 1_300_000_000, yoyChange: 3.1, pctOfTotal: (1_300_000_000 / revenueTotal) * 100 },
];

export const mockAcquisitionTrend: AcquisitionTrendPoint[] = [
  { month: 'Jul', acquisitions: 1_420_000 },
  { month: 'Aug', acquisitions: 1_510_000 },
  { month: 'Sep', acquisitions: 1_480_000 },
  { month: 'Oct', acquisitions: 1_620_000 },
  { month: 'Nov', acquisitions: 1_690_000 },
  { month: 'Dec', acquisitions: 1_740_000 },
];

// --- Accessors (read-only copies) ---

export function getExecutiveOverview(): ExecutiveOverview {
  return { ...mockExecutiveOverview, lastUpdated: new Date().toISOString() };
}

export function getCardProducts(): CardProduct[] {
  return mockCardProducts.map((p) => ({ ...p }));
}

export function getCardProduct(id: string): CardProduct | undefined {
  return mockCardProducts.find((p) => p.id === id);
}

export function getBusinessSegments(): BusinessSegment[] {
  return mockBusinessSegments.map((s) => ({ ...s }));
}

export function getTransactionMetrics(): TransactionMetrics {
  return { ...mockTransactionMetrics };
}

export function getTransactions(): CardTransaction[] {
  return mockTransactions.map((t) => ({ ...t }));
}

export function getNetworkRegions(): NetworkRegion[] {
  return mockNetworkRegions.map((r) => ({ ...r }));
}

export function getRevenueStreams(): RevenueStream[] {
  return mockRevenueStreams.map((r) => ({ ...r }));
}

export function getAcquisitionTrend(): AcquisitionTrendPoint[] {
  return mockAcquisitionTrend.map((p) => ({ ...p }));
}

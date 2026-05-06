import { NextResponse } from 'next/server';
import { getTransactionMetrics, getTransactions } from '@/lib/card-business/mock-data';

export async function GET() {
  try {
    return NextResponse.json({
      metrics: getTransactionMetrics(),
      transactions: getTransactions(),
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

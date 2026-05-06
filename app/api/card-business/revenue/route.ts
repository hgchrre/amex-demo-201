import { NextResponse } from 'next/server';
import { getRevenueStreams } from '@/lib/card-business/mock-data';

export async function GET() {
  try {
    return NextResponse.json({ revenueStreams: getRevenueStreams() });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch revenue streams' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getExecutiveOverview } from '@/lib/card-business/mock-data';

export async function GET() {
  try {
    return NextResponse.json({ overview: getExecutiveOverview() });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch executive overview' }, { status: 500 });
  }
}

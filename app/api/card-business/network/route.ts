import { NextResponse } from 'next/server';
import { getNetworkRegions } from '@/lib/card-business/mock-data';

export async function GET() {
  try {
    return NextResponse.json({ regions: getNetworkRegions() });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch network regions' }, { status: 500 });
  }
}

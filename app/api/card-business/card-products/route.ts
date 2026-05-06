import { NextResponse } from 'next/server';
import { getAcquisitionTrend, getCardProducts } from '@/lib/card-business/mock-data';

export async function GET() {
  try {
    return NextResponse.json({
      cardProducts: getCardProducts(),
      acquisitionTrend: getAcquisitionTrend(),
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch card products' }, { status: 500 });
  }
}

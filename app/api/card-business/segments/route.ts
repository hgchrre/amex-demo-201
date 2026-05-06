import { NextResponse } from 'next/server';
import { getBusinessSegments } from '@/lib/card-business/mock-data';

export async function GET() {
  try {
    return NextResponse.json({ segments: getBusinessSegments() });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch business segments' }, { status: 500 });
  }
}

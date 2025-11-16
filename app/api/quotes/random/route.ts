import { NextResponse } from 'next/server';
import { Quote } from '@/types/quote';
import quotesData from '@/data/quotes.json';

// Singleton pattern: cache quotes in memory to avoid re-parsing JSON on every request
let cachedQuotes: Quote[] | null = null;

function getQuotes(): Quote[] {
  if (!cachedQuotes) {
    cachedQuotes = quotesData as Quote[];
  }
  return cachedQuotes;
}

// Force dynamic rendering - prevent static optimization
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const quotes = getQuotes();

    if (!quotes || quotes.length === 0) {
      return NextResponse.json(
        { error: 'No quotes available' },
        { status: 500 }
      );
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Return response with no-cache headers to prevent caching
    return NextResponse.json(randomQuote, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error fetching random quote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { Quote } from '@/types/quote';
import quotesData from '@/data/quotes.json';

const quotes: Quote[] = quotesData;

export async function GET() {
  try {
    if (!quotes || quotes.length === 0) {
      return NextResponse.json(
        { error: 'No quotes available' },
        { status: 500 }
      );
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    return NextResponse.json(randomQuote);
  } catch (error) {
    console.error('Error fetching random quote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}

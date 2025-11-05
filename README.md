# ✨ Quote of the Day - Next.js Web App

A beautiful, modern web application that displays inspiring quotes. Features smooth animations, dark/light mode, auto-refresh, and a stunning glassmorphism design.

**By Davis & Claude** 🚀

## 🌟 Features

- ✨ **Beautiful Modern UI** - Glassmorphism design with animated gradient backgrounds
- 🌓 **Dark/Light Mode** - Toggle between themes with smooth transitions and localStorage persistence
- 🔄 **Auto-Refresh** - Quotes automatically refresh every 5 minutes
- 🎯 **Manual Refresh** - Click the refresh button for instant new quotes with smooth animations
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Lightning Fast** - Built with Next.js 14 App Router and TypeScript
- 🎨 **Smooth Animations** - Fade-in/fade-out transitions for quote changes
- 💯 **100 Inspirational Quotes** - Curated collection from great thinkers and leaders

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/davisbuilds/qotd.git
cd qotd
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
qotd/
├── app/
│   ├── api/
│   │   └── quotes/
│   │       └── random/
│   │           └── route.ts          # API endpoint for random quotes
│   ├── globals.css                   # Global styles & animations
│   ├── layout.tsx                    # Root layout with ThemeProvider
│   └── page.tsx                      # Main page component
├── components/
│   ├── QuoteDisplay.tsx              # Quote display with animations
│   ├── RefreshButton.tsx             # Animated refresh button
│   ├── ThemeProvider.tsx             # Theme context provider
│   └── ThemeToggle.tsx               # Dark/light mode toggle
├── data/
│   ├── quotes.csv                    # Original CSV data
│   └── quotes.json                   # Converted JSON data (100 quotes)
├── types/
│   └── quote.ts                      # TypeScript type definitions
├── old_python_app/                   # Archived Python desktop widget
└── package.json
```

## 🎨 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Theme Management**: next-themes
- **Animations**: CSS transitions & keyframes
- **API**: Next.js API Routes
- **Deployment Ready**: Vercel, Netlify, or any Node.js host

## 🌐 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/davisbuilds/qotd)

1. Click the button above or go to [Vercel](https://vercel.com)
2. Import your repository
3. Deploy (zero configuration needed!)

## 🎯 API Endpoints

### Get Random Quote

```
GET /api/quotes/random
```

**Response:**
```json
{
  "quote": "Actions follow being.",
  "author": "Aristotle"
}
```

## 🎨 Design Highlights

- **Glassmorphism Effect**: Frosted glass card with backdrop blur
- **Animated Gradients**: Dynamic background that shifts colors
- **Smooth Transitions**: All state changes animated for polish
- **Accessible**: Proper ARIA labels and semantic HTML
- **Responsive Typography**: Scales beautifully from mobile to desktop

## 📝 Adding More Quotes

To add more quotes, edit `data/quotes.json`:

```json
{
  "quote": "Your inspirational quote here",
  "author": "Author Name"
}
```

Then rebuild the application.

## 🐛 Development Notes

- Auto-refresh interval: 5 minutes (300,000ms) - configurable in `app/page.tsx`
- Theme preference persists in localStorage
- API route caches quotes for performance
- Smooth fade transitions: 500ms duration

## 📜 License

MIT License - Copyright (c) 2025 Davis

## 🙏 Credits

Built with ❤️ by **Davis & Claude**

Inspired by great thinkers, entrepreneurs, and leaders featured in the quotes collection.

---

### 🔄 Migration from Python Desktop Widget

This project was originally a Python CustomTkinter desktop widget and has been completely refactored into a modern Next.js web application. The original Python code is archived in `old_python_app/` for reference.

**Why the refactor?**
- ✅ Cross-platform (works everywhere - desktop, mobile, tablet)
- ✅ No installation required (just open in browser)
- ✅ Easy to share (just send a link)
- ✅ Modern tech stack with better tooling
- ✅ Easier to deploy and maintain
- ✅ More beautiful and performant UI

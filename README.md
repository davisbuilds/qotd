# ✨ Quote of the Day - Next.js Web App

A beautiful, elegant web application that displays inspiring quotes with a sophisticated minimalist design. Features smooth animations, dark/light mode, auto-refresh, favorites, and refined glassmorphism effects.

**By Davis & Claude** 🚀

## 🌟 Features

- ✨ **Elegant Minimalist Design** - Refined glassmorphism with muted gradient backgrounds and subtle pulse animations
- 🎨 **Large Hero Typography** - Responsive quote text from 2xl to 5xl with decorative Georgia serif quotation marks
- 🌓 **Dark Mode First** - Defaults to dark theme with seamless light mode toggle and localStorage persistence
- ⭐ **Favorites System** - Save your favorite quotes with star button and view them anytime
- ❤️ **Favorites Badge** - Visual counter in top-right showing number of saved quotes
- 🔄 **Auto-Refresh** - Quotes automatically refresh every minute
- 🎯 **Manual Refresh** - Circular button with elegant hover effects for instant new quotes
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop with mobile-first design
- ⚡ **Lightning Fast** - Built with Next.js 14 App Router and TypeScript
- 🎭 **Smooth Animations** - 700ms fade transitions with scale and translate effects
- 💯 **200+ Inspirational Quotes** - Curated collection from great thinkers and leaders

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/davisbuilds/qotd.git
cd qotd
```

2. Install dependencies:

```bash
pnpm install
# or
yarn install
```

3. Run the development server:

```bash
pnpm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Build for Production

```bash
pnpm run build
pnpm start
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
│   ├── FavoriteButton.tsx            # Heart button to favorite quotes
│   ├── FavoritesView.tsx             # Modal view for saved favorites
│   ├── ThemeProvider.tsx             # Theme context provider
│   └── ThemeToggle.tsx               # Dark/light mode toggle
├── hooks/
│   └── useFavorites.ts               # Custom hook for favorites management
├── data/
│   ├── quotes.csv                    # Original CSV data
│   └── quotes.json                   # Converted JSON data (100+ quotes)
├── types/
│   └── quote.ts                      # TypeScript type definitions
├── old_python_app/                   # Archived Python desktop widget
└── package.json
```

## 🎨 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Components**: Custom minimalist circular button design
- **Styling**: Tailwind CSS with custom elegant backgrounds and refined glassmorphism
- **Icons**: Lucide React (RotateCw, Star, Heart, Moon, Sun, Sparkles)
- **Theme Management**: next-themes with dark mode default
- **Animations**: CSS transitions & keyframes with custom cubic-bezier easing
- **API**: Next.js API Routes with force-dynamic for random quotes
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
  "id": 42,
  "quote": "Actions follow being.",
  "author": "Aristotle"
}
```

## 🎨 Design Highlights

- **Elegant Minimalism**: Sophisticated muted color palette with refined aesthetics
- **Refined Glassmorphism**: Enhanced 40px blur with layered shadows for depth
- **Muted Gradients**: Subtle background gradients with gentle pulse animations
- **Large Typography**: Hero-sized quote text (2xl-5xl) with font-light weight for elegance
- **Decorative Elements**: Georgia serif quotation marks positioned absolutely
- **Circular Buttons**: Minimalist design with elegant hover effects and subtle hover rings
- **Smooth Transitions**: 700ms fade animations with scale and translate effects
- **Dark Mode First**: Defaults to dark theme with hydration-safe theme detection
- **Accessible**: Proper ARIA labels, semantic HTML, and keyboard navigation
- **Responsive Typography**: Scales beautifully from mobile to desktop with breakpoints

## 📝 Adding More Quotes

To add more quotes, edit `data/quotes.json`:

```json
{
  "id": ##,
  "quote": "Your inspirational quote here",
  "author": "Author Name"
}
```

Then rebuild the application.

## 🐛 Development Notes

- Auto-refresh interval: 2 minutes (120,000ms) - configurable in `lib/constants.ts`
- Theme defaults to dark mode and persists in localStorage
- Hydration-safe theme detection using `theme !== 'light'` pattern prevents flash
- Favorites persist in localStorage with key `qotd-favorites`
- API route prevents caching with `force-dynamic` and no-cache headers to ensure random quotes
- Smooth fade transitions: 700ms duration with scale and translate effects
- Elegant hover effects: translateY(-2px) with cubic-bezier(0.4, 0, 0.2, 1) easing
- Each quote has a unique ID for favorites tracking
- Custom CSS animations for subtle pulse effects and loading shimmer

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

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/ThemeProvider", () => ({
  ThemeProvider: ({
    children,
    defaultTheme,
    enableSystem,
    disableTransitionOnChange,
  }: {
    children: React.ReactNode;
    defaultTheme?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
  }) => (
    <div
      data-default-theme={defaultTheme}
      data-disable-transition={String(disableTransitionOnChange)}
      data-enable-system={String(enableSystem)}
    >
      {children}
    </div>
  ),
}));

vi.mock("@/components/QuoteDisplay", () => ({
  default: ({ quote }: { quote: { quote: string; author: string } }) => (
    <figure>
      <blockquote>{quote.quote}</blockquote>
      <figcaption>{quote.author}</figcaption>
    </figure>
  ),
}));

vi.mock("@/components/RefreshButton", () => ({
  default: ({ isLoading }: { isLoading: boolean }) => (
    <button data-loading={String(isLoading)}>Refresh</button>
  ),
}));

vi.mock("@/components/FavoriteButton", () => ({
  default: ({ isFavorite }: { isFavorite: boolean }) => (
    <button data-favorite={String(isFavorite)}>Favorite</button>
  ),
}));

vi.mock("@/components/FavoritesView", () => ({
  default: ({ favorites }: { favorites: unknown[] }) => (
    <aside>{favorites.length} favorites</aside>
  ),
}));

vi.mock("@/components/ThemeToggle", () => ({
  default: () => <button>Theme</button>,
}));

vi.mock("@/components/ui/button", async () => import("../components/ui/button"));
vi.mock("@/hooks/useFavorites", () => ({
  useFavorites: () => ({
    favorites: [],
    isFavorite: () => false,
    toggleFavorite: vi.fn(),
    removeFavorite: vi.fn(),
    clearFavorites: vi.fn(),
  }),
}));
vi.mock("@/lib/constants", async () => import("../lib/constants"));
vi.mock("@/lib/utils", async () => import("../lib/utils"));
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark" }),
}));

import RootLayout, { metadata } from "../app/layout";
import Home from "../app/page";

describe("app shell", () => {
  it("declares page metadata for the quote app", () => {
    expect(metadata).toMatchObject({
      title: "Quote of the Day",
      description: "Beautiful inspirational quotes to brighten your day - by Davis & Claude",
    });
  });

  it("wraps children in the dark default theme provider", () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <main>Daily quote</main>
      </RootLayout>,
    );

    expect(markup).toContain('lang="en"');
    expect(markup).toContain('data-default-theme="dark"');
    expect(markup).toContain('data-enable-system="true"');
    expect(markup).toContain('data-disable-transition="true"');
    expect(markup).toContain("Daily quote");
  });

  it("renders the hydration-safe loading shell before the page is mounted", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("quote of the day");
    expect(markup).toContain("by Davis &amp; Claude");
    expect(markup).toContain("Gathering wisdom...");
    expect(markup).toContain("elegant-bg-dark");
    expect(markup).toContain("refined-glass-dark");
  });
});

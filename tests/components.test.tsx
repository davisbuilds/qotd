import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/utils", async () => import("../lib/utils"));
vi.mock("@/components/ui/button", async () => import("../components/ui/button"));
vi.mock("@/components/ui/card", async () => import("../components/ui/card"));

vi.mock("next-themes", () => ({
  useTheme: vi.fn(() => ({ theme: "dark", setTheme: vi.fn() })),
}));

import { useTheme } from "next-themes";
import FavoriteButton from "../components/FavoriteButton";
import FavoritesView from "../components/FavoritesView";
import QuoteDisplay from "../components/QuoteDisplay";
import RefreshButton from "../components/RefreshButton";

const mockedUseTheme = vi.mocked(useTheme);

describe("FavoriteButton", () => {
  it("labels and styles a saved favorite in dark mode", () => {
    mockedUseTheme.mockReturnValue({ theme: "dark", setTheme: vi.fn() });

    const markup = renderToStaticMarkup(
      <FavoriteButton isFavorite onClick={() => undefined} />,
    );

    expect(markup).toContain('aria-label="Remove from favorites"');
    expect(markup).toContain("bg-white/5");
    expect(markup).toContain("fill-yellow-400");
  });

  it("labels and styles an unsaved favorite in light mode", () => {
    mockedUseTheme.mockReturnValue({ theme: "light", setTheme: vi.fn() });

    const markup = renderToStaticMarkup(
      <FavoriteButton isFavorite={false} onClick={() => undefined} />,
    );

    expect(markup).toContain('aria-label="Add to favorites"');
    expect(markup).toContain("bg-black/5");
    expect(markup).toContain("text-black/60");
  });
});

describe("RefreshButton", () => {
  it("disables the button and spins the icon while loading", () => {
    mockedUseTheme.mockReturnValue({ theme: "dark", setTheme: vi.fn() });

    const markup = renderToStaticMarkup(
      <RefreshButton isLoading onClick={() => undefined} />,
    );

    expect(markup).toContain("disabled");
    expect(markup).toContain('aria-label="Refresh quote"');
    expect(markup).toContain("animate-spin");
  });

  it("keeps the refresh action enabled when not loading", () => {
    mockedUseTheme.mockReturnValue({ theme: "light", setTheme: vi.fn() });

    const markup = renderToStaticMarkup(
      <RefreshButton isLoading={false} onClick={() => undefined} />,
    );

    expect(markup).not.toContain("<button disabled");
    expect(markup).toContain("elegant-hover");
    expect(markup).toContain("group-hover:rotate-180");
  });
});

describe("QuoteDisplay", () => {
  it("renders quote text and author in the settled state", () => {
    mockedUseTheme.mockReturnValue({ theme: "dark", setTheme: vi.fn() });

    const markup = renderToStaticMarkup(
      <QuoteDisplay
        isTransitioning={false}
        quote={{ id: 7, quote: "Resources are plentiful.", author: "David Deutsch" }}
      />,
    );

    expect(markup).toContain("Resources are plentiful.");
    expect(markup).toContain("David Deutsch");
    expect(markup).toContain("opacity-100");
  });

  it("renders transition classes while a new quote fades in", () => {
    mockedUseTheme.mockReturnValue({ theme: "light", setTheme: vi.fn() });

    const markup = renderToStaticMarkup(
      <QuoteDisplay
        isTransitioning
        quote={{ id: 8, quote: "Expectations shape resilience.", author: "Jensen Huang" }}
      />,
    );

    expect(markup).toContain("opacity-0");
    expect(markup).toContain("translate-y-8");
    expect(markup).toContain("text-black/90");
  });
});

describe("FavoritesView", () => {
  it("renders the empty-state message when there are no favorites", () => {
    const markup = renderToStaticMarkup(
      <FavoritesView
        favorites={[]}
        onClear={() => undefined}
        onClose={() => undefined}
        onRemove={() => undefined}
      />,
    );

    expect(markup).toContain("No favorites yet. Star a quote to save it here!");
    expect(markup).toContain("Start favoriting quotes to build your collection!");
    expect(markup).not.toContain("Clear All Favorites");
  });

  it("renders favorite quotes and the clear action", () => {
    const markup = renderToStaticMarkup(
      <FavoritesView
        favorites={[
          { id: 1, quote: "Actions follow being.", author: "Aristotle" },
          { id: 2, quote: "Life is growth.", author: "Phil Knight" },
        ]}
        onClear={() => undefined}
        onClose={() => undefined}
        onRemove={() => undefined}
      />,
    );

    expect(markup).toContain("2 favorite quotes");
    expect(markup).toContain("Actions follow being.");
    expect(markup).toContain("Phil Knight");
    expect(markup).toContain("Clear All Favorites");
  });
});

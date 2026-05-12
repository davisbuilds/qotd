import { describe, expect, it } from "vitest";

import { TIMING, STORAGE_KEYS, UI } from "../lib/constants";
import { cn } from "../lib/utils";

describe("application constants", () => {
  it("keeps quote refresh and transition timings stable", () => {
    expect(TIMING).toEqual({
      AUTO_REFRESH_INTERVAL: 120_000,
      QUOTE_TRANSITION_DURATION: 500,
      DEBOUNCE_DELAY: 500,
    });
  });

  it("uses the documented localStorage key for favorites", () => {
    expect(STORAGE_KEYS.FAVORITES).toBe("qotd-favorites");
  });

  it("exposes the shared icon button sizing classes", () => {
    expect(UI.BUTTON_SIZES).toEqual({
      large: "h-14 w-14 p-4",
      medium: "h-12 w-12 p-3",
      small: "h-10 w-10 p-2",
    });
    expect(UI.ICON_BUTTON_BASE).toBe(
      "rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
    );
  });
});

describe("cn", () => {
  it("merges conditional class names and resolves Tailwind conflicts", () => {
    expect(cn("px-2 text-sm", false && "hidden", "px-4", ["font-bold"])).toBe(
      "text-sm px-4 font-bold",
    );
  });
});

import { describe, expect, it, vi } from "vitest";

vi.mock("@/data/quotes.json", () => ({
  default: [
    {
      id: 1,
      quote: "Actions follow being.",
      author: "Aristotle",
    },
    {
      id: 2,
      quote: "Life is growth.",
      author: "Phil Knight",
    },
  ],
}));

import { GET, dynamic } from "../app/api/quotes/random/route";

describe("random quote API", () => {
  it("opts out of static rendering", () => {
    expect(dynamic).toBe("force-dynamic");
  });

  it("returns a random quote with no-cache headers", async () => {
    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);

    try {
      const response = await GET();
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toEqual({
        id: 1,
        quote: "Actions follow being.",
        author: "Aristotle",
      });
      expect(response.headers.get("Cache-Control")).toBe(
        "no-store, no-cache, must-revalidate, proxy-revalidate",
      );
      expect(response.headers.get("Pragma")).toBe("no-cache");
      expect(response.headers.get("Expires")).toBe("0");
    } finally {
      randomSpy.mockRestore();
    }
  });
});

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-themes", () => ({
  ThemeProvider: ({
    attribute,
    children,
    defaultTheme,
    enableSystem,
  }: {
    attribute?: string;
    children: React.ReactNode;
    defaultTheme?: string;
    enableSystem?: boolean;
  }) => (
    <section
      data-attribute={attribute}
      data-default-theme={defaultTheme}
      data-enable-system={String(enableSystem)}
    >
      {children}
    </section>
  ),
}));

import { ThemeProvider } from "../components/ThemeProvider";

describe("ThemeProvider", () => {
  it("forwards theme props and children to next-themes", () => {
    const markup = renderToStaticMarkup(
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <p>Quote content</p>
      </ThemeProvider>,
    );

    expect(markup).toContain('data-attribute="class"');
    expect(markup).toContain('data-default-theme="dark"');
    expect(markup).toContain('data-enable-system="true"');
    expect(markup).toContain("Quote content");
  });
});

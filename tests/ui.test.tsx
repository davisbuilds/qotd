import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/utils", async () => import("../lib/utils"));

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

describe("Button", () => {
  it("renders the default button classes with supplied content", () => {
    const markup = renderToStaticMarkup(<Button>Refresh</Button>);

    expect(markup).toContain("<button");
    expect(markup).toContain("Refresh");
    expect(markup).toContain("bg-primary");
    expect(markup).toContain("h-9");
  });

  it("merges variant, size, and custom classes", () => {
    const markup = renderToStaticMarkup(
      <Button className="rounded-full" size="icon" variant="secondary">
        <span>Open</span>
      </Button>,
    );

    expect(markup).toContain("bg-secondary");
    expect(markup).toContain("h-9 w-9");
    expect(markup).toContain("rounded-full");
  });
});

describe("Card primitives", () => {
  it("renders card sections with merged class names", () => {
    const markup = renderToStaticMarkup(
      <Card className="custom-card">
        <CardHeader className="custom-header">
          <CardTitle>Favorite Quotes</CardTitle>
          <CardDescription>2 favorite quotes</CardDescription>
        </CardHeader>
        <CardContent className="custom-content">Quote list</CardContent>
        <CardFooter className="custom-footer">Actions</CardFooter>
      </Card>,
    );

    expect(markup).toContain("custom-card");
    expect(markup).toContain("custom-header");
    expect(markup).toContain("Favorite Quotes");
    expect(markup).toContain("custom-content");
    expect(markup).toContain("custom-footer");
  });
});

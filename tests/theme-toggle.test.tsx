import React from "react";
import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  setTheme: vi.fn(),
  useEffect: vi.fn(),
  useState: vi.fn(),
  useTheme: vi.fn(),
}));

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof React>("react");

  return {
    ...actual,
    default: actual,
    useEffect: mocks.useEffect,
    useState: mocks.useState,
  };
});

vi.mock("next-themes", () => ({
  useTheme: mocks.useTheme,
}));

vi.mock("@/lib/utils", async () => import("../lib/utils"));

import ThemeToggle from "../components/ThemeToggle";

describe("ThemeToggle", () => {
  it("renders a disabled dark-mode skeleton before mounting", () => {
    mocks.useState.mockReturnValue([false, vi.fn()]);
    mocks.useTheme.mockReturnValue({ theme: undefined, setTheme: mocks.setTheme });

    const element = ThemeToggle();

    expect(element.props.disabled).toBe(true);
    expect(element.props.className).toContain("bg-white/5");
    expect(element.props.style).toEqual({
      boxShadow: "0 4px 16px rgba(255,255,255,0.1)",
    });
  });

  it("switches from dark mode to light mode after mounting", () => {
    mocks.useState.mockReturnValue([true, vi.fn()]);
    mocks.useTheme.mockReturnValue({ theme: "dark", setTheme: mocks.setTheme });

    const element = ThemeToggle();
    element.props.onClick();

    expect(element.props["aria-label"]).toBe("Switch to light mode");
    expect(element.props.className).toContain("bg-white/5");
    expect(mocks.setTheme).toHaveBeenCalledWith("light");
  });

  it("switches from light mode to dark mode after mounting", () => {
    mocks.useState.mockReturnValue([true, vi.fn()]);
    mocks.useTheme.mockReturnValue({ theme: "light", setTheme: mocks.setTheme });

    const element = ThemeToggle();
    element.props.onClick();

    expect(element.props["aria-label"]).toBe("Switch to dark mode");
    expect(element.props.className).toContain("bg-black/5");
    expect(mocks.setTheme).toHaveBeenCalledWith("dark");
  });
});

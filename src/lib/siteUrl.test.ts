import { describe, expect, it } from "vitest";

import { getSiteUrl } from "./siteUrl";

describe("getSiteUrl", () => {
  it("normalizes local and production hosts", () => {
    expect(getSiteUrl("localhost:3000")).toBe("http://localhost:3000");
    expect(getSiteUrl("shop.example.com/")).toBe("https://shop.example.com");
    expect(getSiteUrl("https://shop.example.com/path")).toBe("https://shop.example.com");
  });

  it("falls back for missing or malformed values", () => {
    expect(getSiteUrl("")).toBe("http://localhost:3000");
    expect(getSiteUrl("https://")).toBe("http://localhost:3000");
  });
});

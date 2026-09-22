import { describe, expect, it } from "vitest";

import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("returns deterministic Ukrainian price formatting", () => {
    expect(formatPrice(6790)).toBe("6\u00A0790\u00A0₴");
    expect(formatPrice(720)).toBe("720\u00A0₴");
  });

  it("rounds fractional values consistently", () => {
    expect(formatPrice(1234.5)).toBe("1\u00A0235\u00A0₴");
    expect(formatPrice(-1200)).toBe("−1\u00A0200\u00A0₴");
  });
});

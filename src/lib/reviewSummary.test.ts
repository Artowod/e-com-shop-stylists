import { describe, expect, it } from "vitest";
import { getReviewSummary } from "./reviewSummary";

describe("review summary", () => {
  it("uses only published reviews", () => {
    const summary = getReviewSummary([
      { id: "1", productId: "p", author: "A", authorId: "review.andrii", rating: 5, text: "ok", textId: "review.jrl1", date: "2026-01-01", status: "published" },
      { id: "2", productId: "p", author: "B", authorId: "review.maksym", rating: 1, text: "pending", textId: "review.jrl2", date: "2026-01-02", status: "pending" },
    ]);
    expect(summary.average).toBe(5);
    expect(summary.count).toBe(1);
    expect(summary.distribution[5]).toBe(1);
  });
});

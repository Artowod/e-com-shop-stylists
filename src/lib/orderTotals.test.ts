import { describe, expect, it } from "vitest";
import { calculateOrderSubtotal, calculateOrderTotal, checkoutLineSchema } from "./orderTotals";
describe("order totals", () => {
  it("calculates the subtotal from server prices", () => { expect(calculateOrderSubtotal([{ productId: "p1", quantity: 2, unitPrice: 120 }, { productId: "p2", quantity: 1, unitPrice: 75 }])).toBe(315); });
  it("never returns a negative payable total", () => { expect(calculateOrderTotal(100, 150)).toBe(0); });
  it("rejects invalid quantities", () => { expect(checkoutLineSchema.safeParse({ productId: "p1", quantity: 0, unitPrice: 100 }).success).toBe(false); });
});

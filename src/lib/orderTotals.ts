import { z } from "zod";

export const checkoutLineSchema = z.object({ productId: z.string().min(1), variantId: z.string().min(1).optional(), quantity: z.number().int().min(1).max(99), unitPrice: z.number().nonnegative() });
export type CheckoutLine = z.infer<typeof checkoutLineSchema>;
export function calculateOrderSubtotal(lines: CheckoutLine[]) { return lines.reduce((total, line) => total + line.unitPrice * line.quantity, 0); }
export function calculateOrderTotal(subtotal: number, discount: number) { if (subtotal < 0 || discount < 0) throw new Error("Order amounts cannot be negative."); return Math.max(0, subtotal - discount); }

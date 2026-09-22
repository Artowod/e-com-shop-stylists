export function formatPrice(value: number) {
  const roundedValue = Math.round(value);
  const sign = roundedValue < 0 ? "−" : "";
  const groupedValue = Math.abs(roundedValue)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");

  return `${sign}${groupedValue}\u00A0₴`;
}

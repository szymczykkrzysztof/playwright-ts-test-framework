export function extractPrices(priceTexts: string[]): number[] {
  return priceTexts.map((text) => {
    const numericText = text.replace(/[^\d.]/g, "");
    return parseFloat(numericText);
  });
}

export function formatPrices(prices: number[]): string[] {
  return prices.map((price) => `$${price.toFixed(2)}`);
}

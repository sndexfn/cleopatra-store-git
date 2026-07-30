// This handles gold price calculations

export type GoldPrices = {
  usdPerOunce: number;
  usdPerGram24k: number;
  usdPerGram21k: number;
  usdPerGram18k: number;
  iqdExchangeRate: number; 
  lastUpdated: string;
};

// Mock data until real API is hooked up
let mockGoldPrices: GoldPrices = {
  usdPerOunce: 2350.50,
  usdPerGram24k: 2350.50 / 31.1035,
  usdPerGram21k: (2350.50 / 31.1035) * (21 / 24),
  usdPerGram18k: (2350.50 / 31.1035) * (18 / 24),
  iqdExchangeRate: 1520, // 1 USD = 1520 IQD
  lastUpdated: new Date().toISOString(),
};

export async function getLiveGoldPrices(): Promise<GoldPrices> {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockGoldPrices), 500);
  });
}

export function calculateFinalPrice(
  weightGrams: number, 
  karat: 18 | 21 | 24, 
  makingChargeUSD: number, 
  prices: GoldPrices
) {
  let gramPrice = 0;
  if (karat === 24) gramPrice = prices.usdPerGram24k;
  if (karat === 21) gramPrice = prices.usdPerGram21k;
  if (karat === 18) gramPrice = prices.usdPerGram18k;

  const totalUSD = (gramPrice * weightGrams) + makingChargeUSD;
  const totalIQD = totalUSD * prices.iqdExchangeRate;

  return { totalUSD, totalIQD };
}

export function formatCurrency(amount: number, currency: 'USD' | 'IQD') {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  } else {
    // IQD usually has no decimal places
    return new Intl.NumberFormat('ar-IQ', { style: 'currency', currency: 'IQD', maximumFractionDigits: 0 }).format(amount);
  }
}

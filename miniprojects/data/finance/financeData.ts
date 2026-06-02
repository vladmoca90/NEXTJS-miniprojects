export interface FinanceProduct {
  id: string;
  name: string;
  category: string;
  annualRate: number;
  termRange: [number, number];
  minAmount: number;
  maxAmount: number;
  description: string;
}


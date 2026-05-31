import { FinanceProduct } from "./financeData";

export const financeProducts: FinanceProduct[] = [
  {
    id: "auto-loan",
    name: "Auto Loan",
    category: "Vehicle Financing",
    annualRate: 5.9,
    termRange: [24, 84],
    minAmount: 5000,
    maxAmount: 70000,
    description: "Low-rate financing for purchases of new or used vehicles.",
  },
  {
    id: "home-mortgage",
    name: "Home Mortgage",
    category: "Mortgage",
    annualRate: 3.8,
    termRange: [120, 360],
    minAmount: 50000,
    maxAmount: 1200000,
    description: "Fixed-rate mortgage with stable monthly payments over a long term.",
  },
  {
    id: "personal-loan",
    name: "Personal Loan",
    category: "Consumer Credit",
    annualRate: 7.4,
    termRange: [12, 60],
    minAmount: 1000,
    maxAmount: 50000,
    description: "Flexible loan for debt consolidation, home projects, or emergency expenses.",
  },
  {
    id: "business-line",
    name: "Business Line of Credit",
    category: "Business Financing",
    annualRate: 6.5,
    termRange: [6, 48],
    minAmount: 10000,
    maxAmount: 250000,
    description: "Access revolving funds for inventory, payroll, or working capital.",
  },
];

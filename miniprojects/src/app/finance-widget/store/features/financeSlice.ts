import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FinanceProduct } from "../../../../../data/finance/financeData";
import {
  DEFAULT_AMOUNT,
  DEFAULT_DOWN_PAYMENT,
  DEFAULT_SELECTED_PRODUCT_ID,
  DEFAULT_TERM_MONTHS,
  EMPTY_CALCULATION,
} from "../financeConstants";

type FinanceStatus = "idle" | "loading" | "succeeded" | "failed";

export interface FinanceCalculation {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  principal: number;
  annualRate: number;
  productName: string;
}

interface FinanceState {
  products: FinanceProduct[];
  selectedProductId: string;
  amount: number;
  termMonths: number;
  downPayment: number;
  status: FinanceStatus;
  error: string | null;
  calculation: FinanceCalculation;
}

const initialState: FinanceState = {
  products: [],
  selectedProductId: DEFAULT_SELECTED_PRODUCT_ID,
  amount: DEFAULT_AMOUNT,
  termMonths: DEFAULT_TERM_MONTHS,
  downPayment: DEFAULT_DOWN_PAYMENT,
  status: "idle",
  error: null,
  calculation: EMPTY_CALCULATION,
};

const calculateFinance = (
  product: FinanceProduct | undefined,
  amount: number,
  downPayment: number,
  termMonths: number
): FinanceCalculation => {
  if (!product) {
    return EMPTY_CALCULATION;
  }

  const principal = Math.max(amount - downPayment, 0);
  const monthlyRate = product.annualRate / 100 / 12;
  const n = Math.max(termMonths, 1);
  const monthlyPayment =
    monthlyRate === 0
      ? principal / n
      : principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -n)));
  const totalCost = monthlyPayment * n + downPayment;
  const totalInterest = monthlyPayment * n - principal;

  return {
    monthlyPayment: Number(monthlyPayment.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    totalCost: Number(totalCost.toFixed(2)),
    principal: Number(principal.toFixed(2)),
    annualRate: product.annualRate,
    productName: product.name,
  };
};

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<FinanceProduct[]>) {
      state.products = action.payload;
      const selected =
        action.payload.find((product) => product.id === state.selectedProductId) ||
        action.payload[0];
      state.selectedProductId = selected?.id ?? state.selectedProductId;
      state.calculation = calculateFinance(
        selected,
        state.amount,
        state.downPayment,
        state.termMonths
      );
    },
    setSelectedProductId(state, action: PayloadAction<string>) {
      state.selectedProductId = action.payload;
      const product = state.products.find((item) => item.id === action.payload);
      state.calculation = calculateFinance(
        product,
        state.amount,
        state.downPayment,
        state.termMonths
      );
    },
    setAmount(state, action: PayloadAction<number>) {
      state.amount = action.payload;
      const product = state.products.find((item) => item.id === state.selectedProductId);
      state.calculation = calculateFinance(
        product,
        action.payload,
        state.downPayment,
        state.termMonths
      );
    },
    setTermMonths(state, action: PayloadAction<number>) {
      state.termMonths = action.payload;
      const product = state.products.find((item) => item.id === state.selectedProductId);
      state.calculation = calculateFinance(
        product,
        state.amount,
        state.downPayment,
        action.payload
      );
    },
    setDownPayment(state, action: PayloadAction<number>) {
      state.downPayment = action.payload;
      const product = state.products.find((item) => item.id === state.selectedProductId);
      state.calculation = calculateFinance(
        product,
        state.amount,
        action.payload,
        state.termMonths
      );
    },
    setStatus(state, action: PayloadAction<FinanceStatus>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  setSelectedProductId,
  setAmount,
  setTermMonths,
  setDownPayment,
  setStatus,
  setError,
} = financeSlice.actions;

export default financeSlice.reducer;

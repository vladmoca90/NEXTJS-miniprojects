import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import financeReducer from "../src/app/finance-widget/store/features/financeSlice";
import { FinanceWidgetComponent } from "../src/app/finance-widget/FinanceWidgetComponent";

const mockProduct = {
  id: "auto-loan",
  name: "Auto Loan",
  category: "Vehicle Financing",
  annualRate: 5.9,
  termRange: [24, 84],
  minAmount: 5000,
  maxAmount: 70000,
  description: "Low-rate financing for purchases of new or used vehicles.",
};

describe("Finance Widget", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({ reducer: { finance: financeReducer } });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ body: [mockProduct] }),
      })
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the finance widget and loads product options", async () => {
    render(
      <Provider store={store}>
        <FinanceWidgetComponent />
      </Provider>
    );

    expect(screen.getByText(/finance rate calculator/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/loan amount/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("option", { name: /auto loan/i })).toBeInTheDocument();
    });
  });

  it("updates the monthly payment when loan amount changes", async () => {
    render(
      <Provider store={store}>
        <FinanceWidgetComponent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByRole("option", { name: /auto loan/i })).toBeInTheDocument();
    });

    const amountInput = screen.getByLabelText(/loan amount/i);
    fireEvent.change(amountInput, { target: { value: "30000" } });

    await waitFor(() => {
      expect(screen.getByText(/monthly payment/i)).toBeInTheDocument();
    });

    const monthlyPaymentText = screen.getByText(/monthly payment/i).nextSibling?.textContent;
    expect(monthlyPaymentText).toContain("$");
  });

  it("shows an error message when the API request fails", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network failed"))) as unknown as typeof fetch;

    render(
      <Provider store={store}>
        <FinanceWidgetComponent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/unable to fetch finance products/i)).toBeInTheDocument();
    });
  });
});

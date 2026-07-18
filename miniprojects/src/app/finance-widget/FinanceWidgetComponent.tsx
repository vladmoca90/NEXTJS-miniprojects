"use client";
import { useEffect } from "react";
import {
  setAmount,
  setDownPayment,
  setError,
  setProducts,
  setSelectedProductId,
  setStatus,
  setTermMonths,
} from "./store/features/financeSlice";
import { useAppDispatch, useAppSelector } from "./store/store";

export function FinanceWidgetComponent() {
  const dispatch = useAppDispatch();
  const {
    products,
    selectedProductId,
    amount,
    termMonths,
    downPayment,
    status,
    error,
    calculation,
  } = useAppSelector((state) => state.finance);

  useEffect(() => {
    const loadProducts = async () => {
      dispatch(setStatus("loading"));
      try {
        const response = await fetch("/api/finance");
        const data = await response.json();
        dispatch(setProducts(data.body));
        dispatch(setStatus("succeeded"));
      } catch (fetchError) {
        dispatch(setError("Unable to fetch finance products."));
        dispatch(setStatus("failed"));
      }
    };

    loadProducts();
  }, [dispatch]);

  const selectedProduct = products.find((product) => product.id === selectedProductId);

  return (
    <section className="finance-widget-section">
      <header className="finance-widget-header">
        <h1>Finance Rate Calculator</h1>
        <p>
          Select a fictional product, adjust the amount, term, and down payment,
          and view estimated monthly payments and total interest.
        </p>
      </header>

      {status === "loading" ? (
        <div className="finance-widget-loading">Loading finance products…</div>
      ) : null}

      {error ? <div className="finance-widget-error">{error}</div> : null}

      <div className="finance-widget-grid">
        <div className="finance-widget-card">
          <label htmlFor="product-select">Finance product</label>
          <select
            id="product-select"
            value={selectedProductId}
            onChange={(e) => dispatch(setSelectedProductId(e.target.value))}
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} — {product.category}
              </option>
            ))}
          </select>

          <label htmlFor="amount-input">Loan amount</label>
          <input
            id="amount-input"
            type="number"
            min={selectedProduct?.minAmount ?? 0}
            max={selectedProduct?.maxAmount ?? 999999}
            value={amount}
            onChange={(e) => dispatch(setAmount(Number(e.target.value)))}
          />

          <label htmlFor="term-select">Term length (months)</label>
          <select
            id="term-select"
            value={termMonths}
            onChange={(e) => dispatch(setTermMonths(Number(e.target.value)))}
          >
            {selectedProduct
              ? Array.from(
                  { length: selectedProduct.termRange[1] - selectedProduct.termRange[0] + 1 },
                  (_, index) => selectedProduct.termRange[0] + index
                )
                  .filter((value) => value % 6 === 0)
                  .map((value) => (
                    <option key={value} value={value}>
                      {value} months
                    </option>
                  ))
              : null}
          </select>

          <label htmlFor="down-payment-input">Down payment</label>
          <input
            id="down-payment-input"
            type="number"
            min={0}
            max={amount}
            value={downPayment}
            onChange={(e) => dispatch(setDownPayment(Number(e.target.value)))}
          />
        </div>

        <div className="finance-widget-card finance-widget-summary">
          <h2>Estimated payment summary</h2>
          <div className="finance-summary-list">
            <div>
              <strong>Product</strong>
              <span>{calculation.productName || "Choose a product"}</span>
            </div>
            <div>
              <strong>APR</strong>
              <span>{calculation.annualRate ? `${calculation.annualRate}%` : "—"}</span>
            </div>
            <div>
              <strong>Principal</strong>
              <span>${calculation.principal.toLocaleString()}</span>
            </div>
            <div>
              <strong>Monthly payment</strong>
              <span>${calculation.monthlyPayment.toLocaleString()}</span>
            </div>
            <div>
              <strong>Total interest</strong>
              <span>${calculation.totalInterest.toLocaleString()}</span>
            </div>
            <div>
              <strong>Total cost</strong>
              <span>${calculation.totalCost.toLocaleString()}</span>
            </div>
          </div>

          <div className="finance-widget-meta">
            <p>
              This example uses a fictional API and fictional finance products
              defined in TypeScript.
            </p>
            <p>
              API endpoint: <code>/api/finance</code>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

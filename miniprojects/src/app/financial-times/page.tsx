"use client";
import FinancialTimesComponent from "./FinancialTimesComponent";

export default function FinancialTimesMain() {
    const quotesUrl = "https://markets-data-api-proxy.ft.com/research/webservices/securities/v1/quotes?symbols=FTSE:FSI,INX:IOM,EURUSD,GBPUSD,IB.1:IEU";

    <FinancialTimesComponent />
}
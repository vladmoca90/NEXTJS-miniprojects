import { NextResponse, NextRequest } from "next/server";
import { financeProducts } from "../../../../data/finance/financeProducts";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      body: financeProducts,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
    },
    {
      status: 200,
    }
  );
}

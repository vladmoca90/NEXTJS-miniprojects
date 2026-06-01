import { NextResponse, NextRequest } from "next/server";
import { mathQuestions } from "../../../../data/math/questions";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      body: mathQuestions,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
    },
    { status: 200 }
  );
}

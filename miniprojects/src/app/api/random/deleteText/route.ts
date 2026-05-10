import { NextRequest, NextResponse } from "next/server";
// import { allTexts } from "../../../../../data/random/deleteText/allTexts";

export async function DELETE(request: NextRequest) {
    return NextResponse.json(
        {
            body: null,
        },
        {
            status: 200,
        }
    );
}
import { PersonRepository } from "./personRepository";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();

    const personRepository = new PersonRepository();
    
    const personDetails = personRepository.getPerson(data.name, data.password);

    if (personDetails === null) {
        return NextResponse.json({},
            {
                status: 404
            },
        );
    } else {
        return NextResponse.json(
            {
                body: personDetails,
                path: request.nextUrl.pathname,
                query: request.nextUrl.search,
                cookies: request.cookies.getAll(),
            },
            {
                status: 200
            },
        );
    }
}

// http://localhost:3000/api/persons
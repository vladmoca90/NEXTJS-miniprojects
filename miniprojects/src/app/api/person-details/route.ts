import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { allPersons } from "../../../../lib/personDetails/allPersons";
import { Person } from "../../../../lib/personDetails/person";

export async function POST(request: NextRequest) {
    const data = await request.json();

    const getPerson = (name: string, password: string): Person | null => {
        const person = allPersons.find((person) => person.name === name && person.password === password);

        if (!person) {
            return null;
        } else {
            return person;
        }
    }
    
    const personDetails = getPerson(data.name, data.password);

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
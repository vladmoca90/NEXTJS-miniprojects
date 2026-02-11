import { NextResponse, NextRequest } from "next/server";
import { allPersons } from "../../../../data/personDetails/allPersons";
import { Person } from "../../../../data/personDetails/person";

export async function POST(request: NextRequest) {
    const data = await request.json();

    const retrievePerson = (name: string, password: string, nationality: string,
        profession: string, weight: number): Person | null => {
        const person = allPersons.find((person) =>
            person.name === name &&
            person.password === password &&
            person.nationality === nationality &&
            person.profession === profession &&
            person.weight === weight);

        if (!person) {
            return null;
        } else {
            return person;
        }
    }

    const personDetails = retrievePerson(data.name, data.password, data.nationality, data.profession, data.weight);

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
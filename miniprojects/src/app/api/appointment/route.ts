import { NextResponse, NextRequest } from "next/server";
import { Appointment } from "../../../../data/appointment/Appointment";
import { allAppointments } from "../../../../data/appointment/allAppointments";

export async function POST(request: NextRequest) {
    const data = await request.json();

    const retrieveAppointment = (
        forename: string,
        surname: string,
        password: string,
        email: string,
        phone: string,
        workplace: string
    ): Appointment | null =>
        allAppointments.find((appointment) =>
            appointment.forename === forename &&
            appointment.surname === surname &&
            appointment.password === password &&
            appointment.email === email &&
            appointment.phone === phone &&
            appointment.workplace === workplace
        ) || null;

    const appDetails = retrieveAppointment(
        data.forename,
        data.surname,
        data.password,
        data.email,
        data.phone,
        data.workplace
    );

    if (!appDetails) {
        return NextResponse.json(
            { message: "Appointment not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        {
            appointment: appDetails,
            path: request.nextUrl.pathname,
            query: request.nextUrl.searchParams.toString(),
            cookies: request.cookies.getAll(),
        },
        { status: 200 }
    );
}

// http://localhost:3000/api/appointment
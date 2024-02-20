import { NextResponse, NextRequest } from "next/server";
import { Appointment } from "../../../../lib/appointment/Appointment";
import { allAppointments } from "../../../../lib/appointment/allAppointments";

export async function POST(request: NextRequest) {
    const data = await request.json();

    const retrieveAppointment = (forename: string, surname: string, password: string, email: string, phone: string, workplace: string): Appointment | null => {
        const appointment = allAppointments.find((appointment) => appointment.forename === forename && appointment.surname === surname
            && appointment.password === password && appointment.email === email
            && appointment.phone === phone && appointment.workplace === workplace);

        if (!appointment) {
            return null;
        } else {
            return appointment;
        }
    }

    const appDetails = retrieveAppointment(data.forename, data.surname, data.password, data.email, data.phone, data.workplace);

    if (appDetails === null) {
        return NextResponse.json({},
            {
                status: 404
            },
        );
    } else {
        return NextResponse.json(
            {
                body: appDetails,
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

// http://localhost:3000/api/appointment
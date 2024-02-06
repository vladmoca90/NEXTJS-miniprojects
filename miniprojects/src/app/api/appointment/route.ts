import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { AppointmentRepository } from "./appointmentRepository";

export async function POST(request: NextRequest) {
    const data = await request.json();

    const appRepository = new AppointmentRepository();

    const appDetails = appRepository.getAppointment(data.firstName, data.lastName);

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
import { Appointment } from "../../../../lib/appointment/Appointment";
import { allAppointments } from "../../../../lib/appointment/allAppointments";

export class AppointmentRepository {
    getAppointment(firstName: string, lastName: string): Appointment | null {
        const appointment = allAppointments.find((appointment) => appointment.firstName === firstName && appointment.lastName === lastName);

        if (!appointment) {
            return null;
        } else {
            return appointment;
        }
    }
}
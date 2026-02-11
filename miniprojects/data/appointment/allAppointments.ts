import { Appointment } from "./Appointment";

export const allAppointments: Appointment[] = [
    {
        forename: "Alyn",
        surname: "Smith",
        email: "alyn.smith@gmail.com",
        password: "hashed_password_1", // Replace with a hashed version for security
        phone: "07658904765",
        workplace: "Waitrose and Partners",
    },
    {
        forename: "Petros",
        surname: "Soldatelli-Rissi",
        email: "psoldatellirissi@gmail.com",
        password: "hashed_password_2", // Replace with a hashed version for security
        phone: "07223457777",
        workplace: "Amazon Ltd",
    },
    {
        forename: "Jonathan",
        surname: "Briggs",
        email: "jonathan.briggs@gmail.com", // Ensure email format is correct
        password: "hashed_password_3", // Replace with a hashed version for security
        phone: "07437098901",
        workplace: "Google",
    },
];

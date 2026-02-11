export interface Appointment {
    forename: string;
    surname: string;
    email: string; // Consider using a specific email type for validation
    password: string; // Might be a hashed string in a real application
    phone: string; // Consider a specific type for phone numbers
    workplace: string; // Could also represent an object if it has more fields
}
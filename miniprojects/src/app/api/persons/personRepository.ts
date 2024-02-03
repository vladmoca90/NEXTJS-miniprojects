import { allPersons } from "../../../../lib/formPersons/allPersons";
import { Person } from "../../../../lib/formPersons/Person";

export class PersonRepository {
    getPerson(name: string, password: string): Person | null {
        const person = allPersons.find((person) => person.name === name && person.password === password);

        if (!person) {
            return null;
        } else {
            return person;
        }
    }
}
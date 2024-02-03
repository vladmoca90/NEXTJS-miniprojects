import { allPersons } from "../../../../lib/personDetails/allPersons";
import { Person } from "../../../../lib/personDetails/Person";

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
export interface ProfileData { // Renamed to ProfileData
    age: number;
    forename: string;
    nationality: string;
    occupation: string;
    surname: string;
}

export const Profile: ProfileData = { // Updated to use the new interface name
    age: 33,
    forename: "Jack",
    nationality: "British",
    occupation: "Senior Design Producer",
    surname: "McGovern",
};

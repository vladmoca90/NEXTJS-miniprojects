import "./styles/wines.css";
import { useCallback, useState } from "react";
import { Wines } from "./Wines";
import { Wine } from "../../data/wines/Wine";

export default function WinesSell() {
    const winesUrl = "http://localhost:3000/api/wines";

    const [wines, setWines] = useState<Wine[]>([]);

    const getWines = useCallback(async () => {
        const res = await fetch(winesUrl);

        if (!res.ok) {
            throw new Error("The data is not valid!");
        } else {
            console.log("The data is valid!");
        }

        const data = await res.json();

        setWines(data.body);
    }, [winesUrl]);


    return <Wines name={"Vlad Mocanu"} age={33} />
}
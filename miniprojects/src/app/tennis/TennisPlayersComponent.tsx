"use client";
import { useState } from "react";
import { Tennis } from "../../../data/tennis/Tennis";

export const TennisPlayersComponent = () => {
    const playersUrl = "http://localhost:3000/api/tennis-players";

    const [players, setPlayers] = useState<Tennis[]>([]);
    const [query, setQuery] = useState("");

    const getPlayers = () => {

    }

    return (
        <div>
            <h2>Tennis Players</h2>
            <ul>
                <li>Rafael Nadal</li>
                <li>Novak Djokovic</li>
                <li>Stanislas Wawrinka</li>
            </ul>
        </div>
    );
}
"use client";
import { useCallback, useEffect, useState } from "react";
import { Tennis } from "../../../data/tennis/Tennis";
import { error } from "next/dist/build/output/log";

export const TennisPlayersComponent = () => {
  const playersUrl = "http://localhost:3000/api/tennis-players";

  const [players, setPlayers] = useState<Tennis[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  const getPlayers = useCallback(async () => {
    setLoading(true); // Set loading to true when fetching data

    const res = await fetch(playersUrl);
    if (!res.ok) {
      throw new Error("The data is not valid!");
    }

    const data = await res.json();

    setPlayers(data);
  }, [playersUrl]);

  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>{error}</div>; // Show error state

  return (
    <div className="tennis-players">
      <h2>Tennis Players</h2>
      {players.map((player) => (
        <div key={player.id} className="player-card">
          <h3 className="text-lg font-bold text-center">{player.player}</h3>
          <ul>
            <li>Country: {player.country}</li>
            <li>Ranking: {player.ranking}</li>
            <li>Tournament: {player.tournament}</li>
            <li>Opponent: {player.opponent}</li>
            <li>Aces: {player.aces}</li>
            <li>Double Faults: {player.doubleFaults}</li>
            <li>First Serve Percentage: {player.firstServePercentage}%</li>
            <li>Winners: {player.winners}</li>
            <li>Unforced Errors: {player.unforcedErrors}</li>
            <li>Match Duration: {player.matchDuration}</li>
            <li>Winner: {player.winner ? "Yes" : "No"}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

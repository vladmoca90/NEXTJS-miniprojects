"use client";
import { useCallback, useEffect, useState } from "react";
import "./styles/tennis-players.css";
import { TennisPlayersComponent } from "./tennis/TennisPlayersComponent";
import { Tennis } from "../../data/tennis/Tennis";

const PLAYERS_URL = "/api/tennis-players";

export default function TennisPage() {
  const [players, setPlayers] = useState<Tennis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getPlayers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(PLAYERS_URL);

      if (!response.ok) {
        throw new Error("The tennis players data could not be loaded.");
      }

      const data: Tennis[] = await response.json();

      setPlayers(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void getPlayers();
  }, [getPlayers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>

        <button type="button" onClick={() => void getPlayers()}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <main className="tennis-page margin-auto">
      <TennisPlayersComponent players={players} />
    </main>
  );
}
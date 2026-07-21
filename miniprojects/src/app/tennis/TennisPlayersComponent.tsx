"use client";

import { Tennis } from "../../../data/tennis/Tennis";

export interface PlayersProps {
  players: Tennis[];
}

export const TennisPlayersComponent = ({
  players,
}: PlayersProps) => {
  if (players.length === 0) {
    return (
      <section className="tennis-players">
        <h2>Tennis Players</h2>
        <p>No tennis players found.</p>
      </section>
    );
  }

  return (
    <section className="tennis-players">
      <h2>Tennis Players</h2>

      <div className="players-grid">
        {players.map((player) => (
          <article key={player.id} className="player-card">
            <h3 className="text-center text-lg font-bold">
              {player.player}
            </h3>

            <ul>
              <li>Country: {player.country}</li>
              <li>Ranking: {player.ranking}</li>
              <li>Tournament: {player.tournament}</li>
              <li>Opponent: {player.opponent}</li>
              <li>Aces: {player.aces}</li>
              <li>Double Faults: {player.doubleFaults}</li>
              <li>
                First Serve Percentage: {player.firstServePercentage}%
              </li>
              <li>Winners: {player.winners}</li>
              <li>Unforced Errors: {player.unforcedErrors}</li>
              <li>Match Duration: {player.matchDuration}</li>
              <li>Winner: {player.winner ? "Yes" : "No"}</li>
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};
"use client";

import { Tennis } from "../../../data/tennis/Tennis";

export interface PlayersProps {
  players: Tennis[];
}

export const TennisPlayersComponent = ({ players }: PlayersProps) => {
  if (players.length === 0) {
    return (
      <section className="tennis-players">
        <h2 className="text-2xl font-bold text-center mb-4">
          Tennis Players
        </h2>
        <p>No tennis players found.</p>
      </section>
    );
  }

  return (
    <section className="tennis-players">
      <h2 className="text-2xl font-bold text-center my-4">
        Tennis Players
      </h2>

      <article className="player-card">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Player</th>
              <th className="border px-3 py-2">Country</th>
              <th className="border px-3 py-2">Ranking</th>
              <th className="border px-3 py-2">Tournament</th>
              <th className="border px-3 py-2">Opponent</th>
              <th className="border px-3 py-2">Aces</th>
              <th className="border px-3 py-2">Double Faults</th>
              <th className="border px-3 py-2">1st Serve %</th>
              <th className="border px-3 py-2">Winners</th>
              <th className="border px-3 py-2">Unforced Errors</th>
              <th className="border px-3 py-2">Duration</th>
              <th className="border px-3 py-2">Winner</th>
            </tr>
          </thead>

          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td className="border px-3 py-2 font-semibold">
                  {player.player}
                </td>
                <td className="border px-3 py-2">{player.country}</td>
                <td className="border px-3 py-2">{player.ranking}</td>
                <td className="border px-3 py-2">{player.tournament}</td>
                <td className="border px-3 py-2">{player.opponent}</td>
                <td className="border px-3 py-2">{player.aces}</td>
                <td className="border px-3 py-2">{player.doubleFaults}</td>
                <td className="border px-3 py-2">
                  {player.firstServePercentage}%
                </td>
                <td className="border px-3 py-2">{player.winners}</td>
                <td className="border px-3 py-2">
                  {player.unforcedErrors}
                </td>
                <td className="border px-3 py-2">
                  {player.matchDuration}
                </td>
                <td className="border px-3 py-2 text-center">
                  {player.winner ? "🏆" : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
};
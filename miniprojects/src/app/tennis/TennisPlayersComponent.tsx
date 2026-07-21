"use client";
import { Tennis } from "../../../data/tennis/Tennis";

export interface PlayersProps {
  players: Tennis[];
}

export const TennisPlayersComponent = ({ players }: PlayersProps) => {
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
            <h3 className="text-center text-lg font-bold">{player.player}</h3>

            <table className="w-full border-collapse border border-gray-300 mt-3">
              <tbody>
                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left bg-gray-100">
                    Country
                  </th>
                  <td className="border border-gray-300 px-3 py-2">
                    {player.country}
                  </td>
                </tr>

                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left bg-gray-100">
                    Ranking
                  </th>
                  <td className="border border-gray-300 px-3 py-2">
                    {player.ranking}
                  </td>
                </tr>

                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left bg-gray-100">
                    Tournament
                  </th>
                  <td className="border border-gray-300 px-3 py-2">
                    {player.tournament}
                  </td>
                </tr>

                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left bg-gray-100">
                    Opponent
                  </th>
                  <td className="border border-gray-300 px-3 py-2">
                    {player.opponent}
                  </td>
                </tr>

                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left bg-gray-100">
                    Aces
                  </th>
                  <td className="border border-gray-300 px-3 py-2">
                    {player.aces}
                  </td>
                </tr>

                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left bg-gray-100">
                    Double Faults
                  </th>
                  <td className="border border-gray-300 px-3 py-2">
                    {player.doubleFaults}
                  </td>
                </tr>

                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left bg-gray-100">
                    First Serve %
                  </th>
                  <td className="border border-gray-300 px-3 py-2">
                    {player.firstServePercentage}%
                  </td>
                </tr>

                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left bg-gray-100">
                    Winners
                  </th>
                  <td className="border border-gray-300 px-3 py-2">
                    {player.winners}
                  </td>
                </tr>

                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left bg-gray-100">
                    Unforced Errors
                  </th>
                  <td className="border border-gray-300 px-3 py-2">
                    {player.unforcedErrors}
                  </td>
                </tr>

                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left bg-gray-100">
                    Match Duration
                  </th>
                  <td className="border border-gray-300 px-3 py-2">
                    {player.matchDuration}
                  </td>
                </tr>

                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left bg-gray-100">
                    Winner
                  </th>
                  <td className="border border-gray-300 px-3 py-2">
                    {player.winner ? "Yes" : "No"}
                  </td>
                </tr>
              </tbody>
            </table>
          </article>
        ))}
      </div>
    </section>
  );
};

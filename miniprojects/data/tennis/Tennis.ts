export interface Tennis {
  id: number;
  player: string;
  country: string;
  ranking: number;
  tournament: string;
  opponent: string;
  aces: number;
  doubleFaults: number;
  firstServePercentage: number;
  winners: number;
  unforcedErrors: number;
  matchDuration: string;
  winner: boolean;
}

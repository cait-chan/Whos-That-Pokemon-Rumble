export interface ManifestEntry {
  id: number;
  pokedexNumber: number;
  name: string;
  file: string;
}

export type RoundPhase = "loading" | "guessing" | "revealed" | "error";

export interface GameStats {
  totalGuesses: number;
  correctGuesses: number;
  currentStreak: number;
  bestStreak: number;
}

export const initialStats: GameStats = {
  totalGuesses: 0,
  correctGuesses: 0,
  currentStreak: 0,
  bestStreak: 0,
};

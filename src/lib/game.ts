import type { ManifestEntry } from "../types/game";
import { normalizeForMatch } from "./normalize";

export function checkGuess(guess: string, correctName: string): boolean {
  return normalizeForMatch(guess) === normalizeForMatch(correctName);
}

/** Uniform random entry; optionally avoid `avoidId` when possible. */
export function pickRandomEntry(
  entries: ManifestEntry[],
  avoidId?: number,
): ManifestEntry {
  if (entries.length === 0) {
    throw new Error("Cannot pick from empty manifest");
  }
  if (entries.length === 1) {
    return entries[0]!;
  }
  let choice: ManifestEntry;
  let guard = 0;
  do {
    const i = Math.floor(Math.random() * entries.length);
    choice = entries[i]!;
    guard += 1;
  } while (choice.id === avoidId && guard < 50);
  return choice;
}

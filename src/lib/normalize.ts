/** Normalize for case-insensitive equality (trim + lowercase). */
export function normalizeForMatch(value: string): string {
  return value.trim().toLowerCase();
}

export function isEmptyGuess(value: string): boolean {
  return normalizeForMatch(value) === "";
}

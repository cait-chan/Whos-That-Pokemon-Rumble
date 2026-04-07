import { MANIFEST_URL } from "../config/assets";
import type { ManifestEntry } from "../types/game";

function isManifestEntry(value: unknown): value is ManifestEntry {
  if (value === null || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.id === "number" &&
    typeof o.pokedexNumber === "number" &&
    typeof o.name === "string" &&
    typeof o.file === "string"
  );
}

export async function fetchManifest(): Promise<ManifestEntry[]> {
  const res = await fetch(MANIFEST_URL);
  if (!res.ok) {
    throw new Error(`Manifest request failed (${res.status})`);
  }
  const data: unknown = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Manifest must be a JSON array");
  }
  const entries = data.filter(isManifestEntry);
  if (entries.length !== data.length) {
    throw new Error("Manifest contains invalid entries");
  }
  if (entries.length === 0) {
    throw new Error("Manifest is empty");
  }
  return entries;
}

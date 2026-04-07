/** Public Supabase Storage base (no trailing slash). */
export const SPRITE_BUCKET_BASE_URL =
  "https://wacuvruclukwxxytedst.supabase.co/storage/v1/object/public/rumble-sprites";

export const MANIFEST_URL = `${SPRITE_BUCKET_BASE_URL}/manifest.json`;

export function spriteUrlForFile(file: string): string {
  const trimmed = file.trim();
  const path = trimmed.startsWith("/") ? trimmed.slice(1) : trimmed;
  return `${SPRITE_BUCKET_BASE_URL}/${path}`;
}

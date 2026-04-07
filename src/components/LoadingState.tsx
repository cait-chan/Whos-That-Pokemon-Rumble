export function LoadingState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-slate-600 border-t-amber-400"
        role="status"
        aria-label="Loading"
      />
      <p className="text-sm text-slate-400">Loading Pokémon data…</p>
    </div>
  );
}

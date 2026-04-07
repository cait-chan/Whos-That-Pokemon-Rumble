interface ResultBannerProps {
  visible: boolean;
  correct: boolean;
  pokemonName: string;
}

export function ResultBanner({
  visible,
  correct,
  pokemonName,
}: ResultBannerProps) {
  if (!visible) {
    return (
      <div
        className="min-h-[4.5rem] rounded-xl border border-transparent bg-transparent px-2"
        aria-hidden
      />
    );
  }

  return (
    <div
      className={[
        "min-h-[4.5rem] rounded-xl border px-4 py-3 text-center transition duration-300",
        correct
          ? "border-emerald-500/50 bg-emerald-950/50 text-emerald-100"
          : "border-rose-500/50 bg-rose-950/50 text-rose-100",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <p className="text-lg font-semibold">
        {correct ? "Correct!" : "Not quite."}
      </p>
      <p className="mt-1 text-sm opacity-90">
        It’s <span className="font-semibold text-white">{pokemonName}</span>.
      </p>
    </div>
  );
}

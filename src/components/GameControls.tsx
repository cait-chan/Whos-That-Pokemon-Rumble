import type { RefObject } from "react";

interface GameControlsProps {
  phase: "guessing" | "revealed";
  onGuess: () => void;
  onNext: () => void;
  onResetStats: () => void;
  guessDisabled: boolean;
  nextRef?: RefObject<HTMLButtonElement | null>;
}

export function GameControls({
  phase,
  onGuess,
  onNext,
  onResetStats,
  guessDisabled,
  nextRef,
}: GameControlsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
      {phase === "guessing" ? (
        <button
          type="button"
          onClick={onGuess}
          disabled={guessDisabled}
          className="order-1 w-full rounded-xl bg-amber-500 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/25 transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300 disabled:shadow-none sm:order-none sm:w-auto sm:min-w-[10rem]"
        >
          Guess
        </button>
      ) : (
        <button
          ref={nextRef}
          type="button"
          onClick={onNext}
          className="order-1 w-full rounded-xl bg-amber-500 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/25 transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 sm:order-none sm:w-auto sm:min-w-[10rem]"
        >
          Next
        </button>
      )}
      <button
        type="button"
        onClick={onResetStats}
        className="order-2 w-full rounded-xl border border-slate-600 bg-slate-800/80 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 sm:order-none sm:w-auto"
      >
        Reset stats
      </button>
    </div>
  );
}

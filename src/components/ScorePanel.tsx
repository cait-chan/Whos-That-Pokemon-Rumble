import type { GameStats } from "../types/game";

interface ScorePanelProps {
  stats: GameStats;
}

export function ScorePanel({ stats }: ScorePanelProps) {
  const accuracy =
    stats.totalGuesses > 0
      ? Math.round((stats.correctGuesses / stats.totalGuesses) * 100)
      : null;

  return (
    <section
      className="rounded-xl border border-slate-700/80 bg-slate-900/40 p-4"
      aria-label="Game statistics"
    >
      <h2 className="sr-only">Statistics</h2>
      <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-slate-500">Guesses</dt>
          <dd className="text-lg font-semibold tabular-nums text-white">
            {stats.totalGuesses}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">Correct</dt>
          <dd className="text-lg font-semibold tabular-nums text-emerald-300">
            {stats.correctGuesses}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">Streak</dt>
          <dd className="text-lg font-semibold tabular-nums text-amber-300">
            {stats.currentStreak}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">Best</dt>
          <dd className="text-lg font-semibold tabular-nums text-white">
            {stats.bestStreak}
          </dd>
        </div>
      </dl>
      {accuracy !== null && (
        <p className="mt-3 border-t border-slate-700/80 pt-3 text-center text-xs text-slate-400">
          Accuracy:{" "}
          <span className="font-medium text-slate-300">{accuracy}%</span>
        </p>
      )}
    </section>
  );
}

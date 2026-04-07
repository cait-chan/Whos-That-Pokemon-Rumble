interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-2xl border border-rose-500/40 bg-rose-950/30 p-8 text-center">
      <p className="text-lg font-medium text-rose-100">Something went wrong</p>
      <p className="max-w-sm text-sm text-rose-200/80">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
      >
        Try again
      </button>
    </div>
  );
}

import type { FormEvent } from "react";

interface GuessFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  inputId: string;
}

export function GuessForm({
  value,
  onChange,
  onSubmit,
  disabled,
  inputId,
}: GuessFormProps) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!disabled) onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor={inputId} className="text-sm font-medium text-slate-300">
        Your guess
      </label>
      <input
        id={inputId}
        type="text"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Type a Pokémon name…"
        className="w-full rounded-xl border border-slate-600 bg-slate-900/80 px-4 py-3 text-base text-white placeholder:text-slate-500 outline-none ring-amber-400/0 transition focus:border-amber-400/60 focus:ring-4 focus:ring-amber-400/20 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </form>
  );
}

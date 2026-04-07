import type { ReactNode } from "react";

interface GameShellProps {
  title?: string;
  children: ReactNode;
}

export function GameShell({
  title = "Who’s That Pokémon?",
  children,
}: GameShellProps) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-4 py-8 sm:px-6 sm:py-10">
        <header className="mb-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-400/90">
            Rumble World
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h1>
        </header>
        <main className="flex flex-1 flex-col gap-6">{children}</main>
        <footer className="mt-8 text-center text-xs text-slate-500">
          Personal project — sprites from Pokémon Rumble World.
        </footer>
      </div>
    </div>
  );
}

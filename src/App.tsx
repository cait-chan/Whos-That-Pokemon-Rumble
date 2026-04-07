import { useCallback, useEffect, useId, useRef, useState } from "react";
import { spriteUrlForFile } from "./config/assets";
import { GameControls } from "./components/GameControls";
import { GameShell } from "./components/GameShell";
import { GuessForm } from "./components/GuessForm";
import { ErrorState } from "./components/ErrorState";
import { LoadingState } from "./components/LoadingState";
import { ResultBanner } from "./components/ResultBanner";
import { ScorePanel } from "./components/ScorePanel";
import { SpriteStage } from "./components/SpriteStage";
import { checkGuess, pickRandomEntry } from "./lib/game";
import { fetchManifest } from "./lib/manifest";
import { isEmptyGuess } from "./lib/normalize";
import type { ManifestEntry, RoundPhase } from "./types/game";
import { initialStats, type GameStats } from "./types/game";

export default function App() {
  const guessInputId = useId();
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const [phase, setPhase] = useState<RoundPhase>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [manifest, setManifest] = useState<ManifestEntry[]>([]);
  const [current, setCurrent] = useState<ManifestEntry | null>(null);
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [imageError, setImageError] = useState(false);
  const [emptyGuessHint, setEmptyGuessHint] = useState(false);
  const [stats, setStats] = useState<GameStats>({ ...initialStats });

  const loadGame = useCallback(async () => {
    setPhase("loading");
    setErrorMessage(null);
    try {
      const entries = await fetchManifest();
      setManifest(entries);
      const first = pickRandomEntry(entries);
      setCurrent(first);
      setGuess("");
      setRevealed(false);
      setLastCorrect(null);
      setImageError(false);
      setEmptyGuessHint(false);
      setPhase("guessing");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setErrorMessage(msg);
      setPhase("error");
    }
  }, []);

  useEffect(() => {
    void loadGame();
  }, [loadGame]);

  const startRound = useCallback(
    (entries: ManifestEntry[], avoidId?: number) => {
      const next = pickRandomEntry(entries, avoidId);
      setCurrent(next);
      setGuess("");
      setRevealed(false);
      setLastCorrect(null);
      setImageError(false);
      setEmptyGuessHint(false);
      setPhase("guessing");
    },
    [],
  );

  const submitGuess = useCallback(() => {
    if (phase !== "guessing" || revealed || !current) return;
    if (isEmptyGuess(guess)) {
      setEmptyGuessHint(true);
      return;
    }
    setEmptyGuessHint(false);
    const ok = checkGuess(guess, current.name);
    setLastCorrect(ok);
    setRevealed(true);
    setPhase("revealed");
    setStats((s) => {
      const totalGuesses = s.totalGuesses + 1;
      const correctGuesses = s.correctGuesses + (ok ? 1 : 0);
      const currentStreak = ok ? s.currentStreak + 1 : 0;
      const bestStreak = Math.max(s.bestStreak, currentStreak);
      return { totalGuesses, correctGuesses, currentStreak, bestStreak };
    });
  }, [phase, revealed, current, guess]);

  const goNext = useCallback(() => {
    if (phase !== "revealed" || manifest.length === 0) return;
    startRound(manifest, current?.id);
  }, [phase, manifest, current?.id, startRound]);

  const resetStats = useCallback(() => {
    setStats({ ...initialStats });
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (phase === "guessing" && e.key === "Enter") {
        e.preventDefault();
        submitGuess();
      }
      if (phase === "revealed" && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        goNext();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, submitGuess, goNext]);

  useEffect(() => {
    if (phase === "revealed") {
      nextButtonRef.current?.focus();
    }
  }, [phase]);

  if (phase === "loading") {
    return (
      <GameShell>
        <LoadingState />
      </GameShell>
    );
  }

  if (phase === "error" && errorMessage) {
    return (
      <GameShell>
        <ErrorState message={errorMessage} onRetry={() => void loadGame()} />
      </GameShell>
    );
  }

  if (!current) {
    return (
      <GameShell>
        <ErrorState
          message="No Pokémon loaded."
          onRetry={() => void loadGame()}
        />
      </GameShell>
    );
  }

  const spriteSrc = spriteUrlForFile(current.file);
  const showResult = phase === "revealed";

  return (
    <GameShell>
      <SpriteStage
        src={spriteSrc}
        accessibleLabel={
          showResult
            ? `Pokémon revealed: ${current.name}`
            : "Hidden Pokémon — guess from the silhouette"
        }
        hidden={!showResult || imageError}
        imageError={imageError}
        onImageError={() => setImageError(true)}
      />

      <GuessForm
        value={guess}
        onChange={setGuess}
        onSubmit={submitGuess}
        disabled={showResult}
        inputId={guessInputId}
      />
      {emptyGuessHint && !showResult && (
        <p className="text-center text-sm text-amber-300/90" role="alert">
          Enter a name before guessing.
        </p>
      )}

      <ResultBanner
        visible={showResult}
        correct={lastCorrect === true}
        pokemonName={current.name}
      />

      <ScorePanel stats={stats} />

      <GameControls
        phase={showResult ? "revealed" : "guessing"}
        onGuess={submitGuess}
        onNext={goNext}
        onResetStats={resetStats}
        guessDisabled={showResult}
        nextRef={nextButtonRef}
      />
    </GameShell>
  );
}

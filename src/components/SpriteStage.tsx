interface SpriteStageProps {
  src: string;
  /** Describe the stage for assistive tech without spoiling the answer while hidden. */
  accessibleLabel: string;
  hidden: boolean;
  imageError: boolean;
  onImageError: () => void;
}

export function SpriteStage({
  src,
  accessibleLabel,
  hidden,
  imageError,
  onImageError,
}: SpriteStageProps) {
  return (
    <div className="relative mx-auto flex w-full max-w-xs flex-col items-center justify-center sm:max-w-sm">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div className="h-56 w-56 rounded-full bg-amber-400/25 blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute h-40 w-40 rounded-full bg-amber-300/15 blur-2xl" />
      </div>
      <div
        className="relative z-10 flex h-52 w-52 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-900/60 shadow-stage backdrop-blur-sm sm:h-60 sm:w-60"
        role="img"
        aria-label={accessibleLabel}
      >
        {imageError ? (
          <p className="px-4 text-center text-sm text-amber-200/90">
            Couldn’t load sprite. Check the file in storage or try the next
            round.
          </p>
        ) : (
          <img
            src={src}
            alt=""
            draggable={false}
            onError={onImageError}
            className={[
              "max-h-[85%] max-w-[85%] object-contain transition-[filter,transform] duration-500 ease-out",
              hidden
                ? "grayscale brightness-0 contrast-100"
                : "grayscale-0 brightness-100 scale-100",
            ].join(" ")}
          />
        )}
      </div>
    </div>
  );
}

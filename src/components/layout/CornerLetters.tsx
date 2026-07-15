/** Decorative corner letters — EINA-style framing */
export function CornerLetters() {
  const letters = [
    { char: "N", className: "left-4 top-4 lg:left-8 lg:top-8" },
    { char: "E", className: "right-4 top-4 lg:right-8 lg:top-8" },
    { char: "O", className: "left-4 bottom-4 lg:left-8 lg:bottom-8" },
    { char: "S", className: "right-4 bottom-4 lg:right-8 lg:bottom-8" },
  ] as const;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] hidden select-none lg:block"
      aria-hidden="true"
    >
      {letters.map(({ char, className }) => (
        <span
          key={char}
          className={`absolute font-display text-[clamp(3rem,8vw,7rem)] leading-none text-accent/15 ${className}`}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

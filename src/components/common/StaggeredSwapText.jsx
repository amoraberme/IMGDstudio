function splitCharacters(text) {
  return Array.from(text).map((character) => (character === " " ? "\u00A0" : character));
}

function renderCharacters(text) {
  return splitCharacters(text).map((character, index) => (
    <span
      key={`${character}-${index}`}
      className="staggered-swap-char"
      style={{ "--stagger-index": index }}
    >
      {character}
    </span>
  ));
}

export default function StaggeredSwapText({
  label,
  hoverLabel = label,
  align = "start",
  className = "",
}) {
  const measureLabel = hoverLabel.length > label.length ? hoverLabel : label;
  const classes = [
    "staggered-swap-text",
    align === "center" ? "is-centered" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      <span className="visually-hidden">{label}</span>
      <span className="staggered-swap-measure" aria-hidden="true">
        {measureLabel}
      </span>
      <span className="staggered-swap-stage" aria-hidden="true">
        <span className="staggered-swap-row is-primary">{renderCharacters(label)}</span>
        <span className="staggered-swap-row is-secondary">{renderCharacters(hoverLabel)}</span>
      </span>
    </span>
  );
}

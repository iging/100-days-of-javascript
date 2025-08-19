const GameOption = ({
  choice,
  onClick,
  isSelected,
  animate = "",
  hover = "",
  transition = "",
  player = "",
}) => {
  // Map of icons for each choice with improved visuals
  const icons = {
    rock: "🪨",
    paper: "📜",
    scissors: "✂️",
  };

  // Monochromatic element styling
  const elementColors = {
    rock: {
      bg: "from-zinc-700 to-zinc-900",
      glow: "gray-400",
      aura: "rgba(161, 161, 170, 0.4)",
    },
    paper: {
      bg: "from-zinc-600 to-zinc-800",
      glow: "gray-300",
      aura: "rgba(212, 212, 216, 0.4)",
    },
    scissors: {
      bg: "from-zinc-800 to-black",
      glow: "gray-500",
      aura: "rgba(113, 113, 122, 0.4)",
    },
  };

  const colors = elementColors[choice] || elementColors.rock;

  // Determine appropriate classes based on props
  const baseClasses =
    "relative flex items-center justify-center rounded-full shadow-xl overflow-hidden";
  const sizeClasses = isSelected
    ? "w-24 h-24 md:w-36 md:h-36"
    : "w-20 h-20 md:w-32 md:h-32";
  const selectedClasses = isSelected
    ? "ring-2 ring-white/30 shadow-[0_0_12px_3px_rgba(255,255,255,0.15)]"
    : "";
  const hoverClasses = !isSelected ? hover : "";
  const playerClasses =
    player === "player"
      ? "player-weapon-mono"
      : player === "computer"
      ? "computer-weapon-mono"
      : "selection-weapon-mono";

  return (
    <div
      className={`${baseClasses} ${sizeClasses} ${selectedClasses} ${hoverClasses} ${animate} ${transition} ${playerClasses} cursor-pointer backdrop-blur-sm`}
      onClick={onClick}
      aria-label={choice}
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.bg} z-0`}
      ></div>

      {/* Glass effect layers */}
      <div className="absolute inset-0 bg-white/5 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20"></div>

      {/* Element energy aura */}
      <div
        className={`absolute inset-2 rounded-full bg-gradient-radial from-white/20 to-transparent z-30 opacity-75`}
      ></div>

      {/* Icon with 3D effect */}
      <div className="relative z-40 flex items-center justify-center w-full h-full">
        <div className="flex items-center justify-center transform hover:scale-105 transition-transform">
          <span
            role="img"
            aria-label={choice}
            className="text-4xl md:text-5xl grayscale"
            style={{
              filter: `grayscale(1) drop-shadow(0 0 8px ${colors.aura}) drop-shadow(0 0 4px ${colors.aura})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            {icons[choice]}
          </span>
        </div>
      </div>

      {/* Power pulse for selected options */}
      {isSelected && (
        <div className="absolute -inset-2 z-0 power-pulse-mono"></div>
      )}
    </div>
  );
};

export default GameOption;

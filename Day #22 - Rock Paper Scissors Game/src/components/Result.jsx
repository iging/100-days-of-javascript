import { useEffect, useState } from "react";

const Result = ({ result, resetGame }) => {
  const [showEffect, setShowEffect] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sequence the animations for a more dramatic effect
    const showTimer = setTimeout(() => {
      setShowEffect(true);

      // Then show the result text and button
      setTimeout(() => {
        setIsVisible(true);
      }, 800);
    }, 300);

    return () => clearTimeout(showTimer);
  }, []);

  // Determine appropriate message and styling based on result
  let message = "";
  let animationClass = "";
  let bgColorClass = "";
  let symbolElement = null;

  switch (result) {
    case "win":
      message = "You Win!";
      animationClass = "result-win-animation-mono";
      bgColorClass = "from-white to-gray-300";
      symbolElement = <span className="text-3xl">🏆</span>;
      break;
    case "lose":
      message = "You Lose!";
      animationClass = "result-lose-animation-mono";
      bgColorClass = "from-zinc-700 to-zinc-900";
      symbolElement = <span className="text-3xl">💥</span>;
      break;
    case "draw":
      message = "It's a Draw!";
      animationClass = "result-draw-animation-mono";
      bgColorClass = "from-gray-500 to-gray-700";
      symbolElement = <span className="text-3xl">🤝</span>;
      break;
    default:
      message = "Unknown Result";
      bgColorClass = "from-gray-600 to-gray-800";
  }

  return (
    <div className="my-8 text-center relative z-10 mx-auto">
      {/* Background effect layer */}
      <div
        className={`absolute inset-0 result-bg-mono ${
          showEffect ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      ></div>

      {/* Energy burst effect */}
      {showEffect && <div className="result-energy-burst-mono"></div>}

      {/* Result announcement */}
      <div
        className={`relative z-10 transform transition-all duration-700 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="relative inline-block px-8 py-4 bg-black/40 rounded-2xl backdrop-blur-sm border border-white/10">
          <div
            className={`flex items-center justify-center text-3xl md:text-4xl font-bold ${animationClass}`}
          >
            {symbolElement}
            <span className="mx-3 result-message-mono">{message}</span>
            {symbolElement}
          </div>
        </div>

        {/* Play again button with hover effects */}
        <div className="mt-8">
          <button
            onClick={resetGame}
            className={`relative px-8 py-4 rounded-full bg-gradient-to-r ${bgColorClass} ${
              result === "win" ? "text-black" : "text-white"
            } font-bold transition-all duration-300 shadow-lg hover:shadow-xl button-glow-mono`}
          >
            {/* Button content with 3D effect */}
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-lg">Play Again</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>

            {/* Button particles */}
            <div className="button-particles"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;

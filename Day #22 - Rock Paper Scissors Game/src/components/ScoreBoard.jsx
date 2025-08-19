import { useState, useEffect } from "react";

const ScoreBoard = ({ score }) => {
  const [isFlashing, setIsFlashing] = useState({
    player: false,
    computer: false,
  });
  const [prevScore, setPrevScore] = useState({ player: 0, computer: 0 });
  const [scoreCounter, setScoreCounter] = useState({ player: 0, computer: 0 });

  // Flash effect when score changes
  useEffect(() => {
    if (score.player > prevScore.player) {
      setIsFlashing({ player: true, computer: false });

      // Animated counter effect
      const startValue = prevScore.player;
      const endValue = score.player;
      let current = startValue;
      const increment = 1;
      const stepTime = 100;

      const timer = setInterval(() => {
        current += increment;
        setScoreCounter((prev) => ({ ...prev, player: current }));

        if (current >= endValue) {
          clearInterval(timer);
          setScoreCounter((prev) => ({ ...prev, player: endValue }));
        }
      }, stepTime);

      setTimeout(() => setIsFlashing({ player: false, computer: false }), 1500);
    } else if (score.computer > prevScore.computer) {
      setIsFlashing({ player: false, computer: true });

      // Animated counter effect
      const startValue = prevScore.computer;
      const endValue = score.computer;
      let current = startValue;
      const increment = 1;
      const stepTime = 100;

      const timer = setInterval(() => {
        current += increment;
        setScoreCounter((prev) => ({ ...prev, computer: current }));

        if (current >= endValue) {
          clearInterval(timer);
          setScoreCounter((prev) => ({ ...prev, computer: endValue }));
        }
      }, stepTime);

      setTimeout(() => setIsFlashing({ player: false, computer: false }), 1500);
    }

    setPrevScore(score);
  }, [score, prevScore]);

  return (
    <div className="w-full max-w-sm mx-auto mb-8 relative">
      {/* Monochromatic scorecard */}
      <div className="scorecard-hologram-mono">
        <div className="relative rounded-xl overflow-hidden bg-black/70 backdrop-blur-sm shadow-xl border border-white/10">
          {/* Horizontal lines */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/0 via-white/30 to-white/0"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/0 via-white/30 to-white/0"></div>

          <div className="grid grid-cols-3 items-center py-4 px-6">
            {/* Player score */}
            <div
              className={`text-center ${
                isFlashing.player ? "score-flash-mono" : ""
              }`}
            >
              <div className="mb-1 text-sm font-medium text-white/80 uppercase">
                YOU
              </div>
              <div className="player-score">
                <div className="text-4xl font-bold text-white">
                  {scoreCounter.player}
                </div>
                {isFlashing.player && (
                  <div className="text-sm text-white/80 animate-bounce">+1</div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-white/60">VS</div>
            </div>

            {/* Computer score */}
            <div
              className={`text-center ${
                isFlashing.computer ? "score-flash-mono" : ""
              }`}
            >
              <div className="mb-1 text-sm font-medium text-white/80 uppercase">
                CPU
              </div>
              <div className="computer-score">
                <div className="text-4xl font-bold text-white">
                  {scoreCounter.computer}
                </div>
                {isFlashing.computer && (
                  <div className="text-sm text-white/80 animate-bounce">+1</div>
                )}
              </div>
            </div>
          </div>

          {/* Power indicators */}
          <div className="absolute bottom-1 left-4 right-4 flex justify-between">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={`player-power-${i}`}
                  className={`h-1 w-2 rounded-full ${
                    i < Math.min(score.player, 5) ? "bg-white" : "bg-white/20"
                  }`}
                ></div>
              ))}
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={`computer-power-${i}`}
                  className={`h-1 w-2 rounded-full ${
                    i < Math.min(score.computer, 5) ? "bg-white" : "bg-white/20"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Digital noise effect */}
          <div className="absolute inset-0 pointer-events-none digital-noise opacity-10"></div>
        </div>
      </div>

      {/* Hologram reflection */}
      <div className="hologram-reflection-mono"></div>
    </div>
  );
};

export default ScoreBoard;

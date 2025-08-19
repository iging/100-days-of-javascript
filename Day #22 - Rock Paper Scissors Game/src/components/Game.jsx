import { useState, useEffect } from "react";
import ScoreBoard from "./ScoreBoard";
import GameOption from "./GameOption";
import Result from "./Result";
import Leaderboard from "./Leaderboard";
import {
  getSavedGameData,
  saveGameData,
  cleanupInactiveUsers,
} from "../services/gameService";

const choices = ["rock", "paper", "scissors"];
const MAX_SCORE = 5;

const Game = ({ username }) => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");

  // Load saved game data on component mount
  useEffect(() => {
    // Clean up inactive users
    cleanupInactiveUsers();

    if (username) {
      const savedData = getSavedGameData(username);
      if (savedData && savedData.score) {
        setScore(savedData.score);
      }
    }
  }, [username]);

  // Save game data when score changes
  useEffect(() => {
    if (username) {
      saveGameData(username, { score });
    }

    // Check if game should end
    if (score.player >= MAX_SCORE) {
      setGameOver(true);
      setGameOverMessage("You won the match!");
    } else if (score.computer >= MAX_SCORE) {
      setGameOver(true);
      setGameOverMessage("Computer won the match!");
    }
  }, [score, username]);

  const handleChoice = (choice) => {
    if (isAnimating || gameOver) return;

    setIsAnimating(true);
    setPlayerChoice(choice);

    // Delay computer choice for animation effect
    setTimeout(() => {
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      setComputerChoice(randomChoice);

      // Determine the winner
      const gameResult = determineWinner(choice, randomChoice);

      // Delay result for dramatic effect
      setTimeout(() => {
        setResult(gameResult);

        // Update score
        if (gameResult === "win") {
          setScore((prev) => ({
            ...prev,
            player: Math.min(prev.player + 1, MAX_SCORE),
          }));
        } else if (gameResult === "lose") {
          setScore((prev) => ({
            ...prev,
            computer: Math.min(prev.computer + 1, MAX_SCORE),
          }));
        }
      }, 800);

      // Reset animation state
      setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
    }, 800);
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return "draw";

    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "win";
    }

    return "lose";
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setIsAnimating(false);

    if (gameOver) {
      setScore({ player: 0, computer: 0 });
      setGameOver(false);
      setGameOverMessage("");
    }
  };

  const toggleLeaderboard = () => {
    setShowLeaderboard((prev) => !prev);
  };

  return (
    <div className="w-full max-w-4xl px-4 py-8 mx-auto">
      {/* Header with title and leaderboard toggle */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          <span className="mr-2">👋</span> Hi, {username}
        </h1>

        <button
          onClick={toggleLeaderboard}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 text-white"
        >
          {showLeaderboard ? "Back to Game" : "Leaderboard"}
        </button>
      </div>

      {showLeaderboard ? (
        <Leaderboard />
      ) : (
        <div className="game-container">
          <ScoreBoard score={score} />

          {gameOver ? (
            <div className="my-8 text-center relative z-10 mx-auto">
              <div className="relative inline-block px-8 py-4 bg-black/40 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-center text-3xl md:text-4xl font-bold text-white">
                  <span className="text-3xl mr-3">🏆</span>
                  <span className="mx-3">{gameOverMessage}</span>
                  <span className="text-3xl ml-3">🏆</span>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={resetGame}
                  className="relative px-8 py-4 rounded-full bg-gradient-to-r from-white to-gray-300 text-black font-bold transition-all duration-300 shadow-lg hover:shadow-xl button-glow-mono"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-lg">New Game</span>
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
                </button>
              </div>
            </div>
          ) : (
            <>
              {!playerChoice && !result && (
                <div className="text-center mb-8">
                  <p className="text-xl text-white/70 mb-6">
                    Choose your weapon
                  </p>
                </div>
              )}

              <div className="my-8">
                {playerChoice ? (
                  <div className="flex flex-col md:flex-row gap-16 items-center justify-center">
                    <div className="text-center">
                      <h2 className="text-lg font-medium mb-3 text-white/90">
                        You
                      </h2>
                      <GameOption
                        choice={playerChoice}
                        isSelected={true}
                        animate={
                          isAnimating ? "player-choice-animation-mono" : ""
                        }
                        onClick={() => {}}
                        player="player"
                      />
                    </div>

                    <div className="text-3xl font-bold text-white/50 my-4">
                      VS
                    </div>

                    <div className="text-center">
                      <h2 className="text-lg font-medium mb-3 text-white/90">
                        Computer
                      </h2>
                      <GameOption
                        choice={computerChoice}
                        isSelected={true}
                        animate={
                          isAnimating && !computerChoice
                            ? "computer-choice-animation-mono"
                            : ""
                        }
                        onClick={() => {}}
                        player="computer"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                    {choices.map((choice) => (
                      <div
                        key={choice}
                        className="text-center flex flex-col items-center"
                      >
                        <div className="mb-3">
                          <GameOption
                            choice={choice}
                            onClick={() => handleChoice(choice)}
                            hover="hover:ring-1 hover:ring-white/30"
                            transition="transition-all duration-300"
                            player="selection"
                          />
                        </div>
                        <p className="text-center text-base capitalize text-white/70 w-full">
                          {choice}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {result && <Result result={result} resetGame={resetGame} />}

              {!result && playerChoice && (
                <div className="text-center my-6">
                  <div className="inline-block p-3 bg-black rounded-lg border border-white/10">
                    <div className="animate-pulse text-white/70">
                      Processing...
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;

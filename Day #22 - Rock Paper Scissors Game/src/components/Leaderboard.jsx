import { useState, useEffect } from "react";
import {
  getLeaderboard,
  deleteUser,
  cleanupInactiveUsers,
} from "../services/gameService";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const [cleanupMessage, setCleanupMessage] = useState(null);

  const loadLeaderboardData = () => {
    setIsLoading(true);
    setTimeout(() => {
      const data = getLeaderboard();
      setLeaderboardData(data);
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    // Simulate a network request for SaaS-like experience
    loadLeaderboardData();
  }, []);

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player === selectedPlayer ? null : player);
  };

  const confirmDeletePlayer = (e, username) => {
    e.stopPropagation();
    setPlayerToDelete(username);
    setShowDeleteConfirm(true);
  };

  const handleDeletePlayer = () => {
    if (playerToDelete) {
      deleteUser(playerToDelete);
      setShowDeleteConfirm(false);
      setPlayerToDelete(null);
      if (selectedPlayer === playerToDelete) {
        setSelectedPlayer(null);
      }
      // Reload leaderboard data
      loadLeaderboardData();
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setPlayerToDelete(null);
  };

  const handleCleanupInactive = () => {
    const deletedCount = cleanupInactiveUsers();
    setCleanupMessage(`${deletedCount} inactive players removed.`);

    // Clear message after 3 seconds
    setTimeout(() => {
      setCleanupMessage(null);
    }, 3000);

    // Reload the leaderboard data
    loadLeaderboardData();
  };

  if (isLoading) {
    return (
      <div className="relative p-8 bg-black/50 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full scanner-overlay-mono"></div>
        <div className="absolute top-0 left-0 w-full h-full grid-overlay-mono"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Leaderboard</h2>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-white animate-pulse mr-2"></div>
              <span className="text-xs text-white/70 uppercase tracking-wider">
                Scanning...
              </span>
            </div>
          </div>

          <div className="space-y-6 animate-pulse">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-14 bg-white/5 rounded-lg overflow-hidden"
              >
                <div className="h-full w-full loading-bar-mono"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-6 bg-black/60 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full scanner-overlay-mono"></div>
      <div className="absolute top-0 left-0 w-full h-full grid-overlay-mono"></div>

      {/* Horizontal lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/0 via-white/30 to-white/0"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/0 via-white/30 to-white/0"></div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <div className="relative bg-zinc-900 p-6 rounded-xl border border-white/20 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Delete Player</h3>
            <p className="text-white/80 mb-6">
              Are you sure you want to delete {playerToDelete}? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePlayer}
                className="px-4 py-2 rounded-lg bg-red-500/80 text-white hover:bg-red-600/80 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
          <button
            onClick={handleCleanupInactive}
            className="px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-white flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clean Inactive
          </button>
        </div>

        {/* Cleanup message */}
        {cleanupMessage && (
          <div className="mb-4 py-2 px-4 bg-white/10 border border-white/20 rounded-lg text-white text-sm">
            {cleanupMessage}
          </div>
        )}

        {leaderboardData.length === 0 ? (
          <div className="text-center py-6 bg-white/5 rounded-lg">
            <div className="inline-block p-3 rounded-full bg-white/10 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white/70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <p className="text-white text-base">
              No players have entered the arena yet
            </p>
            <p className="text-white/50 mt-1 text-sm">
              Be the first to claim victory!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Leaderboard header */}
            <div className="grid grid-cols-12 text-xs text-white/60 uppercase mb-1 px-3">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Player</div>
              <div className="col-span-2 text-center">Wins</div>
              <div className="col-span-2 text-center">Losses</div>
              <div className="col-span-3 text-center">Win Streak</div>
              <div className="col-span-1 text-center">Action</div>
            </div>

            {/* Leaderboard rows */}
            {leaderboardData.slice(0, 5).map((player, index) => {
              // Cap wins at 5 for display
              const displayWins = Math.min(player.wins, 5);
              const winPercentage =
                player.losses > 0
                  ? Math.round(
                      (player.wins / (player.wins + player.losses)) * 100
                    )
                  : player.wins > 0
                  ? 100
                  : 0;

              const isSelected = selectedPlayer === player.username;
              const lastPlayedDate = player.lastPlayed
                ? new Date(player.lastPlayed).toLocaleDateString()
                : "Never";

              return (
                <div
                  key={player.username}
                  className={`relative bg-white/5 hover:bg-white/10 rounded-lg transition-colors duration-300 ${
                    isSelected ? "bg-white/15 ring-1 ring-white/20" : ""
                  }`}
                  onClick={() => handlePlayerSelect(player.username)}
                >
                  <div className="grid grid-cols-12 items-center p-3">
                    {/* Rank */}
                    <div className="col-span-1 font-bold text-white/80">
                      {index === 0 ? (
                        <span className="text-xl">👑</span>
                      ) : (
                        index + 1
                      )}
                    </div>

                    {/* Username with active status */}
                    <div className="col-span-3">
                      <div className="font-medium text-white truncate flex items-center">
                        {player.username}
                        <span
                          className={`ml-2 w-2 h-2 rounded-full ${
                            player.isActive ? "bg-green-400" : "bg-red-400"
                          }`}
                        ></span>
                      </div>
                      <div className="text-xs text-white/50">
                        Last played: {lastPlayedDate}
                      </div>
                    </div>

                    {/* Wins */}
                    <div className="col-span-2 text-center font-medium text-white">
                      {displayWins}/5
                    </div>

                    {/* Losses */}
                    <div className="col-span-2 text-center text-white/80">
                      {player.losses}
                    </div>

                    {/* Win Progress Bar */}
                    <div className="col-span-3">
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-white/50 to-white/70 rounded-full"
                          style={{ width: `${(displayWins / 5) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-right text-white/60">
                        {winPercentage}% win rate
                      </div>
                    </div>

                    {/* Delete action */}
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={(e) => confirmDeletePlayer(e, player.username)}
                        className="text-white/60 hover:text-red-400 transition-colors p-1"
                        title="Delete player"
                      >
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
                            strokeWidth={1.5}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Player details (visible when selected) */}
                  {isSelected && (
                    <div className="p-4 border-t border-white/10 bg-white/5">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-white/60 mb-1">
                            Total Games
                          </div>
                          <div className="text-lg text-white">
                            {player.totalGames}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-white/60 mb-1">
                            Status
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              player.isActive
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {player.isActive ? "Active" : "Inactive"}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer with legend */}
        {leaderboardData.length > 0 && (
          <div className="mt-6 pt-3 border-t border-white/10">
            <div className="flex justify-between items-center text-xs text-white/50">
              <div>👑 = Champion</div>
              <div>
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1"></span>{" "}
                Active
                <span className="ml-2 inline-block w-2 h-2 rounded-full bg-red-400 mr-1"></span>{" "}
                Inactive
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;

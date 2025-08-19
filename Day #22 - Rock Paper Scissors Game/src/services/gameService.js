/**
 * Game Service - Handles persisting game data to localStorage
 * In a real SaaS app, this would be API calls to a backend server
 */

// Key for localStorage
const STORAGE_KEY = "rps_game_data";

// Max win score (for achievement tracking and game reset)
const MAX_WINS = 5;

// Inactivity threshold in milliseconds (7 days)
const INACTIVITY_THRESHOLD = 7 * 24 * 60 * 60 * 1000;

// Get saved game data
export const getSavedGameData = (username) => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return null;

    const parsedData = JSON.parse(savedData);
    const userData = parsedData[username] || null;

    // Reset score if it's already at or above MAX_WINS
    if (
      userData &&
      userData.score &&
      (userData.score.player >= MAX_WINS || userData.score.computer >= MAX_WINS)
    ) {
      return {
        ...userData,
        score: { player: 0, computer: 0 },
        lastGameResult: userData.score.player >= MAX_WINS ? "win" : "loss",
        totalGames: (userData.totalGames || 0) + 1,
      };
    }

    return userData;
  } catch (error) {
    console.error("Error getting saved game data:", error);
    return null;
  }
};

// Save game data
export const saveGameData = (username, gameData) => {
  try {
    // Get existing data
    const existingDataStr = localStorage.getItem(STORAGE_KEY);
    const existingData = existingDataStr ? JSON.parse(existingDataStr) : {};

    // Ensure player wins don't exceed MAX_WINS
    if (gameData.score && gameData.score.player > MAX_WINS) {
      gameData.score.player = MAX_WINS;
    }

    if (gameData.score && gameData.score.computer > MAX_WINS) {
      gameData.score.computer = MAX_WINS;
    }

    // Update data for this user
    existingData[username] = {
      ...existingData[username],
      ...gameData,
      lastUpdated: new Date().toISOString(),
    };

    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
    return true;
  } catch (error) {
    console.error("Error saving game data:", error);
    return false;
  }
};

// Delete a user from the leaderboard
export const deleteUser = (username) => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return false;

    const parsedData = JSON.parse(savedData);
    if (parsedData[username]) {
      delete parsedData[username];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};

// Delete all inactive users (not active for INACTIVITY_THRESHOLD)
export const cleanupInactiveUsers = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return 0;

    const parsedData = JSON.parse(savedData);
    const now = new Date().getTime();
    let deletedCount = 0;

    Object.entries(parsedData).forEach(([username, data]) => {
      const lastUpdated = new Date(data.lastUpdated || 0).getTime();
      if (now - lastUpdated > INACTIVITY_THRESHOLD) {
        delete parsedData[username];
        deletedCount++;
      }
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
    return deletedCount;
  } catch (error) {
    console.error("Error cleaning up inactive users:", error);
    return 0;
  }
};

// Get leaderboard data
export const getLeaderboard = () => {
  try {
    // First clean up inactive users
    cleanupInactiveUsers();

    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return [];

    const parsedData = JSON.parse(savedData);

    // Convert to array and sort by wins
    return Object.entries(parsedData)
      .map(([username, data]) => ({
        username,
        wins: Math.min(data.score?.player || 0, MAX_WINS), // Cap wins at MAX_WINS
        losses: data.score?.computer || 0,
        lastPlayed: data.lastUpdated,
        totalGames: data.totalGames || 0,
        isActive: isUserActive(data.lastUpdated),
      }))
      .sort((a, b) => b.wins - a.wins);
  } catch (error) {
    console.error("Error getting leaderboard data:", error);
    return [];
  }
};

// Helper function to check if a user is active
const isUserActive = (lastUpdateDate) => {
  if (!lastUpdateDate) return false;

  const now = new Date().getTime();
  const lastUpdated = new Date(lastUpdateDate).getTime();
  return now - lastUpdated <= INACTIVITY_THRESHOLD;
};

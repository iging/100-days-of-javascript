import React, { useState } from "react";
import Game from "./components/Game";

const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setShowLogin(false);
    }
  };

  // Simplified login screen with monochromatic theme
  if (showLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="relative z-10 bg-zinc-900/80 p-8 rounded-xl shadow-2xl max-w-md w-full border border-white/10">
          <h1 className="text-4xl font-bold mb-6 text-center text-white">
            Rock Paper Scissors
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
                placeholder="Enter your username"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-all duration-300"
            >
              Start Game
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Simplified main screen with just the game component
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Game username={username} />
    </div>
  );
};

export default App;

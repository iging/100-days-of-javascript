import { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function getWinner(square) {
    for (let combination of winningCombination) {
      const [a, b, c] = combination;

      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  }

  function handleSquareClick(index) {
    if (board[index] || getWinner(board)) return;

    const updateBoard = [...board];
    updateBoard[index] = isXTurn ? "X" : "O";

    setBoard(updateBoard);
    setIsXTurn(!isXTurn);
  }

  function setGameStatus() {
    const winner = getWinner(board);
    if (winner) return `Winner: ${winner}`;
    if (board.every((square) => square !== null)) {
      return "It's a draw!";
    }
    return `Next player: ${isXTurn ? "X" : "O"}`;
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-[400px] mx-5 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-green-400 mb-8 text-center">
          Tic Tac Toe
        </h1>
        <div
          className={`text-center mb-6 ${
            getWinner(board)
              ? "text-2xl font-bold text-green-500 animate-bounce"
              : "text-xl text-gray-300"
          }`}
        >
          {setGameStatus()}
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden mb-6">
          {board.map((square, index) => (
            <button
              key={index}
              onClick={() => handleSquareClick(index)}
              className={`h-32 w-full bg-gray-700 rounded-md text-6xl font-light transition-colors duration-200 hover:bg-gray-600 ${
                square === "X" ? "text-white" : "text-white"
              }`}
            >
              {square}
            </button>
          ))}
        </div>
        <button
          className="w-full py-3 text-lg text-white bg-green-500 rounded-xl hover:bg-green-600 transition-colors duration-200"
          onClick={resetGame}
        >
          New Game
        </button>
      </div>
    </div>
  );
}

export default App;

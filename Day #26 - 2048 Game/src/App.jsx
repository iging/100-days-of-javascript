import React, { useState } from "react";
import "./App.css";
import Information from "./components/Information";
import Board from "./components/Board";

const App = () => {
  const [score, setScore] = useState(0);

  const handleScore = (value) => {
    setScore((prevScore) => prevScore + value);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF8EF] py-8">
      <div className="container max-w-md px-4">
        <Information score={score} />
        <Board handleScore={handleScore} />
      </div>
    </div>
  );
};

export default App;

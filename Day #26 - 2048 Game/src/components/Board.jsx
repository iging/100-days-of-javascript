import React, { useEffect, useRef, useState } from "react";
import Tiles from "./Tiles";

function Board({ handleScore }) {
  const [squares, setSquares] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const squaresRef = useRef(squares);
  const width = 4;
  const boardRef = useRef(null);

  const addRandomTile = (grid) => {
    let zeroIndex = [];
    grid.forEach((val, index) => {
      if (val === 0) {
        zeroIndex.push(index);
      }
    });

    if (zeroIndex.length === 0) return; // No empty cells

    const random = Math.floor(Math.random() * zeroIndex.length);
    grid[zeroIndex[random]] = Math.random() < 0.9 ? 2 : 4; // 10% chance of getting a 4
  };

  const slide = (row) => {
    let filteredRow = row.filter((num) => num);
    let missing = width - filteredRow.length;
    let zeros = Array(missing).fill(0);
    return filteredRow.concat(zeros);
  };

  const combine = (row) => {
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] === row[i + 1] && row[i] !== 0) {
        row[i] = row[i] + row[i + 1];
        row[i + 1] = 0;
        if (handleScore) handleScore(row[i]);
      }
    }
    return row;
  };

  const checkForGameOver = (newSquares) => {
    // Check for 2048 tile
    if (newSquares.includes(2048) && !isWon) {
      setIsWon(true);
    }

    // Check if board is full and no more moves possible
    if (!newSquares.includes(0)) {
      // Check if any moves are possible
      let gameOver = true;

      // Check horizontally
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < width - 1; j++) {
          if (newSquares[i * width + j] === newSquares[i * width + j + 1]) {
            gameOver = false;
            break;
          }
        }
      }

      // Check vertically
      for (let i = 0; i < width - 1; i++) {
        for (let j = 0; j < width; j++) {
          if (newSquares[i * width + j] === newSquares[(i + 1) * width + j]) {
            gameOver = false;
            break;
          }
        }
      }

      if (gameOver) {
        setIsGameOver(true);
      }
    }
  };

  const moveLeft = () => {
    let newSquares = [...squaresRef.current];
    for (let i = 0; i < width; i++) {
      let row = newSquares.slice(i * width, i * width + width);
      row = slide(row);
      row = combine(row);
      row = slide(row);
      newSquares.splice(i * width, width, ...row);
    }
    addRandomTile(newSquares);
    setSquares(newSquares);
    checkForGameOver(newSquares);
  };

  const moveRight = () => {
    let newSquares = [...squaresRef.current];
    for (let i = 0; i < width; i++) {
      let row = newSquares.slice(i * width, i * width + width);
      row = row.reverse();
      row = slide(row);
      row = combine(row);
      row = slide(row);
      row = row.reverse();
      newSquares.splice(i * width, width, ...row);
    }
    addRandomTile(newSquares);
    setSquares(newSquares);
    checkForGameOver(newSquares);
  };

  const moveUp = () => {
    let newSquares = [...squaresRef.current];
    for (let i = 0; i < width; i++) {
      let column = [];
      for (let j = 0; j < width; j++) {
        column.push(newSquares[i + j * width]);
      }
      column = slide(column);
      column = combine(column);
      column = slide(column);
      for (let j = 0; j < width; j++) {
        newSquares[i + j * width] = column[j];
      }
    }
    addRandomTile(newSquares);
    setSquares(newSquares);
    checkForGameOver(newSquares);
  };

  const moveDown = () => {
    let newSquares = [...squaresRef.current];
    for (let i = 0; i < width; i++) {
      let column = [];
      for (let j = 0; j < width; j++) {
        column.push(newSquares[i + j * width]);
      }
      column = column.reverse();
      column = slide(column);
      column = combine(column);
      column = slide(column);
      column = column.reverse();
      for (let j = 0; j < width; j++) {
        newSquares[i + j * width] = column[j];
      }
    }
    addRandomTile(newSquares);
    setSquares(newSquares);
    checkForGameOver(newSquares);
  };

  const handleKeyDown = (event) => {
    if (isGameOver || isWon) return;

    let handled = true;
    switch (event.key) {
      case "ArrowUp":
        moveUp();
        break;
      case "ArrowDown":
        moveDown();
        break;
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowRight":
        moveRight();
        break;
      default:
        handled = false;
    }

    if (handled) {
      event.preventDefault();
    }
  };

  const createGame = () => {
    let x = Array(width * width).fill(0);
    addRandomTile(x);
    addRandomTile(x);
    setSquares(x);
    setIsGameOver(false);
    setIsWon(false);
  };

  const restartGame = () => {
    createGame();
    if (handleScore) handleScore(-Infinity); // Reset score
  };

  // Use a layout effect to prevent board not having focus when game starts
  useEffect(() => {
    createGame();

    // Attach event listener
    const keyDownHandler = (e) => handleKeyDown(e);
    window.addEventListener("keydown", keyDownHandler);

    // Focus the board
    setTimeout(() => {
      if (boardRef.current) {
        boardRef.current.focus();
      }
    }, 100);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    squaresRef.current = squares;
  }, [squares]);

  return (
    <div className="flex flex-col items-center">
      <div
        ref={boardRef}
        tabIndex="0"
        className="relative grid h-auto w-auto grid-cols-4 gap-[12px] rounded-[8px] bg-[#BBADA0] p-[12px] shadow-lg outline-none"
      >
        {squares.map((val, index) => (
          <Tiles key={index} val={val} />
        ))}

        {(isGameOver || isWon) && (
          <div className="bg-opacity-80 absolute inset-0 flex items-center justify-center rounded-[8px] bg-[#eee4da]">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#776E65]">
                {isWon ? "You Won!" : "Game Over!"}
              </h2>
              <button
                onClick={restartGame}
                className="rounded-md bg-[#8f7a66] px-4 py-2 font-bold text-white transition-colors hover:bg-[#9f8a76]"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Board;

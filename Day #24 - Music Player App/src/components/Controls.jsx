import React from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import { IoMdVolumeHigh } from "react-icons/io";
import { useMusicStore } from "../store/UseMusicStore";

const Controls = () => {
  const {
    isPlaying,
    toggleSong,
    nextSong,
    prevSong,
    currentTime,
    duration,
    setCurrentTime,
  } = useMusicStore();

  // Format time in minutes:seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Calculate progress as a percentage
  const progress = (currentTime / duration) * 100 || 0;

  // Handle progress bar click
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const clickPercentage = clickPosition / progressBarWidth;
    const newTime = clickPercentage * duration;

    setCurrentTime(newTime);
  };

  return (
    <div className="w-full mt-4">
      {/* Progress Bar */}
      <div
        className="relative h-1 bg-gray-700 rounded mb-4 cursor-pointer"
        onClick={handleProgressClick}
      >
        <div
          className="absolute top-0 left-0 h-full bg-green-500 shadow-sm shadow-green-500 rounded"
          style={{ width: `${progress}%` }}
        >
          <span className="absolute right-0 top-[-100%] w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
        <div className="flex items-center justify-between pt-2">
          {/* Current Time */}
          <span className="text-xs">{formatTime(currentTime)}</span>
          {/* Max Duration */}
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>
      {/* Controls */}
      <div className="flex justify-around items-center mt-10">
        {/* Previous Song */}
        <button onClick={prevSong}>
          <FaStepBackward className="hover:text-green-600 duration-300" />
        </button>
        {/* Play/Pause */}
        <div className="flex items-center justify-center">
          <button
            onClick={toggleSong}
            className="relative p-4 bg-white rounded-full shadow-lg glow-button"
          >
            {isPlaying ? (
              <FaPause className="text-black" />
            ) : (
              <FaPlay className="text-black" />
            )}
            <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-green-300 to-green-700 opacity-30"></div>
          </button>
        </div>
        {/* Next Song */}
        <button onClick={nextSong}>
          <FaStepForward className="hover:text-green-600 duration-300" />
        </button>
      </div>
    </div>
  );
};

export default Controls;

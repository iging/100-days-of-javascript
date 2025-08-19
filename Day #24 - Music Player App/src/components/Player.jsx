import React, { useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Songs from "./Songs";
import Controls from "./Controls";
import { useMusicStore } from "../store/UseMusicStore";

const Player = () => {
  const audioRef = useRef(null);
  const { initAudio, musicLists, currentSongIndex } = useMusicStore();
  const [audioError, setAudioError] = useState(null);

  useEffect(() => {
    if (audioRef.current) {
      // Capture the current value of the ref
      const audio = audioRef.current;

      // Add error handler for audio
      const handleAudioError = (e) => {
        setAudioError(
          `Error loading audio: ${e.target.error?.message || "Unknown error"}`
        );
      };

      audio.addEventListener("error", handleAudioError);
      initAudio(audio);

      return () => {
        // Use the captured value in the cleanup
        audio.removeEventListener("error", handleAudioError);
      };
    }
  }, [initAudio, currentSongIndex, musicLists]);

  // If there's an audioError, display it
  if (audioError) {
    return (
      <div className="p-8 bg-gray-800 rounded-xl shadow-2xl w-96">
        <div className="text-red-500 text-center">
          <h3 className="font-bold">Audio Error</h3>
          <p>{audioError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-800 rounded-xl shadow-2xl w-96">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={musicLists[currentSongIndex]?.src}
        preload="metadata"
      />

      {/* Header */}
      <div className="w-full flex items-center justify-between mb-8">
        <div className="text-xl text-gray-400">-</div>
        <p className="text-lg font-medium text-gray-200">Playing Now</p>
        <button className="text-gray-400 hover:text-white">
          <HiOutlineMenuAlt3 className="text-2xl" />
        </button>
      </div>
      <Songs />
      <Controls />
    </div>
  );
};

export default Player;

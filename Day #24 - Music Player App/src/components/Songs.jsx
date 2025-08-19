import React from "react";
import { useMusicStore } from "../store/UseMusicStore";

const Songs = () => {
  const { currentSongIndex, musicLists } = useMusicStore();
  const diskRef = React.useRef(null);

  // Check if musicLists is valid and has items
  if (!musicLists || musicLists.length === 0) {
    return <div>No songs available</div>;
  }

  const currentSong = musicLists[currentSongIndex];

  // Check if currentSong is valid
  if (!currentSong) {
    return <div>Song not found</div>;
  }

  return (
    <div className="flex flex-col items-center mb-8">
      {/* Disk */}
      <div className="relative w-48 h-48 mb-6">
        {/* Disk With Image */}
        <img
          ref={diskRef}
          src={currentSong.img}
          alt={currentSong.title}
          className="absolute w-full h-full object-cover object-center z-20 rounded-full"
        />
        {/* Disk Shadow */}
        <div className="absolute top-[-5%] left-[-5%] rounded-full glow-ring w-[110%] h-[110%] bg-gradient-to-r from-green-300 to-blue-400 opacity-30"></div>
      </div>

      {/* Song title and artist - Moved outside the disk div */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-white">{currentSong.title}</h2>
        <p className="text-gray-400">{currentSong.artist}</p>
      </div>
    </div>
  );
};

export default Songs;

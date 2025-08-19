import React from "react";

const Data = ({ humidity, windSpeed }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div>
          <span className="material-symbols-rounded text-5xl sm:text-6xl">
            humidity_percentage
          </span>
        </div>
        <div>
          <p className="text-xl sm:text-2xl">{humidity}%</p>
          <p className="text-md sm:text-lg">Humidity</p>
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <span className="material-symbols-rounded text-5xl sm:text-6xl">
            airwave
          </span>
        </div>
        <div>
          <p className="text-xl sm:text-2xl">{windSpeed}km/h</p>
          <p className="text-md sm:text-lg">Wind Speed</p>
        </div>
      </div>
    </div>
  );
};

export default Data;

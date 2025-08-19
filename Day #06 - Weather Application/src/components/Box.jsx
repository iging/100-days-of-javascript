import React from "react";

const Box = ({ cityName, imageName, temperature, description }) => {
  return (
    <div className="my-4 text-center">
      <h3 className="text-2xl sm:text-3xl text-center">{cityName}</h3>
      <img src={imageName} alt="" className="h-32 sm:h-36 mx-auto w-auto" />
      <h1 className="text-center text-2xl sm:text-3xl flex items-start justify-center">
        <span className="text-5xl sm:text-6xl">{temperature}</span>°C
      </h1>
      <p className="text-center text-lg sm:text-xl font-normal ">
        {description}
      </p>
    </div>
  );
};

export default Box;

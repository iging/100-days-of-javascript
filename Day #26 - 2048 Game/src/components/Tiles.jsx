import React from "react";

const Tiles = ({ val = 0 }) => {
  const bgColors = (val) => {
    switch (val) {
      case 2:
        return "bg-[#EEE4DA]";
      case 4:
        return "bg-[#EDE0C8]";
      case 8:
        return "bg-[#F2B179]";
      case 16:
        return "bg-[#F59563]";
      case 32:
        return "bg-[#F67C5F]";
      case 64:
        return "bg-[#F65E3B]";
      case 128:
        return "bg-[#EDCF72]";
      case 256:
        return "bg-[#EDCC61]";
      case 512:
        return "bg-[#EDC850]";
      case 1024:
        return "bg-[#EDC53F]";
      case 2048:
        return "bg-[#EDC22E]";
      default:
        return "bg-[#CDC1B4]";
    }
  };

  const textColor = (val) => {
    return val <= 4 ? "text-[#776E65]" : "text-white";
  };

  const textSizes = (val) => {
    if (val < 100) {
      return "text-[32px]";
    } else if (val < 1000) {
      return "text-[28px]";
    } else {
      return "text-[22px]";
    }
  };

  const shadowSize = (val) => {
    if (val >= 8) {
      return "shadow-lg";
    }
    return "shadow";
  };

  if (val === 0) {
    return (
      <div className="h-[85px] w-[85px] rounded-[4px] bg-[#CDC1B4] opacity-35"></div>
    );
  }

  return (
    <div
      className={`flex h-[85px] w-[85px] items-center justify-center rounded-[4px] select-none ${bgColors(
        val,
      )} ${textColor(val)} ${shadowSize(val)} text-center font-bold ${textSizes(
        val,
      )} animate-appear transform transition-all duration-100 ease-in-out`}
    >
      {val}
    </div>
  );
};

export default Tiles;

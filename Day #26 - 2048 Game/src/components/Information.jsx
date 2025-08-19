import React from "react";

const Information = ({ score = 0 }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[60px] leading-tight font-bold text-[#776E65]">
          2048
        </h1>
        <div className="flex space-x-2">
          <div className="flex min-w-[100px] flex-col rounded-md bg-[#8f7a66] p-3 text-center text-white shadow-md">
            <p className="text-[14px] font-medium tracking-wide uppercase">
              score
            </p>
            <h2 className="text-[24px] font-bold">{score}</h2>
          </div>
        </div>
      </div>
      <div className="mt-2 text-[16px] text-[#776E65]">
        Join the numbers and get to the <span className="font-bold">2048</span>{" "}
        tile!
      </div>
      <p className="mt-1 text-sm text-[#776E65] opacity-80">
        Use arrow keys to move tiles. When two tiles with the same number touch,
        they merge!
      </p>
    </div>
  );
};

export default Information;

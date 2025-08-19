import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const Items = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img
          src={isComplete ? tick : not_tick}
          alt="Tick and Not Tick Icons"
          className="w-7"
        />
        <p
          className={`text-black ml-4 text-[17px] decoration-black ${
            isComplete && "line-through "
          } : ""`}
        >
          {text}
        </p>
      </div>
      <img
        onClick={() => deleteTodo(id)}
        src={delete_icon}
        alt="Delete"
        className="w-3.5 cursor-pointer"
      />
    </div>
  );
};

export default Items;

import React from "react";
import search from "../assets/search.svg";
import location from "../assets/location.svg";

const Search = ({ value, onChange, onClickSearch, onClickFetch }) => {
  return (
    <div className="flex items-center w-full h-9 gap-2">
      <div className="h-full w-full flex items-center border-2 border-[#695cfe] rounded-lg">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search City"
          className="w-full h-full outline-none bg-transparent pl-2 text-lg font-normal"
        />
        <button
          onClick={onClickSearch}
          className="flex text-lg items-center pr-2 transition-all duration-700 hover:text-[#695cfe]"
        >
          <span className="material-symbols-rounded">search</span>
        </button>
      </div>
      <div>
        <button
          onClick={onClickFetch}
          className="flex h-full w-9 border-2 rounded-lg items-center leading-9 text-lg border-[#695cfe] transition-all duration-700 hover:bg-[#695cfe]"
        >
          <span className="material-symbols-rounded text-center h-full w-full text-2xl">
            my_location
          </span>
        </button>
      </div>
    </div>
  );
};

export default Search;

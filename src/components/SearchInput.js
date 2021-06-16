import React from "react";
import { FaSistrix } from "react-icons/fa";

const SearchInput = ({ setSearch, darkMode }) => {
  // Search bar
  const searchHandle = e => {
    setSearch(e.target.value);
  };

  return (
    <div className="search">
      <div>
        <FaSistrix color={darkMode === "dark" ? "white" : "hsl(0, 0%, 52%)"} size={25} rotation={90} />
      </div>
      <input type="text" placeholder="Search for a country..." onChange={searchHandle}></input>
    </div>
  );
};

export default SearchInput;

import React from "react";
import { FaSistrix } from "react-icons/fa";

/////FaRegMoon

const SearchInput = ({ setSearch }) => {
  // Search bar
  const searchHandle = e => {
    setSearch(e.target.value);
  };

  // Auto complete

  return (
    <div className="search">
      <div>
        <FaSistrix color="white" size={25} rotation={90} />
      </div>
      <input type="text" placeholder="Search for a country..." onChange={searchHandle}></input>
    </div>
  );
};

export default SearchInput;

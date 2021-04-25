import React from "react";

const RegionSelect = ({ setRegion }) => {
  const changeRegionHandler = e => {
    e.preventDefault();
    setRegion(e.target.value);
  };

  return (
    <form>
      <select className="region" defaultValue="Filter by Region" onChange={changeRegionHandler}>
        <option value="">All</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </form>
  );
};

export default RegionSelect;

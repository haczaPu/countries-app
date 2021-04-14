import React from "react";

const Country = ({ flag, name, population, region, capital }) => {
  return (
    <div className="country">
      <img src={flag} alt=""></img>
      <div className="country-description">
        <div className="country-description-name">{name}</div>
        <ul>
          <li>
            Population:
            <div>{population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
          </li>
          <li>
            Region:
            <div>{region}</div>
          </li>
          <li>
            Capital:
            <div>{capital}</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Country;

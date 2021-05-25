import React from "react";
import { Link } from "react-router-dom";
import Country from "./Country";

const CountriesList = ({ filteredCountries }) => {
  return (
    <div className="countries-container">
      {filteredCountries.map((country, index) => (
        <Link to={`/${country.name}`} style={{ textDecoration: "none" }} key={index}>
          <Country
            flag={country.flag}
            name={country.name}
            population={country.population}
            region={country.region}
            capital={country.capital}
          />
        </Link>
      ))}
    </div>
  );
};

export default CountriesList;

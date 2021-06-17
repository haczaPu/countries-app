import React from "react";
import { Link } from "react-router-dom";
import Country from "./Country";

const CountriesList = ({ filteredCountries }) => {
  return (
    <>
      {filteredCountries.length ? (
        <div className="countries-container">
          {filteredCountries.map((country, index) => (
            <Link to={`/${country.alpha3Code}`} style={{ textDecoration: "none" }} key={index}>
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
      ) : (
        <div className="info-results">No countries found...</div>
      )}
    </>
  );
};

export default CountriesList;

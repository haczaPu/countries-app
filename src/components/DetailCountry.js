import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const DetailCountry = ({ filteredCountries }) => {
  const { id } = useParams();

  //Find selected country
  const country = filteredCountries.find(c => c.alpha3Code === id);

  return (
    <div className="detail-country-container">
      <Link to={`/`} style={{ textDecoration: "none" }}>
        <div className="btn-back">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.46447 4.10744L7.64298 5.28596L3.75389 9.17504L18.6031 9.17504L18.6031 10.825L3.75389 10.825L7.64298 14.714L6.46447 15.8926L0.57191 10L6.46447 4.10744Z"
              fill="currentColor"
            />
          </svg>
          <div>Back</div>
        </div>
      </Link>
      <div className="detail-country-data-wrapper">
        <img src={country.flag} alt={country.flag} />
        <div className="detail-country-data">
          <h1> {country.name} </h1>
          <section>
            <ul>
              <li>
                Native Name:
                <div>{country.nativeName}</div>
              </li>
              <li>
                Population:
                <div>{country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
              </li>
              <li>
                Region:
                <div>{country.region}</div>
              </li>
              <li>
                Sub Region:
                <div>{country.subregion}</div>
              </li>
              <li>
                Capital:
                <div>{country.capital}</div>
              </li>
            </ul>
            <ul>
              <li>
                Top Level Domain:
                <div>{country.topLevelDomain}</div>
              </li>
              <li>
                Currencies:
                <div>
                  {country.currencies.map((curr, index) => (
                    <div>{curr.name}</div>
                  ))}
                </div>
              </li>
              <li>
                Languages:
                <div className="country-languages">
                  {country.languages.map((lang, index) => (
                    <div>
                      {lang.name}
                      {index < country.languages.length - 1 ? "," : ""}
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </section>
          <div className="border-countries">
            Border Countries:
            <div className="border-countries-links">
              {country.borders.map(bCountry => (
                <Link to={`/${bCountry}`} style={{ textDecoration: "none" }}>
                  <div className="border-country-btn">
                    {filteredCountries.find(c => c.alpha3Code === bCountry).name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCountry;

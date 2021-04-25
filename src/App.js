import "./style/style.css";
import { useEffect, useState } from "react";
import Country from "./components/Country";
import RegionSelect from "./components/RegionSelect";
import { FaSistrix, FaRegMoon, FaMoon } from "react-icons/fa";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  // First fetch API data
  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      const data = await response.json();
      setAllCountries(data);
      setFilteredCountries(data);
    };
    getCountries();
  }, []);

  // Filter countries by region
  const regionFilteredCountries = allCountries.filter(country => {
    if (country.name.toLowerCase().includes(search.toLocaleLowerCase())) {
      return country.region.includes(region);
    }
    return false;
  });

  // Search bar
  const searchHandle = e => {
    setSearch(e.target.value);
  };

  // Search bar filtering
  const searchFilteredCountries = allCountries.filter(country => {
    if (country.region.includes(region)) {
      return country.name.toLowerCase().includes(search.toLocaleLowerCase());
    }
    return false;
  });

  useEffect(() => {
    setFilteredCountries(searchFilteredCountries);
  }, [search]);

  useEffect(() => {
    setFilteredCountries(regionFilteredCountries);
  }, [region]);

  return (
    <div className="App">
      <header>
        <div>Where in the world?</div>
        <div className="theme-toggler">
          <FaMoon size={14} />
          <div>Dark Mode</div>
        </div>
      </header>
      <main>
        <nav>
          <div className="search">
            <div>
              <FaSistrix color="white" size={25} rotation={90} />
            </div>

            <input type="text" placeholder="Search for a country..." onChange={searchHandle}></input>
          </div>
          <RegionSelect setRegion={setRegion} />
        </nav>
        <div className="countries-container">
          {filteredCountries.map((country, index) => (
            <Country
              key={index}
              flag={country.flag}
              name={country.name}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

import "./style/style.css";
import { useEffect, useState } from "react";
import Country from "./components/Country";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState(1);

  // Fetch API data
  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      const data = await response.json();
      setAllCountries(data);
    };
    getCountries();
  }, []);

  // Search bar
  const searchHandle = e => {
    setSearch(e.target.value);
  };

  // Search bar filtering
  const filteredCountries = allCountries.filter(country => {
    return country.name.toLowerCase().includes(search.toLocaleLowerCase());
  });

  const changeRegionHandler = e => {
    e.preventDefault();
    setRegion(e.target.value);
  };

  return (
    <div className="App">
      <header>Where in the world?</header>
      <main>
        <nav>
          <input type="text" placeholder="Search for a country..." onChange={searchHandle}></input>
          <form>
            <select className="region" defaultValue="Filter by Region" onChange={changeRegionHandler}>
              <option value="1">All</option>
              <option value="2">Africa</option>
              <option value="3">America</option>
              <option value="4">Asia</option>
              <option value="5">Europe</option>
              <option value="6">Oceania</option>
            </select>
          </form>
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

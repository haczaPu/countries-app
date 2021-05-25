import "./style/style.css";
import { useEffect, useState } from "react";
import RegionSelect from "./components/RegionSelect";
import { FaSistrix } from "react-icons/fa";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CountriesList from "./components/CountriesList";
import Header from "./components/Header";
import DetailCountry from "./components/DetailCountry";

/////FaRegMoon

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  // Fetch API data
  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      const data = await response.json();
      setAllCountries(data);
      setFilteredCountries(data);
    };
    getCountries();
  }, []);

  // Search bar
  const searchHandle = e => {
    setSearch(e.target.value);
  };

  // Name filtering
  useEffect(() => {
    const searchFilteredCountries = allCountries.filter(country => {
      if (country.region.includes(region)) {
        return country.name.toLowerCase().includes(search.toLocaleLowerCase());
      }
      return false;
    });
    setFilteredCountries(searchFilteredCountries);
  }, [allCountries, region, search]);

  // Region filtering
  useEffect(() => {
    const regionFilteredCountries = allCountries.filter(country => {
      if (country.name.toLowerCase().includes(search.toLocaleLowerCase())) {
        return country.region.includes(region);
      }
      return false;
    });
    setFilteredCountries(regionFilteredCountries);
  }, [allCountries, region, search]);

  return (
    <div className="App">
      <Router>
        <Route path="/" component={Header} />
        <main>
          <Route path="/" exact>
            <nav>
              <div className="search">
                <div>
                  <FaSistrix color="white" size={25} rotation={90} />
                </div>
                <input type="text" placeholder="Search for a country..." onChange={searchHandle}></input>
              </div>
              <RegionSelect setRegion={setRegion} />
            </nav>
          </Route>
          <Switch>
            <Route path="/" exact>
              <CountriesList filteredCountries={filteredCountries} />
            </Route>
            <Route path="/:id">
              <DetailCountry filteredCountries={filteredCountries} />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;

import "./style/style.css";
import { useEffect, useState } from "react";
import RegionSelect from "./components/RegionSelect";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CountriesList from "./components/CountriesList";
import Header from "./components/Header";
import DetailCountry from "./components/DetailCountry";
import SearchInput from "./components/SearchInput";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [darkMode, setDarkMode] = useState(false);

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

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };

  //{`${darkMode ? "theme-dark" : "theme-light"}`}

  return (
    <div className={`${darkMode ? "App theme-dark" : "App theme-light"}`}>
      <Router>
        <Route path="/">
          <Header handleToggleTheme={handleToggleTheme} />
        </Route>
        <main>
          <Route path="/" exact>
            <nav>
              <SearchInput setSearch={setSearch} />
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

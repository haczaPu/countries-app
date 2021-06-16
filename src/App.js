import "./style/style.css";
import { useEffect, useState } from "react";
import RegionSelect from "./components/RegionSelect";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CountriesList from "./components/CountriesList";
import Header from "./components/Header";
import DetailCountry from "./components/DetailCountry";
import SearchInput from "./components/SearchInput";
import useLocalStorage from "./components/UseLocalStorage";

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", "light");

  // Fetch API data
  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      const data = await response.json();
      setAllCountries(data);
      setFilteredCountries(data);
    };
    getCountries();
    document.body.setAttribute("data-theme", darkMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Name filtering
  useEffect(() => {
    const searchFilteredCountries =
      allCountries &&
      allCountries.filter(country => {
        if (country.region.includes(region)) {
          return country.name.toLowerCase().includes(search.toLocaleLowerCase());
        }
        if (country.name.toLowerCase().includes(search.toLocaleLowerCase())) {
          return country.region.includes(region);
        }
        return false;
      });
    setFilteredCountries(searchFilteredCountries);
  }, [allCountries, region, search]);

  //Theme toggler
  const handleToggleTheme = () => {
    if (darkMode === "light") {
      document.body.setAttribute("data-theme", "dark");
      setDarkMode("dark");
    } else {
      document.body.setAttribute("data-theme", "light");
      setDarkMode("light");
    }
  };

  //Blocker
  if (!allCountries || !filteredCountries) return null;

  return (
    <div className="App">
      <Router>
        <Route path="/">
          <Header handleToggleTheme={handleToggleTheme} darkMode={darkMode} />
        </Route>
        <main>
          <Route path="/" exact>
            <nav>
              <SearchInput setSearch={setSearch} darkMode={darkMode} />
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

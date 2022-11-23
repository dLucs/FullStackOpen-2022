import Filter from "./components/Filter";
import Countries from "./components/Countries";
import SelectedCountry from "./components/SelectedCountry";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const lat =
      filteredCountries.length === 1
        ? filteredCountries[0].capitalInfo.latlng[0]
        : "10";

    const lon =
      filteredCountries.length === 1
        ? filteredCountries[0].capitalInfo.latlng[1]
        : "10";

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [filteredCountries]);

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
    const filter = countries.filter((country) =>
      country.name.common.toLowerCase().includes(newFilter.toLowerCase())
    );
    setFilteredCountries(filter);
  };

  const handleShowFilter = (event) => {
    const show = countries.filter((country) =>
      country.name.common.includes(
        event.target.parentElement.textContent.split(" ", 1)
      )
    );
    setFilteredCountries(show);
  };

  return (
    <div>
      <Filter
        newFilter={newFilter}
        handleFilter={(event) => handleFilter(event)}
      />
      {filteredCountries.length === 1 ? (
        <SelectedCountry
          filteredCountries={filteredCountries}
          weather={weather}
        />
      ) : filteredCountries.length > 10 ? (
        <div>{newFilter ? "Too many matches, specify another filter" : ""}</div>
      ) : (
        <Countries
          countries={filteredCountries}
          handleShowFilter={handleShowFilter}
        />
      )}
    </div>
  );
};

export default App;

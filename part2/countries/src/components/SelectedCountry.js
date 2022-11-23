import Weather from "./Weather";

const SelectedCountry = ({ filteredCountries, weather }) => {
  return filteredCountries.map((country) => (
    <div key={country.name.common}>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p> Area: {country.area}</p>
      <h4>Languages:</h4>
      <ul>
        {Object.values(country.languages).map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt="Country Flag" />
      <Weather country={country} weather={weather} />
    </div>
  ));
};

export default SelectedCountry;

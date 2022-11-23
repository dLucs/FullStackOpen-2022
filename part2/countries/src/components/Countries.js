const Countries = ({ countries, handleShowFilter }) => {
  return countries.map((country) => (
    <div key={country.name.common}>
      {country.name.common} <button onClick={handleShowFilter}>Show</button>
    </div>
  ));
};

export default Countries;

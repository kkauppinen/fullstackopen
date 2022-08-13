const Countries = ({ countries, setFilter }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}
          <button
            type="button"
            onClick={() => {
              setFilter(country.name.common);
            }}
          >
            Show
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Countries;

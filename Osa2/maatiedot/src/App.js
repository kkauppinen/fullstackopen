import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import ShowCountries from "./ShowCountries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(filter.toLowerCase())
  }
  );

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  return (
    <>
      <Filter filter={filter} setFilter={setFilter} />
      <ShowCountries countries={filteredCountries} setFilter={setFilter} />
    </>
  );
};

export default App;

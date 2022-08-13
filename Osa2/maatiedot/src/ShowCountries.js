import Countries from "./Countries";
import Country from "./Country";

const ShowCountries = ({ countries, setFilter }) => {
    if (countries.length <= 10 && countries.length > 1) {
        return <Countries countries={countries} setFilter={setFilter} />
      } else if (countries.length === 1) {
        return <Country country={countries[0]} />
      } else {
          return (<p>Too many matches, please specify!</p>)
      }
};

export default ShowCountries;
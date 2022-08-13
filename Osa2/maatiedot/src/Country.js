const Country = ({country}) => {
    const languages = Object.values(country.languages);
    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>
                <p>Capital: {country.capital[0]}</p>
                <p>Area: {country.area}</p>
            </div>
            <h3>Languages</h3>
            <ul>
                {languages.map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <div>
                <img src={country.flags.png} alt="flag" />
            </div>
        </div>
    );
}

export default Country;
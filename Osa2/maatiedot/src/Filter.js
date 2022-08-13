
const Filter = ({filter, setFilter}) => {
    return (
        <div>
            <p>Find countries: <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} /></p>
        </div>
    );
}

export default Filter;
export const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <p>
        filter shown with
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </p>
    </div>
  );
};

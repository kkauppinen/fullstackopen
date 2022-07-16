export const PersonsForm = ({name, number, setName, setNumber, onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        number:
        <input
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

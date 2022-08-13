export const PersonsList = ({persons, handleRemove}) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>{person.name} {person.number} <button onClick={() => handleRemove(person)}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
};

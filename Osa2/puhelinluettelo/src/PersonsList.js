export const PersonsList = ({persons}) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.name} >
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

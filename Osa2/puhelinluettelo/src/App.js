import { useState } from 'react';
import { Filter } from './Filter';
import { PersonsForm as Form} from './PersonsForm';
import { PersonsList as Persons} from './PersonsList';

const App = () => {
  const [persons, setPersons] = useState([{name: 'Arto Hellas', number:'040-1234567'}]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().includes(filter));
  const personsToShow = filter ? filteredPersons : persons;

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = persons.some(p => p.name === newName);
    if(existing) return alert(`${newName} is already added to phonebook`);
    setPersons([...persons, {name: newName, number: newNumber}]);
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <Form name={newName} number={newNumber} setName={setNewName} setNumber={setNewNumber} onSubmit={handleSubmit} />
      <h2>Numbers</h2>
     <Persons persons={personsToShow} />
    </div>
  );

}

export default App;

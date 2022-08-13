import { useState, useEffect } from "react";
import { getAll, create, remove, update } from "./services/contacts";
import { Filter } from "./Filter";
import { PersonsForm as Form } from "./PersonsForm";
import { PersonsList as Persons } from "./PersonsList";
import { Notification } from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState(undefined);

  useEffect(() => {
    getAll().then((contacts) => {
      setPersons(contacts);
    });
  }, []);

  const handleNotification = ({ className, message }) => {
    setNotification({ className, message });
    setTimeout(() => {
      setNotification(undefined);
    }, 3000);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(filter)
  );
  const personsToShow = filter ? filteredPersons : persons;

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = persons.find((p) => p.name === newName);
    if (existing) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Do you want to replace number?`
        )
      ) {
        const updatedPerson = { ...existing, number: newNumber };
        return update(updatedPerson)
          .then((updatedPerson) => {
            const updatedPersons = persons.filter(
              (p) => p.id !== updatedPerson.id
            );
            setPersons([...updatedPersons, updatedPerson]);
            handleNotification({
              className: "success",
              message: `Updated ${updatedPerson.name}`,
            });
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            handleNotification({
              className: "error",
              message: `${existing.name} has already deleted from the server!`,
            });
            const updatedPersons = persons.filter((p) => p.id !== existing.id);
            setPersons(updatedPersons);
          });
      }
    }

    create({ name: newName, number: newNumber }).then((newContact) => {
      setPersons([...persons, newContact]);
      handleNotification({
        className: "success",
        message: `Added ${newContact.name}`,
      });
    });
    setNewName("");
    setNewNumber("");
  };

  const handleRemove = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      remove(person.id)
        .then(() => {
          const updatedPersons = persons.filter((p) => p.id !== person.id);
          setPersons(updatedPersons);
          handleNotification({
            className: "success",
            message: `Deleted ${person.name}`,
          });
        })
        .catch(() => {
          handleNotification({
            className: "error",
            message: `${person.name} has already deleted from the server!`,
          })
          const updatedPersons = persons.filter((p) => p.id !== person.id);
            setPersons(updatedPersons);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && (
        <Notification
          className={notification.className}
          message={notification.message}
        />
      )}
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <Form
        name={newName}
        number={newNumber}
        setName={setNewName}
        setNumber={setNewNumber}
        onSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleRemove={handleRemove} />
    </div>
  );
};

export default App;

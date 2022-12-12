import { useState } from "react";
import { useEffect } from "react";
import Persons from "./components/Persons";
import Form from "./components/Form";
import Filter from "./components/Filter";
import personsService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [filterPersons, setFilteredPersons] = useState("");
  const [showNotification, setShowNotification] = useState("");

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
    const filter = persons.filter((person) =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    );
    setFilteredPersons(filter);
  };

  const addPerson = (event) => {
    setNewFilter("");
    event.preventDefault();

    const notify = (message) => {
      setShowNotification(message);
      setTimeout(() => {
        setShowNotification("");
      }, 5000);
    };

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const updateNumber = () => {
      const selectedPerson = persons.filter(
        (person) => person.name === newName
      );

      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new`
        )
      ) {
        personsService
          .update(selectedPerson[0].id, newPerson)
          .then((returnedPerson) => {
            setPersons((oldPersons) =>
              oldPersons.map((person) => {
                return person.name === returnedPerson.name
                  ? { ...person, number: newNumber }
                  : person;
              })
            );
            setNewName("");
            setNewNumber("");
            setFilteredPersons("");
            notify(`Added ${returnedPerson.name}`);
          })
          .catch((error) => {
            notify(error.response.data.error);
          });
      }
    };

    const nameExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    nameExists
      ? updateNumber()
      : personsService
          .create(newPerson)
          .then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            setNewName("");
            setNewNumber("");
            setFilteredPersons("");
            notify(`Added ${newPerson.name}`);
          })
          .catch((error) => {
            notify(error.response.data.error);
          });
  };
  const handleDelete = (event) => {
    const selected = persons.find((person) => {
      return person.id === event.target.id;
    });

    if (window.confirm(`Delete ${selected.name}`)) {
      personsService.remove(selected.id);
      setPersons((oldPersons) =>
        oldPersons.filter((person) => person.id !== selected.id)
      );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {showNotification && <Notification message={showNotification} />}
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <Form
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        newName={newName}
      />
      <h3>Numbers</h3>
      <Persons
        persons={newFilter ? filterPersons : persons}
        handleDelete={(event) => handleDelete(event)}
      />
    </div>
  );
};

export default App;

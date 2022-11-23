const Persons = ({ persons, handleDelete }) => {
  return persons.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}{" "}
      <button id={person.id} onClick={handleDelete}>
        Delete
      </button>
    </div>
  ));
};

export default Persons;

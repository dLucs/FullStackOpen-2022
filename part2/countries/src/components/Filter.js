const Filter = (props) => {
  return (
    <div>
      Find Countries:
      <input value={props.newFilter} onChange={props.handleFilter} />
    </div>
  );
};

export default Filter;

const Header = ({ name }) => <h2>{name}</h2>;
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};
const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const allExercises = [];
  parts.forEach((part) => allExercises.push(part.exercises));

  const sum = allExercises.reduce((acc, o) => acc + o);

  return <strong>total of {sum} exercises</strong>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;

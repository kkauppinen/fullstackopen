import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
    const total = course.parts.reduce((prev, currentPart) => {
        return prev + currentPart.exercises;
    }, 0);
  return (
    <>
      <Header name={course.name} />
      <Content content={course.parts} />
      <Total total={total} />
    </>
  );
};

export default Course;

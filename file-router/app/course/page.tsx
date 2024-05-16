import CourseForm from '@/app/course/CourseForm';

const course_data = [
  { name: 'Next.js', hours: 7 },
  { name: 'React', hours: 4 },
  { name: 'JavaScript', hours: 3 },
];

const course = () => {
  return (
    <>
      <h1>All courses</h1>
      {course_data.map((course) => (
        <h2 key={course.name}>{course.name}</h2>
      ))}

      <CourseForm />
    </>
  );
};

export default course;

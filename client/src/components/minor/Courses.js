import React from "react";
import CourseCard from "../CourseCard";
import getAllCourses from '../../utils/getAllCourses';

function Courses() {
  const courses = getAllCourses();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} isEnrolled={false} />
      ))}
    </div>
  );
}

export default Courses;

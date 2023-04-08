import React from "react";
import CourseCard from "../CourseCard";
import getAllCourses from '../../utils/getAllCourses';
import getCourseImage from "../../utils/getCourseImage";

export default  function Courses() {
  const courses = getAllCourses()

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 space-x-1 gap-4 md:gap-8">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} isEnrolled={false} imageSrc={getCourseImage(course.id).src} />
      ))}
    </div>
  );
}

import React from "react";
import CourseCard from "../CourseCard";
import getAllCourses from '../../utils/getAllCourses';
import getCourseImage from "../../utils/getCourseImage";
import { useSelector } from 'react-redux';

export default function Courses() {
  const allCourses = useSelector(state => state.courses.allCourses);
  const enrolledCourses = useSelector(state => state.courses.enrolledCourses);
  const unenrolledCourses = allCourses.filter(course => !enrolledCourses.some(ec => ec.courseId === course.courseId));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 space-x-1 gap-4 md:gap-8">
      {unenrolledCourses.map(course => (
        <CourseCard key={course.id} course={course} isEnrolled={false} imageSrc={getCourseImage(course.id).src} />
      ))}
    </div>
  );
}

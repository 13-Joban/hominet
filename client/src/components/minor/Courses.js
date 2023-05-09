import {useEffect} from "react";
import CourseCard from "../CourseCard";
import getCourseImage from "../../utils/getCourseImage";
import { useSelector, useDispatch } from 'react-redux';
import {getAllCourses, fetchEnrolledCourses}  from "../../api";

export default function Courses() {
  const dispatch = useDispatch();
  const allCourses = useSelector(state => state.courses.allCourses);
  const student = useSelector(state => state.student.user);
  console.log(student);
  const enrolledCourses = useSelector(state => state.courses.enrolledCourses);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);;
  
  useEffect(() => {
    dispatch(fetchEnrolledCourses());
  }, [dispatch]);

  if (!allCourses) {
    return <p>Loading...</p>;
  }

  const unenrolledCourses = allCourses.filter(course => !enrolledCourses.some(enrolledCourse => enrolledCourse.courseId === course.id));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 space-x-1 gap-4 md:gap-8">
      {unenrolledCourses.map((course, index) => (
        <CourseCard key={course.id} course={course} isEnrolled={false} index={index} imageSrc={getCourseImage(index)} />
      ))}
    </div>
  );
}

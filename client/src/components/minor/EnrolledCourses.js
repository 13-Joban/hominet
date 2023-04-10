import { useSelector } from 'react-redux';
import CourseCard from "../CourseCard";
import getCourseImage from "../../utils/getCourseImage"

function EnrolledCoures() {
  const enrolledCourses = useSelector(state => state.courses.enrolledCourses);
  console.log(enrolledCourses)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {enrolledCourses.map(course => (
        <CourseCard key={course.id} course={course} isEnrolled={true} imageSrc={getCourseImage(course.id).src} />
      ))}
    </div>
  );
}

export default EnrolledCoures;

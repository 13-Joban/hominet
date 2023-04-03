import getEnrolledCourses from '../../utils/getEnrolledCourses';
import CourseCard from "../CourseCard";

function EnrolledCoures() {
  const enrolledCourses = getEnrolledCourses();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {enrolledCourses.map(course => (
        <CourseCard key={course.id} course={course} isEnrolled={true} />
      ))}
    </div>
  );
}

export default EnrolledCoures

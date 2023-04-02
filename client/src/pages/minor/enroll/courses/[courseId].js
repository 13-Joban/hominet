import EnrollCourse from '../../../../components/minor/EnrollCourse';
import { useRouter } from "next/router";
import findCourseById from '../../../../utils/findCourseById'
import getAllCourses from '../../../../utils/getAllCourses'

const courses = getAllCourses();

function EnrollCoursePage() {
  const router = useRouter();
  const courseId = router.query.courseId;
  const course = findCourseById(courses, courseId);
  
  console.log(courseId);
  console.log(course.courseName);

  return <EnrollCourse courseName={course.courseName} courseId={courseId} courseLink={course.courseLink} />;
}

export default EnrollCoursePage;

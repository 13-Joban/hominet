import EnrollCourse from '../../../../components/minor/EnrollCourse'
import { useRouter } from 'next/router'
import findCourseById from '../../../../utils/findCourseById'
import getAllCourses from '../../../../utils/getAllCourses'
import Layout from '../../../../components/Layout'


function EnrollCoursePage () {
  const router = useRouter()
  const courseId = router.query.courseId
  console.log(courseId);
  const courses = getAllCourses()
  const course = findCourseById(courses, courseId)
  const courseName = course && course.courseName;
  const courseLink =  course && course.courseLink;

  return (
    <Layout>
      <EnrollCourse
        courseName={courseName}
        courseId={courseId}
        courseLink={courseLink}
      />
    </Layout>
  )
}

export default EnrollCoursePage

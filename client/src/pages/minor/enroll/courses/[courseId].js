import EnrollCourse from '../../../../components/minor/EnrollCourse'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import findCourseById from '../../../../utils/findCourseById'
import getAllCourses from '../../../../utils/getAllCourses'
import Layout from '../../../../components/Layout'


function EnrollCoursePage() {
  const router = useRouter()
  const { courseId } = router.query
  console.log(courseId);
  const courses = getAllCourses()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    if (courseId) {
      const foundCourse = findCourseById(courses, courseId)
      setCourse(foundCourse)
    }
  }, [courseId])

  if (!courseId || course == null) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <EnrollCourse
        courseName={course.courseName}
        courseId={courseId}
        courseLink={course.courseLink}
      />
    </Layout>
  )
}

export default EnrollCoursePage

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import findCourseById from '../../../../utils/findCourseById'
import getAllCourses from '../../../../utils/getAllCourses'
import Layout from '../../../../components/Layout'
import EnrolledCourse from '../../../../components/minor/EnrolledCourse'

function EnrolledCoursePage() {
  const router = useRouter()
  const { courseId } = router.query
  const courses = getAllCourses()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    if (courseId) {
      const foundCourse = findCourseById(courses, courseId)
      setCourse(foundCourse)
    }
  }, [courseId])

  if (!courseId || course === null) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <EnrolledCourse course={course} />
    </Layout>
  )
}

export default EnrolledCoursePage

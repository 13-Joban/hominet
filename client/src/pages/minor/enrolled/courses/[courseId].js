import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import findCourseById from '../../../../utils/findCourseById'
import getAllCourses from '../../../../utils/getAllCourses'
import Layout from '../../../../components/Layout'
import {useSelector} from 'react-redux'
import EnrolledCourse from '../../../../components/minor/EnrolledCourse'

function EnrolledCoursePage() {
  const router = useRouter()
  const { courseId } = router.query
  const courses =  useSelector(state => state.courses.enrolledCourses)
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
      <EnrolledCourse isCompleted={course.isCompleted} courseName={course.courseName} courseId={courseId} duration={course.duration} institute={course.institute} />
    </Layout>
  )
}

export default EnrolledCoursePage

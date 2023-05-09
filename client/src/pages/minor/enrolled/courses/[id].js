import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
// import findCourseById from '../../../../utils/findCourseById'
// import getAllCourses from '../../../../utils/getAllCourses'
import Layout from '../../../../components/Layout'
import {useSelector, useDispatch} from 'react-redux'
import {fetchEnrolledCourses, getCourseById} from '../../../../../src/api'
import EnrolledCourse from '../../../../components/minor/EnrolledCourse'

function EnrolledCoursePage() {
  const router = useRouter()
  const { id } = router.query
  // console.log(id);

  const dispatch = useDispatch()
  const enrolledCourses = useSelector(state => state.courses.enrolledCourses)
  console.log(enrolledCourses);
  const selectedEnrolledCourse = enrolledCourses.find(course => course.courseId === id)
  const selectedCourse = selectedEnrolledCourse.Course;
  console.log(selectedCourse);

  useEffect(() => {
    if (id) {
      dispatch(fetchEnrolledCourses())
    }
  }, [id])

  if (!id || selectedCourse == null) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <EnrolledCourse isCompleted={selectedCourse.isCompleted} courseName={selectedCourse.name} courseId={id} duration={selectedCourse.duration} institute={selectedCourse.institute} selectedEnrolledCourse={selectedEnrolledCourse} />
    </Layout>
  )
}

export default EnrolledCoursePage

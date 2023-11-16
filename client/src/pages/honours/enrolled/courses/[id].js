import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../../../components/Layout'
import {useSelector, useDispatch} from 'react-redux'
import {fetchEnrolledCourses} from '../../../../../src/api'
import EnrolledCourse from '../../../../components/honours/EnrolledCourse'

function EnrolledCoursePage() {
  const router = useRouter()
  const { id } = router.query

  const dispatch = useDispatch()
  const enrolledCourses = useSelector(state => state.courses.enrolledCourses)
  const selectedEnrolledCourse = enrolledCourses.find(course => course.courseId === id)
  const selectedCourse = selectedEnrolledCourse.Course;
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

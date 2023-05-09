import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
// import findCourseById from '../../../../utils/findCourseById'
// import getAllCourses from '../../../../utils/getAllCourses'
import Layout from '../../../../components/Layout'
import {useSelector, useDispatch} from 'react-redux'
import {getCourseById} from '../../../../../src/api'
import EnrolledCourse from '../../../../components/minor/EnrolledCourse'

function EnrolledCoursePage() {
  const router = useRouter()
  const { id } = router.query
  // console.log(id);

  const dispatch = useDispatch()
  const selectedCourse = useSelector(state => state.courses.selectedCourse)
  console.log(selectedCourse);

  useEffect(() => {
    if (id) {
      dispatch(getCourseById(id))
    }
  }, [id])

  if (!id || selectedCourse == null) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <EnrolledCourse isCompleted={selectedCourse.isCompleted} courseName={selectedCourse.name} courseId={id} duration={selectedCourse.duration} institute={selectedCourse.institute} />
    </Layout>
  )
}

export default EnrolledCoursePage

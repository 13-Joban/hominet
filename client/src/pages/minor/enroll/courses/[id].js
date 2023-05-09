import EnrollCourse from '../../../../components/minor/EnrollCourse'
import { useRouter } from 'next/router'
import {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getCourseById} from '../../../../../src/api'
// import findCourseById from '../../../../utils/findCourseById'
// import getAllCourses from '../../../../utils/getAllCourses'

import Layout from '../../../../components/Layout'


function EnrollCoursePage() {
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
      <EnrollCourse
        courseName={selectedCourse.name}
        courseId={id}
        duration={selectedCourse.duration}
        offeredBy={selectedCourse.institute}
        courseLink={selectedCourse.nptelLink}
      />
    </Layout>
  )
}

export default EnrollCoursePage

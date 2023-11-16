import EnrolledCourses from '../../../components/honours/EnrolledCourses'
import Layout from '../../../components/Layout'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchEnrolledCourses } from '../../../api'

function Enrolled () {
  const dispatch = useDispatch()
  const enrolledCourses = useSelector(state => state.courses.enrolledCourses)

  useEffect(() => {
    dispatch(fetchEnrolledCourses())
  }, [dispatch])

  return (
    <Layout>
      <div className='flex flex-col justify-between min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:py-1'>
        {enrolledCourses.length > 0 && (
          <div className='mx-auto mb-8 w-full sm:w-1/2'>
            <div className='flex flex-col mb-8'>
              <h1 className='text-xl text-red font-normal mb-4 sm:text-2xl'>
                Enrolled MOOC Courses for Honours Engineering Degree{' '}
              </h1>
              <hr style={{ border: '1px solid black' }} />
            </div>
            <EnrolledCourses />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Enrolled

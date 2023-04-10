import EnrolledCourses from '../../../components/minor/EnrolledCourses'
import EnrolledSubjects from '../../../components/minor/EnrolledSubjects'
import Layout from '../../../components/Layout'

function Enrolled() {
  return (
    <Layout>
   <div className="flex flex-col justify-between min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:py-1">
        <div className="mx-auto mb-8 w-full sm:w-1/2">
          <div className="flex flex-col mb-8">
            <h1 className="text-xl text-red font-normal mb-4 sm:text-2xl">Enrolled MOOC Courses for Minor Engineering Degree</h1>
            <hr style={{border: '1px solid black'}} />
          </div>
          <EnrolledCourses />
        </div>
        <div className="mx-auto w-full sm:w-1/2">
          <div className="flex flex-col mb-8 ">
            <h1 className="text-xl text-red font-normal mb-4 sm:text-2xl">Enrolled Classroom Subjects for Minor Engineering Degree</h1>
            <hr style={{border: '1px solid black'}} />
          </div>
          <EnrolledSubjects />
        </div>
      </div>
    </Layout>
  )
}

export default Enrolled

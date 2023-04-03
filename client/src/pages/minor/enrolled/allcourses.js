import EnrolledCourses from '../../../components/minor/EnrolledCourses'
import EnrolledSubjects from '../../../components/minor/EnrolledSubjects'
import Layout from '../../../components/Layout'

function Enrolled() {
  return (
    <Layout>
    <div className="flex flex-col justify-between min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 sm:text-3xl">List of Enrolled Subjects</h2>
        <EnrolledSubjects />
      </div>
      <div className="flex-grow">
        <h2 className="text-2xl font-bold mb-4 sm:text-3xl">List of Enrolled Courses</h2>
        <EnrolledCourses />
      </div>
    </div>
    </Layout>
  )
}

export default Enrolled

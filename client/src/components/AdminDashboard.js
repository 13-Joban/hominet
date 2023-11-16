import { useRouter } from 'next/router'
import Image from 'next/image'
import { useDispatch } from 'react-redux';
import { adminLogout } from '@/api';
import locofy from '../../public/images/gndec-fotor-bg-remover-20230410223713.png'


const AdminDashboard = () => {
  const router = useRouter()
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Dispatch the adminLogout action
      await dispatch(adminLogout());
      router.push('/admin')

      // Optionally, you can redirect the user to the login page or perform other actions
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleCreateCourseTask = () => {
    router.push('/admin/minor/createCourse')
  }

  const handleUploadCourses = () => {
    router.push('/admin/minor/createCourseList')
  }

  const handleUpdateCourses = () => {
    router.push('/admin/minor/viewCourses')
  }

  const handleViewAllCourses = () => {
    router.push('/viewallcourses')
  }

  const handleCreateSubject = () => {
    router.push('/admin/minor/createSubject')
  }

  const handleViewAllSubjects = () => {
    router.push('/admin/minor/viewSubjects')
  }

  return (
    <div className='flex'>
      <div className='w-64 bg-gray-800 min-h-screen sticky top-0'>
        <div className='px-4 py-5 border-b border-gray-700'>
          <div className='flex items-center justify-center'>
            <Image src={locofy} alt='Logo' width={48} height={48} />
            <span className='ml-2 text-white font-medium text-lg'>
              My Dashboard
            </span>
          </div>
        </div>
        <div className='mt-2'>
          <a
            href='/admin/minor'
            className='block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white'
          >
            Dashboard
          </a>
          <a
            href='/admin/minor/studentrecord'
            className='block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white'
          >
            Student Record
          </a>
        </div>
        <div className='mt-auto px-4 py-2 border-t border-gray-700 hover:bg-gray-700 text-white block hover:underline cursor-pointer' onClick={handleLogout}>
          Logout
        </div>
      </div>

      <div className='flex-1 bg-gray-100 p-10'>
        <h1 className='text-3xl font-medium mb-6 text-red'>
          Admin Dashboard (Minor Engineering Degree)
        </h1>

        <h2 className='text-2xl font-medium mb-6 text-blue-600'>
          MOOC COURSES
        </h2>

        <div className='flex justify-between'>
          <div className='flex-1 bg-white p-6 shadow-md mr-2'>
            <h2 className='text-lg font-semibold mb-4'>Create a Course</h2>
            <p className='text-gray-500 mb-4'>
              Click the button below to create a new course:
            </p>
            <button
              className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow'
              onClick={handleCreateCourseTask}
            >
              Create Course
            </button>
          </div>

          <div className='flex-1 bg-white p-6 shadow-md ml-2'>
            <h2 className='text-lg font-semibold mb-4'>Upload Courses</h2>
            <p className='text-gray-500 mb-4'>
              Upload a list of courses at once:
            </p>
            <button
              className='w-full bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded shadow'
              onClick={handleUploadCourses}
            >
              Upload Courses
            </button>
          </div>
        </div>
        <div className='flex justify-between mt-6'>
          <div className='flex-1 bg-white p-6 shadow-md mr-2'>
            <h2 className='text-lg font-semibold mb-4'>View Courses</h2>
            <p className='text-gray-500 mb-4'>
              Click the button below to update courses:
            </p>
            <button
              className='w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded shadow'
              onClick={handleUpdateCourses}
            >
              View All Courses
            </button>
          </div>
        </div>

        <h2 className='text-2xl font-medium mt-10 mb-6 text-purple-600'>
          CLASSROOM SUBJECTS
        </h2>

        <div className='flex justify-between '>
          <div className='flex-1 bg-white p-6 shadow-md mr-2'>
            <h2 className='text-lg font-semibold mb-4'>Create a Subject</h2>
            <p className='text-gray-500 mb-4'>
              Click the button below to create a new subject:
            </p>
            <button
              className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow'
              onClick={handleCreateSubject}
            >
              Create Subject
            </button>
          </div>

          <div className='flex-1 bg-white p-6 shadow-md ml-2'>
            <h2 className='text-lg font-semibold mb-4'>View All Subjects</h2>
            <p className='text-gray-500 mb-4'>
              Click the button below to view all subjects:
            </p>
            <button
              className='w-full bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded shadow'
              onClick={handleViewAllSubjects}
            >
              View All Subjects
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

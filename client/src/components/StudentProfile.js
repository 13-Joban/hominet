import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import locofy from '../../public/images/gndec-fotor-bg-remover-20230410223713.png';
import { useRouter } from 'next/router';

import {adminLogout} from '../api'
import { useDispatch } from 'react-redux';


function StudentProfile({ studentData }) {

  const { student, enrolledMoocCourses, enrolledSubjects } = studentData;
   const dispatch = useDispatch();

  const router = useRouter();


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

  const dashboardLink = student.degreeType === 'Minor' ? '/admin/minor' : '/admin/honours';

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Sidebar */}
      <div className="w-full lg:w-64 bg-gray-800 p-4 lg:p-8">
        <div className="flex items-center justify-center mb-6">
          <Image src={locofy} alt="Logo" width={48} height={48} />
          <p className="ml-2 text-white font-medium text-lg">My Dashboard</p>
        </div>
        <div className='mt-2'>
        <a  href={dashboardLink} className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
          Dashboard
        </a>
        </div>
        
        
        <div className="mt-auto px-4 py-2 border-t border-gray-700 hover:bg-gray-700 text-white block cursor-pointer" onClick={handleLogout}>
        Logout
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8">
        <div className="bg-white p-6 lg:p-10 rounded-lg shadow-lg">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-8">Student Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 lg:mb-10">
            <div>
              <p className="font-semibold text-gray-600">Name</p>
              <p className="text-lg">{student.name}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">URN</p>
              <p className="text-lg">{student.urn}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">CRN</p>
              <p className="text-lg">{student.crn}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Branch</p>
              <p className="text-lg">{student.branch}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Degree</p>
              <p className="text-lg">{student.degreeType}</p>
            </div>
            {/* Add more student details as needed */}
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="mt-8">
  <h2 className="text-2xl lg:text-3xl font-semibold mb-4 lg:mb-6 text-red">Enrolled Mooc Courses</h2>
  <div className="overflow-x-auto">
    <table className="w-full table-auto bg-white rounded-lg shadow-lg">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-3 text-left">ID</th>
          <th className="px-4 py-3 text-left">Name</th>
          <th className="px-4 py-3 text-left">Session</th>
          <th className="px-4 py-3 text-left">Uploaded Certificate</th>
        </tr>
      </thead>
      <tbody>
        {enrolledMoocCourses.map((course) => (
          <tr key={course.id}>
            <td className="px-4 py-3">{course.courseId}</td>
            <td className="px-4 py-3">{course.Course.name}</td>
            <td className="px-4 py-4">{course.session}</td>
            <td className="px-4 py-3">
            {course.certificate ? (
                        <a
                          href={`${course.certificate}`}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                          download={course.certificate}
                          target="_blank"
                        >
                          Download Certificate
                        </a>
                      ) : (
                        <span className="text-red">Not Uploaded</span>
                      )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

        {/* Enrolled Subjects */}

{
  enrolledSubjects.length > 0 && (
    <div className="mt-8">
    <h2 className="text-2xl lg:text-3xl font-semibold mb-4 lg:mb-6 text-red">Enrolled Classroom Subjects</h2>
    <div className="overflow-x-auto">
      <table className="w-full table-auto bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-3 text-left">Subject Code</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Session</th>
            <th className="px-4 py-4 text-left">Uploaded Result</th>
          </tr>
        </thead>
        <tbody>


          { enrolledSubjects.map((subject) => (
            <tr key={subject.id}>
              <td className="px-4 py-3">{subject.subjectCode}</td>
              <td className="px-4 py-3">{subject.Subject.subjectName}</td>
              <td className="px-4 py-3">{subject.session}</td>
              <td className="px-4 py-4">
              {subject.certificate ? (
                          <a
                            href={`${subject.certificate}`}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                            download={subject.certificate}
                            target="_blank"
                          >
                            Download Result
                          </a>
                        ) : (
                          <span className="text-red">Not Uploaded</span>
                        )}
      </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

        
       
      </div>

      
    </div>
  );
}

export default StudentProfile;

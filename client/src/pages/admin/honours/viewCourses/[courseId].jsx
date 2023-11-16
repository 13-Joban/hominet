import React, { useEffect, useState } from 'react';
// import { useTable, useFilters, usePagination } from 'react-table';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import locofy from '/public/images/gndec-fotor-bg-remover-20230410223713.png';
import { adminLogout} from '../../../../api'
import { useRouter } from 'next/router';

const updateCourses
 = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const dispatch = useDispatch(); // Get the dispatch function from Redux

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

  console.log(courseId)

  

  const [course, setCourse] = useState({
    id: '',
    name: '',
    institute: '',
    duration: '',
    nptelLink: '',
    session: '',
    enrollmentEndDate: '',
    certificateSubmissionStartDate: '',
    certificateSubmissionEndDate: '',

  });

  const getCourseById = async (id) => {
    try {
      const url = `http://localhost:4040/api/courses/${id}`;
      const response = await axios.get(url);
      const courseData = response.data;
      console.log(courseData);
      return courseData;
    } catch (error) {
      console.error(error);
      // Handle errors, e.g., show an error message
    }
  };
  
  // In your component:
  
  useEffect(() => {
    if (courseId) {
      getCourseById(courseId)
        .then((courseData) => {
          setCourse(courseData);
        })
        .catch((error) => {
          // Handle errors, e.g., show an error message
        });
    } else {
      console.error('courseId is missing');
    }
  }, [courseId]);


  const updateCourse = async (courseId, updatedCourseData) => {
    try {
      const url = `http://localhost:4040/api/admin/courses/update/${courseId}`;
      const token = Cookies.get('admin_token');
      const response = await axios.put(url, updatedCourseData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Course updated:', response.data);
  
      // Handle the response as needed (e.g., show a success message)
      return response.data;
    } catch (error) {
      console.error('Error updating course:', error);
      // Handle errors, e.g., show an error message
    }
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!course.id || !course.name || !course.institute || !course.duration || !course.nptelLink || !course.session || !course.enrollmentEndDate || !course.certificateSubmissionStartDate || !course.certificateSubmissionEndDate) {
      alert('Please fill out all fields.');
      return;
    }
  
    try {
      const courseId = course.id;
      const updatedCourseData = {
        id: course.id,
        name: course.name,
        institute: course.institute,
        duration: course.duration,
        nptelLink: course.nptelLink,
        session: course.session,
        enrollmentEndDate: course.enrollmentEndDate,
        certificateSubmissionStartDate: course.certificateSubmissionStartDate,
        certificateSubmissionEndDate: course.certificateSubmissionEndDate,
      };
      await updateCourse(courseId, updatedCourseData);
      
      // Reset the course state
      setCourse({
        id: '',
        name: '',
        institute: '',
        duration: '',
        nptelLink: '',
        session: '',
        enrollmentEndDate: '',
        certificateSubmissionStartDate: '',
        certificateSubmissionEndDate: '',
      });
    } catch (error) {
      console.error('Error updating course:', error);
      // Handle errors, e.g., show an error message
    }
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800">
        <div className="px-4 py-5 border-b border-gray-700">
          <div className="flex items-center justify-center">
            <Image src={locofy} alt="Logo" width={48} height={48} />
            <span className="ml-2 text-white font-medium text-lg">My Dashboard</span>
          </div>
        </div>
        <div className="mt-2">
        <a href="/admin/honours" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
            Dashboard
          </a>

          <a
            href="/admin/honours/studentrecord"
            className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white mt-1"
          >
            Student Record
          </a>
        </div>
        <div className="mt-auto px-4 py-2 border-t border-gray-700 hover:bg-gray-700 text-white block cursor-pointer" onClick={handleLogout}>
        Logout
        </div>
      </div>

 <div className="container px-24 mt-24">
      <h1 className="text-2xl font-bold mb-8 ">Edit Course</h1>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleFormSubmit}>
  <div className="col-span-2 sm:col-span-1">
    <label className="block font-medium mb-2" htmlFor="id">
      ID
    </label>
    <input
      className="w-full border border-gray-300 p-2 rounded-lg"
      id="id"
      name="id"
      type="text"
      placeholder="Enter ID"
      value={course.id}
      onChange={handleInputChange}
    />
  </div>
  <div className="col-span-2 sm:col-span-1">
    <label className="block font-medium mb-2" htmlFor="name">
      Name
    </label>
    <input
      className="w-full border border-gray-300 p-2 rounded-lg"
      id="name"
      name="name"
      type="text"
      placeholder="Enter Name"
      value={course.name}
      onChange={handleInputChange}
    />
  </div>
  <div className="col-span-2 sm:col-span-1">
    <label className="block font-medium mb-2" htmlFor="institute">
      Institute
    </label>
    <input
      className="w-full border border-gray-300 p-2 rounded-lg"
      id="institute"
      name="institute"
      type="text"
      placeholder="Enter Institute"
      value={course.institute}
      onChange={handleInputChange}
    />
  </div>
  <div className="col-span-2 sm:col-span-1">
    <label className="block font-medium mb-2" htmlFor="duration">
      Duration
    </label>
    <input
      className="w-full border border-gray-300 p-2 rounded-lg"
      id="duration"
      name="duration"
      type="text"
      placeholder="Enter Duration"
      value={course.duration}
      onChange={handleInputChange}
    />
  </div>
  <div className="col-span-2">
    <label className="block font-medium mb-2" htmlFor="nptelLink">
      NPTEL Link
    </label>
    <input
      className="w-full border border-gray-300 p-2 rounded-lg"
      id="nptelLink"
      name="nptelLink"
      type="text"
      placeholder="Enter NPTEL Link"
      value={course.nptelLink}
      onChange={handleInputChange}
    />
  </div>
  <div className="col-span-2 sm:col-span-1">
    <label className="block font-medium mb-2" htmlFor="session">
      Session
    </label>
    <input
      className="w-full border border-gray-300 p-2 rounded-lg"
      id="session"
      name="session"
      type="text"
      placeholder="Enter Session"
      value={course.session}
      onChange={handleInputChange}
    />
  </div>
  <div className="col-span-2 sm:col-span-1">
    <label className="block font-medium mb-2" htmlFor="enrollmentEndDate">
      Enrollment End Date
    </label>
    <input
      className="w-full border border-gray-300 p-2 rounded-lg"
      id="enrollmentEndDate"
      name="enrollmentEndDate"
      type="date"
      placeholder="Enter Enrollment End Date"
      value={course.enrollmentEndDate}
      onChange={handleInputChange}
    />
  </div>
  <div className="col-span-2 sm:col-span-1">
    <label className="block font-medium mb-2" htmlFor="certificateSubmissionStartDate">
    Certificate Submission Start Date
    </label>
    <input
      className="w-full border border-gray-300 p-2 rounded-lg"
      id="certificateSubmissionStartDate"
      name="certificateSubmissionStartDate"
      type="date"
      placeholder="Enter Certificate Submission Start Date"
      value={course.certificateSubmissionStartDate}
      onChange={handleInputChange}
    />
  </div>
  <div className="col-span-2 sm:col-span-1">
    <label className="block font-medium mb-2" htmlFor="certificateSubmissionEndDate">
    Certificate Submission End Date
    </label>
    <input
      className="w-full border border-gray-300 p-2 rounded-lg"
      id="certificateSubmissionEndDate"
      name="certificateSubmissionEndDate"
      type="date"
      placeholder="Enter Certificate Submission Start Date"
      value={course.certificateSubmissionEndDate}
      onChange={handleInputChange}
    />
  </div>
  <div className="col-span-2">
    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow center">
      {courseId ? 'Update Course' : 'Create Course'}
    </button>
  </div>
</form>


        
    </div>
    </div>
  );
};

export default updateCourses
;


import {useState} from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';

// import Link from 'next/link'
import locofy from '../../public/images/gndec-fotor-bg-remover-20230410223713.png'
import {adminLogout} from '../api'
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';

const CreateCourseTask = () => {
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

  const [course, setCourse] = useState({
    id: '',
    name: '',
    institute: '',
    duration: '',
    nptelLink: '',
    type: '',
    session: '',
    description: '',
    enrollmentEndDate: ''
  });
  const handleInputChange = (event) => {
    
    const { name, value } = event.target;
    setCourse({ ...course, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(course);
    if (!course.id || !course.name || !course.institute || !course.duration || !course.nptelLink || !course.session || !course.description || !course.enrollmentEndDate) {
      alert('Please fill out all fields.');
      return;
    }
  

    const url = 'http://localhost:4040/api/admin/courses/add'
    const token = Cookies.get('admin_token');
    // console.log(token);

    const defaultType = router.pathname.includes('/admin/honours') ? 'H' : 'M';

    const response = await axios.post(url, { ...course, type: defaultType }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // const response = await axios.post(url, course, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // console.log(response.data);
    // console.log(course);
  
    setCourse({
      id: '',
      name: '',
      institute: '',
      duration: '',
      nptelLink: '',
      session: '',
      type:'',
      description: '',
      enrollmentEndDate: ''
    });

  }

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
        <a
  href={router.pathname === '/admin/honours/createCourse' ? '/admin/honours' : '/admin/minor'}
  className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white"
>
  Dashboard
</a>

          <a href={router.pathname === '/admin/honours/createCourse' ? '/admin/honours/studentrecord' : '/admin/minor/studentrecord'}className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white mt-1">Student Record</a>
        </div>
        <div className="mt-auto px-4 py-2 border-t border-gray-700 cursor-pointer text-white block " onClick={handleLogout}>
        Logout
        </div>
      </div>
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Add New Course</h1>
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
            <label className="block font-medium mb-2" htmlFor="type">
              Degree Type
            </label>
            <select
              className="w-full border border-gray-300 p-2 rounded-lg"
              id="type"
              name="type"
              value={course.type}
              onChange={handleInputChange}
              disabled  // disable the select input since it's hard-coded based on the route
            >
              {router.pathname.includes('/admin/honours') ? (
                <option value="H">Honours</option>
              ) : (
                <option value="M">Minor</option>
              )}
            </select>
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
        <div className="col-span-2">
  <label className="block font-medium mb-2" htmlFor="description">
    Description
  </label>
  <textarea
    className="w-full border border-gray-300 p-2 rounded-lg"
    id="description"
    name="description"
    placeholder="Enter Course Description"
    value={course.description}
    onChange={handleInputChange}
  />
</div>

        <div className="col-span-2">
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
         <div className="col-span-2">
         <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow center">Create Course</button>
        </div>
         </form>
         </div>
         </div>
  )}
  export default CreateCourseTask
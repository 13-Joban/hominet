import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/studentSlice';

function Profile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const crn = '123456'; // replace with the student's CRN
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = () =>{
    dispatch(logout());
    router.push('/')
  }

  useEffect(() => {
    async function fetchStudent() {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`http://localhost:4040/api/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchStudent();
  }, [crn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-medium text-gray-800">My Profile</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md bg-blue-500"
          >
            Logout
          </button>
        </div>
        <div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="crn"
            >
              CRN
            </label>
            <span className="text-gray-900">{student.crn}</span>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <span className="text-gray-900">{student.name}</span>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="contactNo"
            >
              Contact Number
            </label>
            <span className="text-gray-900">{student.contactNo}</span>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="semester"
            >
              Semester
            </label>
            <span className="text-gray-900">{student.semester}</span>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="branch"
            >
              Branch
            </label>
            <span className="text-gray-900">{student.branch}</span>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="year"
            >
              Year
            </label>
            <span className="text-gray-900">{student.year}</span>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="passing_out_year"
            >
              Passing Out Year
            </label>
            <span className="text-gray-900">{student.passing_out_year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

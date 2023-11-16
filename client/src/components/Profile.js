import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/studentSlice';

function Profile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true); // replace with the student's CRN
  const dispatch = useDispatch()
  const router = useRouter()
  const [sgpa, setSgpa] = useState({});

  const handleLogout = () =>{
    dispatch(logout());
    router.push('/')
  }

  const handleSgpaChange = (event) => {
    const { name, value } = event.target;

    // Check if the semester is within the valid range
    const semesterNumber = Number(name.slice(4)); // Extract semester number from sgpaX
    if (semesterNumber < student.semester) {
      setSgpa((prevSgpa) => ({
        ...prevSgpa,
        [name]: value,
      }));
    }
  };

 

  const handleSubmit = async () => {
    try {
      const token = Cookies.get('token');
      await axios.put(
        `http://localhost:4040/api/user/update-sgpa`,
        {
          crn: student.crn,
          sgpa,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Optionally, you can handle success, e.g., show a success message
    } catch (error) {
      console.error(error);
      // Optionally, you can handle error, e.g., show an error message
    }
  };

  useEffect(() => {
    async function fetchStudent() {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`http://localhost:4040/api/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(response.data);

        // Generate dynamic SGPA state based on the current semester
        const dynamicSgpa = {};
        for (let i = 1; i < response.data.semester; i++) {
          dynamicSgpa[`sgpa${i}`] = '';
          if (response.data[`sgpa${i}`]) {
            
            dynamicSgpa[`sgpa${i}`] = response.data[`sgpa${i}`]
          }
        }
        setSgpa(dynamicSgpa);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchStudent();
  }, []);

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

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="year">
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
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">SGPA Details</h3>
            {Array.from({ length: student.semester -  1}, (_, index) => (
              <div key={index} className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor={`sgpa${index + 1}`}
                >
                  {`SGPA ${index + 1} Semester`}
                </label>
                <input
                  type="number"
                  id={`sgpa${index + 1}`}
                  name={`sgpa${index + 1}`}
                  value={sgpa[`sgpa${index + 1}`] || ''}
                  onChange={(e) => handleSgpaChange(e, index + 1)}
                  className="border border-gray-300 p-2 w-full rounded"
                />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update SGPA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

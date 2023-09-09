import { useState } from 'react';
import { useRouter } from 'next/router';
import { useRegister } from '../api';

const branchOptions = [
  'Civil Engineering',
  'Electrical Engineering',
  'Mechanical & Production Engineering',
  'Electronics & Communication Engineering',
  'Computer Science & Engineering',
  'Information Technology',
];

const yearOptions = ['1', '2', '3', '4'];

export default function RegisterPage() {
  const router = useRouter();
  const registerHandler = useRegister();
  const [crn, setCrn] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [semester, setSemester] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [passingOutYear, setPassingOutYear] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !crn ||
      !password ||
      !name ||
      !contactNo ||
      !semester ||
      !branch ||
      !year ||
      !passingOutYear
    ) {
      alert('Please fill in all the required fields');
      return;
    }

    try {
      const student = await registerHandler({
        crn,
        password,
        name,
        contactNo,
        semester,
        branch,
        year,
        passing_out_year: passingOutYear,
      });
      console.log(student);
      router.push('/');
    } catch (err) {
      alert('Failed to register student');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="lg:w-screen max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="lg:text-2xl text-xl font-bold text-gray-900 mb-6">Register Student</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="crn">
            CRN
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="crn"
            type="text"
            placeholder="CRN"
            value={crn}
            onChange={(e) => setCrn(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
    Name
  </label>
  <input
    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="name"
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="contactNo">
    Contact Number
  </label>
  <input
    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="contactNo"
    type="text"
    placeholder="Contact Number"
    value={contactNo}
    onChange={(e) => setContactNo(e.target.value)}
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="semester">
    Semester
  </label>
  <input
    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="semester"
    type="text"
    placeholder="Semester"
    value={semester}
    onChange={(e) => setSemester(e.target.value)}
  />
</div>


        {/* Add other input fields for name, contactNo, semester, etc. */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="branch">
            Branch
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            {branchOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="year">
            Year
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {yearOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="passingOutYear">
    Passing Out Year
  </label>
  <input
    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="passingOutYear"
    type="text"
    placeholder="Passing Out Year"
    value={passingOutYear}
    onChange={(e) => setPassingOutYear(e.target.value)}
  />
</div>
        {/* Add input fields for passingOutYear, etc. */}
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium lg:font-bold py-1 px-2 lg:py-2 lg:px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

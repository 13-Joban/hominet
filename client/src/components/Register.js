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
const degreeTypeOptions = ['Minor', 'Honours'];

export default function RegisterPage() {
  const router = useRouter();
  const registerHandler = useRegister();
  const [crn, setCrn] = useState('');
  const [urn, setUrn] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [semester, setSemester] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [passingOutYear, setPassingOutYear] = useState('');
  const [degreeType, setDegreeType] = useState('');

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
      !passingOutYear ||
      !degreeType ||
      !urn ||
      !email
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
        degreeType,
        urn,
        email,
      });
      console.log(student);
      window.location.reload();
    } catch (err) {
      alert('Failed to register student');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 w-full max-w-2xl p-6 bg-white rounded-md shadow-md">
      <h1 className="col-span-2 text-2xl font-bold text-gray-900 mb-6">Register Student</h1>

      

        <div className="col-span-1 mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="crn">
            CRN
          </label>
          <input
            className="input-field"
            id="crn"
            type="text"
            placeholder="CRN"
            value={crn}
            onChange={(e) => setCrn(e.target.value)}
          />
        </div>
        <div className="col-span-1 mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="urn">
            URN
          </label>
          <input
            className="input-field"
            id="urn"
            type="text"
            placeholder="URN"
            value={urn}
            onChange={(e) => setUrn(e.target.value)}
          />
        </div>

        <div className="col-span-1 mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="input-field"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-span-1 mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="input-field"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="col-span-1 mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="input-field"
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-span-1 mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="contactNo">
            Contact Number
          </label>
          <input
            className="input-field"
            id="contactNo"
            type="text"
            placeholder="Contact Number"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
        </div>

        <div className="col-span-1 mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="semester">
            Semester
          </label>
          <input
            className="input-field"
            id="semester"
            type="text"
            placeholder="Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
        </div>
        <div className="col-span-1 mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="passingOutYear">
            Passing Out Year
          </label>
          <input
            className="input-field"
            id="passingOutYear"
            type="text"
            placeholder="Passing Out Year"
            value={passingOutYear}
            onChange={(e) => setPassingOutYear(e.target.value)}
          />
        </div>

        <div className="col-span-2 mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="branch">
            Branch
          </label>
          <select
            className="input-field"
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

        <div className="col-span-1 mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="year">
            Year
          </label>
          <select
            className="input-field"
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

        

        <div className="col-span-1 mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="degreeType">
            Degree Type
          </label>
          <select
            className="input-field"
            id="degreeType"
            value={degreeType}
            onChange={(e) => setDegreeType(e.target.value)}
          >
            {degreeTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 flex items-center justify-center">
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

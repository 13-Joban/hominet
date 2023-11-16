import React, { useState } from 'react';
import Image from 'next/image';
import locofy from '../../../../public/images/gndec-fotor-bg-remover-20230410223713.png';
import { useDispatch } from 'react-redux';
import { adminLogout} from '../../../api'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

const CreateSubject = () => {
  const [subject, setSubject] = useState({
    subjectName: '',
    subjectCode: '',
    subjectType: 'Theory',
    credits: 0,
    session: '',
    enrollmentEndDate: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubject({ ...subject, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      !subject.subjectName ||
      !subject.subjectCode ||
      !subject.subjectType ||
      !subject.credits ||
      !subject.session ||
      !subject.enrollmentEndDate
    ) {
      alert('Please fill out all fields.');
      return;
    }

    const url = 'http://localhost:4040/api/admin/subjects/add';
    const token = Cookies.get('admin_token');

    const response = await axios.post(url, subject, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setSubject({
      subjectName: '',
      subjectCode: '',
      subjectType: 'Theory',
      credits: 0,
      session: '',
      enrollmentEndDate: '',
    });
  };

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

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800">
        <div className="px-4 py-5 border-b border-gray-700">
          <div className="flex items-center justify-center">
            <Image src={locofy} alt="Logo" width={48} height={48} />
            <span className="ml-2 text-white font-medium text-lg">My Dashboard</span>
          </div>
        </div>
        <div className="mt-2">
          <a href="/admin/minor" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">
            Dashboard
          </a>
          <a
            href="/admin/minor/studentrecord"
            className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white mt-1"
          >
            Student Record
          </a>
        </div>
        <div className="mt-auto px-4 py-2 border-t border-gray-700 hover:bg-gray-700 text-white block cursor-pointer" onClick={handleLogout}>
        Logout
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8">Add New Subject</h1>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleFormSubmit}>
          <div className="col-span-2 sm:col-span-1">
            <label className="block font-medium mb-2" htmlFor="subjectName">
              Subject Name
            </label>
            <input
              className="w-full border border-gray-300 p-2 rounded-lg"
              id="subjectName"
              name="subjectName"
              type="text"
              placeholder="Enter Subject Name"
              value={subject.subjectName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block font-medium mb-2" htmlFor="subjectCode">
              Subject Code
            </label>
            <input
              className="w-full border border-gray-300 p-2 rounded-lg"
              id="subjectCode"
              name="subjectCode"
              type="text"
              placeholder="Enter Subject Code"
              value={subject.subjectCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block font-medium mb-2" htmlFor="subjectType">
              Subject Type
            </label>
            <select
              className="w-full border border-gray-300 p-2 rounded-lg"
              id="subjectType"
              name="subjectType"
              value={subject.subjectType}
              onChange={handleInputChange}
            >
              <option value="Theory">Theory</option>
              <option value="Practical">Practical</option>
            </select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block font-medium mb-2" htmlFor="credits">
              Credits
            </label>
            <input
              className="w-full border border-gray-300 p-2 rounded-lg"
              id="credits"
              name="credits"
              type="number"
              placeholder="Enter Credits"
              value={subject.credits}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="block font-medium mb-2" htmlFor="session">
              Session
            </label>
            <input
              className="w-full border border-gray-300 p-2 rounded-lg"
              id="session"
              name="session"
              type="text"
              placeholder="Enter Session"
              value={subject.session}
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
              value={subject.enrollmentEndDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow center">
              Add New Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubject;

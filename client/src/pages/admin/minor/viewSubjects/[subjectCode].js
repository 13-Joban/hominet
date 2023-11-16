import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import locofy from '/public/images/gndec-fotor-bg-remover-20230410223713.png';
import { useRouter } from 'next/router';
import { adminLogout } from '../../../../api';

const EditSubject = () => {
  const router = useRouter();
  const { subjectCode } = router.query;
  console.log(subjectCode);
  const dispatch = useDispatch();

  const [subject, setSubject] = useState({
    subjectName: '',
    subjectCode: '',
    subjectType: 'Theory',
    credits: 0,
    session: '',
    enrollmentEndDate: '',
    resultSubmissionStartDate: '',
    resultSubmissionEndDate: ''
    // Add other subject-related fields here
  });

  const getSubjectByCode = async (code) => {
    try {
      const url = `http://localhost:4040/api/admin/subjects/${code}`;
      const token = Cookies.get('admin_token');
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // const response = await axios.get(url);
      const subjectData = response.data;
      console.log(subjectData);
      return subjectData;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (subjectCode) {
      getSubjectByCode(subjectCode)
        .then((subjectData) => {
          setSubject(subjectData);
        })
        .catch((error) => {
          console.error('Error fetching subject data:', error);
        });
    } else {
      console.error('subjectCode is missing');
    }
  }, [subjectCode]);

  const updateSubject = async (subjectCode, updatedSubjectData) => {
    try {
      const url = `http://localhost:4040/api/admin/subjects/update/${subjectCode}`;
      const token = Cookies.get('admin_token');
      const response = await axios.put(url, updatedSubjectData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Subject updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!subject.subjectName || !subject.subjectType || !subject.enrollmentEndDate || !subject.resultSubmissionStartDate || !subject.resultSubmissionEndDate) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const updatedSubjectData = {
        subjectName: subject.subjectName,
        subjectType: subject.subjectType,
        subjectCode: subject.Code,
        credits: subject.credits,
        session: subject.session,
        enrollmentEndDate: subject.enrollmentEndDate,
        resultSubmissionStartDate: subject.resultSubmissionStartDate,
        resultSubmissionEndDate: subject.resultSubmissionEndDate
        // Add other subject-related fields here
      };
      await updateSubject(subjectCode, updatedSubjectData);

      // Reset the subject state
      setSubject({
        subjectName: '',
        subjectCode: '',
        subjectType: 'Theory',
        credits: 0,
        session: '',
        enrollmentEndDate: '',
        resultSubmissionStartDate: '',
        resultSubmissionEndDate: ''
        // Reset other subject-related fields
      });
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubject((prevSubject) => ({
      ...prevSubject,
      [name]: value,
    }));
  };

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
      {/* Left Sidebar */}
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

      <div className="container px-24 mt-24">
        <h1 className="text-2xl font-bold mb-8">Edit Subject</h1>
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

          {/* Add other subject-related fields here */}

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
          <div className="col-span-2 sm:col-span-1">
            <label className="block font-medium mb-2" htmlFor="resultSubmissionStartDate">
              Result Submission Start Date
            </label>
            <input
              className="w-full border border-gray-300 p-2 rounded-lg"
              id="resultSubmissionStartDate"
              name="resultSubmissionStartDate"
              type="date"
              placeholder="Result Submission Start Date"
              value={subject.resultSubmissionStartDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block font-medium mb-2" htmlFor="resultSubmissionEndDate">
              Result Submission End Date
            </label>
            <input
              className="w-full border border-gray-300 p-2 rounded-lg"
              id="resultSubmissionEndDate"
              name="resultSubmissionEndDate"
              type="date"
              placeholder="Result Submission End Date"
              value={subject.resultSubmissionEndDate}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="col-span-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow center">
              {subjectCode ? 'Update Subject' : 'Create Subject'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubject;

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CompletedSubject from './CompletedSubject'
import { completeSubject } from '../../store/slices/subjectSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';

function EnrolledSubject({ subjectName, subjectCode, credits, selectedEnrolledSubject }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        toast.error('Please select a file to upload.');
        return;
      }

      const url = `http://localhost:4040/api/subjects/enrolledsubjects/${subjectCode}/uploadResult`;

      const token = Cookies.get('token');

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('response in client', response);
      toast.success('File uploaded successfully!');
      // dispatch(completeSubject(subjectCode));
    } catch (error) {
      console.error(error);
      toast.error('Error uploading file.');
    }
  };

  if (selectedEnrolledSubject.isCompleted) {
    return  <CompletedSubject subjectName={subjectName} credits={credits} subjectCode={subjectCode} certificateFile={selectedEnrolledSubject.certificate} />
  }

  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <ToastContainer />
      <div className="bg-white rounded-md p-4 mb-4 md:mr-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-3xl text-red font-normal mb-4">{subjectName}</h2>
        <p className="text-gray-600">SubjectCode: {subjectCode}</p>
        <p className="text-gray-600">Credits: {credits}</p>
      </div>
      <div className="bg-white rounded-md p-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-lg font-bold mb-2">Upload Subject Result</h2>
        <div className="mb-4">
          <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
          <button
            onClick={() => document.getElementById('file-upload').click()}
            className="px-4 py-2 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Choose File
          </button>
        </div>
        <div
          className="border-dashed border-2 border-gray-300 p-8 mb-4"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p className="text-gray-600 mb-2">Drag and drop your file here</p>
        </div>
        {selectedFile && (
          <div className="mb-4">
            <p className="text-gray-600">Selected File: {selectedFile.name}</p>
          </div>
        )}
        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          className={`px-4 py-2 rounded-md ${
            selectedFile ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'
          } text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
        >
          Upload Result
        </button>
      </div>
    </div>
  );
}

export default EnrolledSubject;

import  { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {completeCourse } from '../../store/slices/courseSlice'
import { useDispatch } from 'react-redux';
import CompletedCourse from './CompletedCourse'

function EnrolledCourse({ isCompleted, courseId, courseName, duration, institute }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch =useDispatch();


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

  const handleUpload = () => {
    // Handle file upload logic here
    if (selectedFile) {
      console.log(selectedFile);
      toast.success("File uploaded successfully!");
      dispatch(completeCourse(courseId))
    } else {
      toast.error("Please select a file to upload.");
    }
  };

  if(isCompleted){
    return  <CompletedCourse courseName={courseName} duration={duration} institute={institute} certificateFile={selectedFile} />
  }

  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <ToastContainer />
      {/* Course Details */}
      <div className="bg-white rounded-md p-4 mb-4 md:mr-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-xl font-bold mb-2">{courseName}</h2>
        <p className="mb-4">About the course : </p>
      <p className="mb-4">This course includes examples of analytics in a wide variety of industries, and we hope that students will learn how you can use analytics in their career and life. One of the most important aspects of this course is that you, the student, are getting hands-on experience creating analytics models</p>
        <p className="text-gray-600">Duration: {duration}</p>
        <p className="text-gray-600">Offered by: {institute}</p>
      </div>

      {/* Certificate Upload */}
      <div className="bg-white rounded-md p-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-xl font-bold mb-2">Upload Course Certificate</h2>

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
          Upload Certificate
        </button>
      </div>
    </div>
  );
}

export default EnrolledCourse;

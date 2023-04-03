import React, { useState } from 'react';

function EnrolledCourse({ course }) {
  const [selectedFile, setSelectedFile] = useState(null);

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
    console.log(selectedFile);
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto">
    {/* Course Details */}
    <div className="bg-white rounded-md p-4 mb-4 md:mr-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
      <h2 className="text-xl font-bold mb-2">{course.title}</h2>
      <p className="text-gray-600">Duration: {course.duration}</p>
      <p className="text-gray-600">Offered by: {course.institute}</p>
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

import React from 'react';

function CompletedCourse({ courseName, duration, institute, certificateFile }) {
  console.log(certificateFile);
  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      {/* Course Details */}
      <div className="bg-white rounded-md p-4 mb-4 md:mr-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-xl font-bold mb-2">{courseName}</h2>
        <p className="mb-4">About the course : </p>
      <p className="mb-4">This course includes examples of analytics in a wide variety of industries, and we hope that students will learn how you can use analytics in their career and life. One of the most important aspects of this course is that you, the student, are getting hands-on experience creating analytics models</p>
        <p className="text-gray-600">Duration: {duration}</p>
        <p className="text-gray-600">Offered by: {institute}</p>
      </div>

      {/* Certificate */}
      <div className="bg-white rounded-md p-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-xl font-bold mb-2">Course Certificate: file Link</h2>

        {/* <div className="border-dashed border-2 border-gray-300 p-8 mb-4">
          <a href={certificateFile} target="_blank" rel="noopener noreferrer">
            <p className="text-gray-600 mb-2">View certificate</p>
          </a>
        </div> */}
      </div>
    </div>
  );
}

export default CompletedCourse;

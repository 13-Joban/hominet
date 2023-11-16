import React from 'react';

function CompletedSubject({ subjectName, subjectCode, credits, certificateFile }) {
  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      {/* Subject Details */}
      <div className="bg-white rounded-md p-4 mb-4 md:mr-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-3xl text-red font-normal mb-4">{subjectName}</h2>
        <p className="text-gray-600">SubjectCode: {subjectCode}</p>
        <p className="text-gray-600">Credits: {credits}</p>
      </div>

      {/* Certificate */}
      <div className="bg-white rounded-md p-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-xl font-bold mb-2">Uploaded Subject Result</h2>

        <div className="pt-8 mb-4">
          <a href={certificateFile} download className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {/* 'download' attribute will prompt the user to download the file */}
            Download Certificate
          </a>
        </div>
      </div>
    </div>
  );
}

export default CompletedSubject;

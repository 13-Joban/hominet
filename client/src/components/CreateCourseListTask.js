import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { adminLogout } from '@/api';
import Cookies from 'js-cookie'; // Import the Cookies library
import { useRouter } from 'next/router';
import locofy from '../../public/images/gndec-fotor-bg-remover-20230410223713.png';

function CreateCourseListTask() {
  const router = useRouter();
  const dispatch = useDispatch();

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

  const [fileData, setFileData] = useState([]);
  const [showUploadButton, setShowUploadButton] = useState(true);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      setFileData(sheetData);
      setShowUploadButton(false);
      setShowCancelButton(true);
      setShowSubmitButton(true);
    };

    reader.readAsArrayBuffer(file);
    console.log(fileData);
  };

  const handleCancelUpload = () => {
    setFileData([]);
    setShowUploadButton(true);
    setShowCancelButton(false);
    setShowSubmitButton(false);
  };

  const handleUploadToBackend = async () => {
    try {
      // Map the required fields and other relevant fields from the Excel data
      console.log('hiiii');
      console.log(fileData);
      const mappedCourses = fileData.map((courseFromExcel) => ({
        id: courseFromExcel['Course ID'],
        name: courseFromExcel['Course Name'],
        institute: courseFromExcel['Institute'],
        duration: courseFromExcel['Duration'],
        nptelLink: courseFromExcel['NPTEL URL'],
        session: courseFromExcel['Session'], // Add the missing field(s) as needed
        enrollmentEndDate: new Date(courseFromExcel['Enrollment End date']),
        // Map other fields as needed
        // ...
      }));
      console.log(mappedCourses)

      // Make a POST request to the backend API with the mapped data
      const url = 'http://localhost:4040/api/admin/courses/addList';
      const token = Cookies.get('admin_token'); // Retrieve the admin token from cookies
      const response = await axios.post(url, { courses: mappedCourses }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Handle the response from the server as needed
      console.log(response.data);

      // Reset the state after a successful upload
      setFileData([]);
      setShowUploadButton(true);
      setShowCancelButton(false);
      setShowSubmitButton(false);
    } catch (error) {
      console.error(error);
      // Handle errors or show an error message to the user
    }
  };

  const columns = useMemo(() => {
    if (fileData.length === 0) {
      return [];
    }

    // Dynamically generate columns based on the keys of the first data row
    const firstRow = fileData[0];
    return Object.keys(firstRow).map((key) => ({
      Header: key,
      accessor: key,
    }));
  }, [fileData]);

  console.log(fileData);

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
        <a
  href={router.pathname === '/admin/honours/createCourseList' ? '/admin/honours' : '/admin/minor'}
  className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white"
>
  Dashboard
</a>

          <a href={router.pathname === '/admin/honours/createCourseList' ? '/admin/honours/studentrecord' : '/admin/minor/studentrecord'} className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white mt-1">Student Record</a>
        </div>
        <div className="mt-auto px-4 py-2 border-t border-gray-700 bg-gray-700 text-white block cursor-pointer" onClick={handleLogout}> 

    Logout

      </div>
      </div>
      <div className='max-w-6xl mx-auto p-8'>
        <h1 className="text-2xl font-bold mb-8 text-center">Upload and Preview Course List</h1>
        {showUploadButton ? (
          <div className="text-center">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="mb-4 mx-auto p-2 border border-gray-300 rounded-lg"
            />
          </div>
        ) : (
          <div>
            <div className="flex justify-center space-x-4 mb-4">
              {showCancelButton && (
                <button
                  onClick={handleCancelUpload}
                  className="bg-red text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              )}
              {showSubmitButton && (
                <button
                  onClick={handleUploadToBackend}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Upload to Database
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className=" w-full min-w-full table-auto">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column.Header} className="px-4 py-2 bg-gray-100">
                        {column.Header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fileData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                      {columns.map((column) => (
                        <td key={column.accessor} className="border px-4 py-2">
                          {row[column.accessor]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateCourseListTask;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import CreateCourseTask from './CreateCourseTask';
import locofy from '../../public/images/gndec-fotor-bg-remover-20230410223713.png'
import Link from 'next/link'
import propic from '../../public/images/Course_img_2.jpeg'
const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const handleCreateCourseTask=()=>{
    router.push('/coursetask')
  }
  useEffect(() => {
    // Check if user is authenticated or authorized
    // and set isLoggedIn state accordingly
    const user = {
        role:"admin"
    }; // Replace with your authentication/authorization logic
    if (user && user.role === 'admin') {
      setIsLoggedIn(true);
      router.push('/admindash');
    } else {
      router.push('/adminlogin');
    }
  }, []);

  if (!isLoggedIn) {
    return null; // or show loading spinner or some message
  }

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
          <a href="/admindash" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white">Dashboard</a>
          <a href="#" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white mt-1">Students Record</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-10">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-4">Create a Course</h2>
            <p className="text-gray-500 mb-4">Click the button below to create a new course:</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow" onClick={handleCreateCourseTask}>Create Course</button>
          </div>
          
        </div>
      </div>
      <Link href='/me' className='block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 bg-gray-100'>
          <Image
            src={propic}
            className='rounded-full mr-2'
            height={6}
            width={60}
            alt='User Profile'
          />
        </Link>
    </div>
  );
};

export default AdminDashboard;

import { useState } from 'react';
import { useRouter } from 'next/router';
// import { login } from '../store/slices/studentSlice';
// import { useDispatch } from 'react-redux';
import Register from '../components/Register'
import {useLogin} from '../api';

export default function LoginPage() {
  const router = useRouter();
  const loginHandler = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }
    try {
     const  student   =  await loginHandler(username, password);
     console.log(student);

     if(student){
      console.log(student.degreeType)
      if (student.degreeType === 'Minor') {
        router.push('/minor/enroll/allcourses');
      } else if (student.degreeType === 'Honours') {
        router.push('/honours/enroll/allcourses');
      } 
     }

    
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  const handleRegisterClick = () => {
    console.log('Register button clicked');
    setShowRegister(true);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen ">

{ showRegister ? ( // Conditionally render the Register component
        <Register />
      ) : (
        <form onSubmit={handleSubmit} className=" lg:w-screen max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="lg:text-2xl text-xl font-bold text-gray-900 mb-6">Log in to your account</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium lg:font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 lg:mb-0 lg:mr-2 w-full lg:w-auto"
          >
            Sign In
          </button>
          <button
              onClick={handleRegisterClick}
            
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium lg:font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 lg:mb-0 lg:ml-2 w-full lg:w-auto"
          >
            Register
          </button>
        </div>
      </form>
      )}
     
    </div>
  );
}

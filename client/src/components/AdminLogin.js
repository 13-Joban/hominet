import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAdminLogin } from '../api';
import locofy from '../../public/images/gndec-fotor-bg-remover-20230410223713.png'
export default function LoginPage() {
  const router = useRouter();
  const loginHandler = useAdminLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can add your login logic
    
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }
    try {
      const admin = await loginHandler(username, password);
      // console.log(admin);
      router.push('/admin/choosedegree');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <form onSubmit={handleSubmit} className=" lg:w-screen max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="lg:text-2xl text-xl font-bold text-gray-900 mb-6">Admin Account</h1>
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
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium lg:font-bold py-1  px-2 lg:py-2 lg:px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

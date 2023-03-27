import { useState } from 'react';
import { useRouter } from 'next/router';

function EnrollCourse() {
  const [formData, setFormData] = useState({
    urn: 2004603,
    name: 'John Doe',
    semester: 6,
    track: 'Machine Learning',
    contactNo: 9876543210,
    courseId: 'noc23-cs19',
    courseName: 'Social Networks'
  });
  const router = useRouter();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name + ': ' + value);
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // replace with actual form submission logic
    router.push('/dashboard');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Social Networks</h1>
      <p className="mb-4">About the course: Course description goes here...</p>
      <div className="text-center mb-4">
        <a href="https://example.com" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 inline-block" target="_blank" rel="noopener noreferrer">Nptel Link</a>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="urn" type="number" className="block text-gray-700 font-bold mb-2">University Roll No</label>
          <input id="urn" type="text" name="urn" value={formData.urn} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input id="name" type="text" name="name" value={formData.name} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="semester">
            Semester
          </label>
          <select
            className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="semester"
            name="semester"  // add name attribute for handleInputChange function
            value={formData.semester}  // set the value to formData.semester
            onChange={handleInputChange}  // move onChange event to select tag
          >
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="track">
            Track
          </label>
          <select className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="track" name='track' onChange={handleInputChange} value={formData.track}>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Network Technologies">Network Technologies</option>
            <option value="Data Management">Data Management</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Algorithm Design and Programming">Algorithm Design and Programming</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="contactNo" type="number" className="block text-gray-700 font-bold mb-2">Contact Number</label>
          <input id="contactNo" type="text" name="contactNo" value={formData.contactNo} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="courseId" className="block text-gray-700 font-bold mb-2">Course Id</label>
          <input id="courseId" type="text" name="courseId" value={formData.courseId} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="courseName" className="block text-gray-700 font-bold mb-2">Course Name</label>
          <input id="courseName" type="text" name="courseName" value={formData.courseName} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4 text-center">
          <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Register for Course</button>
        </div>

      </form>
    </div>
  )


}

export default EnrollCourse;

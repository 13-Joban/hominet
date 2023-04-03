import { useState } from 'react';
import { useRouter } from 'next/router';

function EnrollCourse({courseName, courseId, courseLink}) {
  console.log('props in  enrollcourse component ', courseName, courseId, courseLink);
  const router = useRouter();
  const [formData, setFormData] = useState({
    urn: 2004603,
    name: 'John Doe',
    semester: 6,
    parentBranch: 'Mechanical Engineering',
    contactNo: 9876543210,
    courseId: `${courseId}`,
    courseName: `${courseName}`,
    sgpa1stSem: 10.0,
    sgpa2ndSem: 10.0
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name + ': ' + value);
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // replace with actual form submission logic
    router.push('/minor/enrolled/allcourses');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{courseName}</h1>
      <p className="mb-4">About the course: Course description goes here...</p>
      <div className="text-center mb-4">
        <a href={courseLink} className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 inline-block" target="_blank" rel="noopener noreferrer">Nptel Link</a>
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
          <label className="block text-gray-700 font-bold mb-2" htmlFor="parentBranch">
          Parent Branch
          </label>
          <select className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="parentBranch" name='parentBranch' onChange={handleInputChange} value={formData.parentBranch}>
            <option value="Information Tecnology">Information Tecnology</option>
            <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
            <option value="Electrical Engnieering">Electrical Engnieering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Production Engineering">Production Engineering</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="contactNo" type="number" className="block text-gray-700 font-bold mb-2">Contact Number</label>
          <input id="contactNo" type="text" name="contactNo" value={formData.contactNo} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="courseId" className="block text-gray-700 font-bold mb-2">Course Id</label>
          <input id="courseId" type="text" name="courseId" value={formData.courseId} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" readOnly/>
        </div>
        <div className="mb-4">
          <label htmlFor="courseName" className="block text-gray-700 font-bold mb-2">Course Name</label>
          <input id="courseName" type="text" name="courseName" value={formData.courseName} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" readOnly/>
        </div>
        <div className="mb-4">
          <label htmlFor="sgpa1stSem" className="block text-gray-700 font-bold mb-2">SGPA (1st Sem)</label>
          <input id="sgpa1stSem" type="text" name="sgpa1stSem" value={formData.sgpa1stSem} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="sgpa2ndSem" className="block text-gray-700 font-bold mb-2">SGPA (2nd Sem)</label>
          <input id="sgpa2ndSem" type="text" name="sgpa2ndSem" value={formData.sgpa2ndSem} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4 text-center">
          <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Register for Course</button>
        </div>

      </form>
    </div>
  )


}

export default EnrollCourse;
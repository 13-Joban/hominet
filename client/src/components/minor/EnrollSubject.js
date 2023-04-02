import {useState} from 'react'
import { useRouter } from 'next/router';

function EnrollSubject({subjectName, subjectCode}) {

  console.log('in EnrollSubject props ' +  subjectName, subjectCode);
  const [formData, setFormData] = useState({
    urn: 2004603,
    name: 'John Doe',
    semester: 6,
    parentBranch: 'Mechanical Engineering',
    contactNo: 9876543210,
    subjectCode: subjectCode,
    subjectName: subjectName,
    sgpa1stSem: 10.0,
    sgpa2ndSem: 10.0,
    sgpa3rdSem: 10.0,
    sgpa4thSem: 10.0,
    sgpa5thSem: 10.0,
    sgpa6thSem: 10.0,
    sgpa7thSem: 10.0,
    sgpa8thSem: 10.0,
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
      <h1 className="text-3xl font-bold mb-4">Computer Graphics</h1>
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
          <label htmlFor="subjectCode" className="block text-gray-700 font-bold mb-2">Subject Code</label>
          <input id="subjectCode" type="text" name="subjectCode" value={formData.subjectCode} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="subjectName" className="block text-gray-700 font-bold mb-2">Subject Name</label>
          <input id="subjectName" type="text" name="subjectName" value={formData.subjectName} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="sgpa1stSem" className="block text-gray-700 font-bold mb-2">SGPA (1st Sem)</label>
          <input id="sgpa1stSem" type="text" name="sgpa1stSem" value={formData.sgpa1stSem} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="sgpa2ndSem" className="block text-gray-700 font-bold mb-2">SGPA (2nd Sem)</label>
          <input id="sgpa2ndSem" type="text" name="sgpa2ndSem" value={formData.sgpa2ndSem} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="sgpa3rdSem" className="block text-gray-700 font-bold mb-2">SGPA (3rd Sem)</label>
          <input id="sgpa3rdSem" type="text" name="sgpa3rdSem" value={formData.sgpa3rdSem} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="sgpa4thSem" className="block text-gray-700 font-bold mb-2">SGPA (4th Sem)</label>
          <input id="sgpa4thSem" type="text" name="sgpa4thSem" value={formData.sgpa4thSem} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="sgpa5thSem" className="block text-gray-700 font-bold mb-2">SGPA (5th Sem)</label>
          <input id="sgpa5thSem" type="text" name="sgpa5thSem" value={formData.sgpa5thSem} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="sgpa6thSem" className="block text-gray-700 font-bold mb-2">SGPA (6th Sem)</label>
          <input id="sgpa6thSem" type="text" name="sgpa6thSem" value={formData.sgpa6thSem} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="sgpa7thSem" className="block text-gray-700 font-bold mb-2">SGPA (7th Sem)</label>
          <input id="sgpa7thSem" type="text" name="sgpa7thSem" value={formData.sgpa7thSem} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="sgpa8thSem" className="block text-gray-700 font-bold mb-2">SGPA (8th Sem)</label>
          <input id="sgpa8thSem" type="text" name="sgpa8thSem" value={formData.sgpa8thSem} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4 text-center">
          <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Enroll for Subject</button>
        </div>
      </form>
    </div>
  )

}

export default EnrollSubject

import {useState} from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';

function EnrollSubject({subjectName, subjectCode}) {

  const router = useRouter();
  const dispatch = useDispatch();
  const student = useSelector(state => state.student.user);
  const {crn, name, semester, branch, contactNo} = student;

 
  const [formData, setFormData] = useState({
    crn: crn,
    name: name,
    semester: semester,
    parentBranch: branch,
    contactNo: contactNo,
    subjectCode: subjectCode,
    subjectName: subjectName,
  });

  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name + ': ' + value);
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const url = `http://localhost:4040/api/subjects/enroll/${subjectCode}`;
    const token = Cookies.get('token');

    try {
      const response = await axios.post(url, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response);
     
       
       
      // console.log(student);
      
    } catch (error) {
      console.log(error);
      // handle error
    }
    // dispatch(enrollInCourse(courseId));
    router.push('/minor/enrolled/allcourses');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="lg:text-3xl text-2xl text-red font-normal mb-4">{subjectName}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
      {/* <div>
          <label htmlFor="crn" type="number" className="block text-gray-700 font-bold mb-2">College Roll No</label>
          <input id="crn" type="text" name="crn" value={formData.crn}  onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" readOnly/>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input id="name" type="text" name="name" value={formData.name} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" readOnly/>
        </div>
        <div className="mb-4">
          <label htmlFor="semester" className="block text-gray-700 font-bold mb-2">Semester</label>
          <input id="semester" type="text" name="semester" value={formData.semester} onChange={handleInputChange}  className="border border-gray-300 rounded-md p-2 w-full" readOnly/>
        </div>
        <div className="mb-4">
          <label htmlFor="parentBranch" className="block text-gray-700 font-bold mb-2">Parent Branch</label>
          <input id="parentBranch" type="text" name="parentBranch" value={formData.parentBranch} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" readOnly />
        </div> */}
        <div className="mb-4">
          <label htmlFor="subjectCode" className="block text-gray-700 font-bold mb-2">Subject Code</label>
          <input id="subjectCode" type="text" name="subjectCode" value={formData.subjectCode} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" readOnly/>
        </div>
        <div className="mb-4">
          <label htmlFor="subjectName" className="block text-gray-700 font-bold mb-2">Subject Name</label>
          <input id="subjectName" type="text" name="subjectName" value={formData.subjectName} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" readOnly/>
        </div>
      
        <div className="mb-4 text-center">
          <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Enroll for Subject</button>
        </div>
      </form>
    </div>
  )

}

export default EnrollSubject

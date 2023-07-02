import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
// import {enrollInCourse} from '../../store/slices/courseSlice'
import Cookies from 'js-cookie';
import axios from 'axios';

function EnrollCourse({courseName, courseId, courseLink, duration, offeredBy, session}) {
  // console.log(courseName, courseId, courseLink, duration, offeredBy)

  const router = useRouter();
  // const dispatch = useDispatch();
  const student = useSelector(state => state.student.user);
  const {crn, name, semester, branch, contactNo} = student;

  // console.log(student);
  const [formData, setFormData] = useState({
    crn: crn,
    name: name,
    semester: semester,
    parentBranch: branch,
    contactNo: contactNo,
    courseId: `${courseId}`,
    courseName: `${courseName}`,
    session: `${session}`,
    sgpa1stSem: 10.0,
    sgpa2ndSem: 10.0
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData); // replace with actual form submission logic
    // console.log(courseId);
    const url = `http://localhost:4040/api/courses/enroll/${courseId}`;
    const token = Cookies.get('token');

    try {
      const response = await axios.post(url, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // console.log(response.data);
      // update state or do something with the response
    } catch (error) {
      console.log(error);
      // handle error
    }
    // dispatch(enrollInCourse(courseId));
    router.push('/minor/enrolled/allcourses');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="lg:text-3xl text-2xl text-red font-normal mb-4">{courseName}</h1>
      {/* <hr style={{border: '0.5px solid black'}} /> */}
      <p className="mb-4">About the course : </p>
      <p className="mb-4">This course includes examples of analytics in a wide variety of industries, and we hope that students will learn how you can use analytics in their career and life. One of the most important aspects of this course is that you, the student, are getting hands-on experience creating analytics models</p>
      <p className="mb-4">Duration :{duration} </p>
      <p className="mb-4">Offered By :{offeredBy} </p>
      <div className="text-center mb-4">
        <a href={courseLink} className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 inline-block" target="_blank" rel="noopener noreferrer">Nptel Link</a>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
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
        </div>
        {/* <div className="mb-4">
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
        </div> */}
        <div className="mb-4">
          <label htmlFor="contactNo" type="number" className="block text-gray-700 font-bold mb-2">Contact Number</label>
          <input id="contactNo" type="text" name="contactNo" value={formData.contactNo}  onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" readOnly/>
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
          <label htmlFor="courseSession" className="block text-gray-700 font-bold mb-2">Course Session</label>
          <input id="courseSession" type="text" name="courseSession" value={formData.session} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2 w-full" readOnly/>
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
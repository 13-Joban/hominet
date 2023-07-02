import EnrolledCourses from '../../../components/minor/EnrolledCourses'
import EnrolledSubjects from '../../../components/minor/EnrolledSubjects'
import Layout from '../../../components/Layout'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie';
import {useEffect, useState} from 'react'
import { fetchEnrolledCourses } from '../../../api';

function Enrolled() {
  // const enrolledCourses = useSelector(state => state.courses.enrolledCourses)
  // console.log(enrolledCourses);

  // const [enrolledCourses, setEnrolledCourses] = useState([]);
  // // console.log(enrolledCourses);

  // useEffect(() => {
  //   const getEnrolledCourses = async () => {
  //     const url = `http://localhost:4040/api/courses/enrolledcourses`;
  //     const token = Cookies.get('token');
      
  //     try {
  //       const response = await axios.get(url, {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });
  //       setEnrolledCourses(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getEnrolledCourses();
  // }, []);
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(state => state.courses.enrolledCourses);

  useEffect(() => {
    dispatch(fetchEnrolledCourses());
  }, [dispatch]);
  const enrolledSubjects = useSelector(state => state.subjects.enrolledSubjects)
  return (
    <Layout>
      <div className="flex flex-col justify-between min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:py-1">
        {enrolledCourses.length > 0 && <div className="mx-auto mb-8 w-full sm:w-1/2">
          <div className="flex flex-col mb-8">
            <h1 className="text-xl text-red font-normal mb-4 sm:text-2xl">Enrolled MOOC Courses for Minor Engineering Degree </h1>
            <hr style={{ border: '1px solid black' }} />
          </div>
          <EnrolledCourses />
        </div>}
        {enrolledSubjects.length > 0 && <div className="mx-auto w-full sm:w-1/2">
          <div className="flex flex-col mb-8 ">
            <h1 className="text-xl text-red font-normal mb-4 sm:text-2xl">Enrolled Classroom Subjects for Minor Engineering  </h1>
            <hr style={{ border: '1px solid black' }} />
          </div>
          <EnrolledSubjects />
        </div>}
      </div>
    </Layout>
  )
}

export default Enrolled

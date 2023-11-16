import { useSelector, useDispatch } from 'react-redux';
import CourseCard from "../CourseCard";
import getCourseImage from "../../utils/getCourseImage"
import {useEffect} from 'react'
import {fetchEnrolledCourses} from '../../api'

function EnrolledCourses() {
  // const [enrolledCourses, setEnrolledCourses] = useState([]);
  // console.log(enrolledCourses);
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(state => state.courses.enrolledCourses);

  useEffect(() => {
    dispatch(fetchEnrolledCourses());
  }, [dispatch]);

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

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {enrolledCourses && enrolledCourses.map((course, index) => (
        <CourseCard key={course.id} course={course.Course} isEnrolled={true} imageSrc={getCourseImage(index)} />
      ))}
    </div>
  );
}

export default EnrolledCourses;

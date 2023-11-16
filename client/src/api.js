import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from './store/slices/studentSlice';
import { adminlogin , adminlogout} from './store/slices/adminSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';


export const getAllCourses = createAsyncThunk(
  'courses/getAllCourses',
  async () => {
    const url = 'http://localhost:4040/api/courses';
    const token = Cookies.get('token');
    // console.log(token);

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      // handle error
    }
  }
)
export const getCourseById = createAsyncThunk(
  'courses/getCourseById',
  async (id) => {
    // console.log(id);
    const url = `http://localhost:4040/api/courses/${id}`

    const response = await axios.get(url);
    console.log(response.data)
    return response.data;
  }
);

export const addNewCourse = createAsyncThunk(
  'courses/addNewCourse',
  async (course) => {
    // console.log(course);
    const url = 'http://localhost:4040/api/admin/courses/add'
    const token = Cookies.get('admin_token');
    // console.log(token);
    const response = await axios.post(url, course, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data);

    return response.data;
  }
);
export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async ({ courseId, updatedCourse }) => {
      console.log('in spi vsll ' , courseId, updatedCourse)
    const url = `http://localhost:4040/api/admin/courses/update/${courseId}`;
    const token = Cookies.get('admin_token');

    try {
      const response = await axios.put(url, updatedCourse, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchEnrolledCourses = createAsyncThunk(
  'courses/fetchEnrolledCourses',
  async () => {
    const url = 'http://localhost:4040/api/courses/enrolledcourses';
    const token = Cookies.get('token');
    // console.log(token);

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      // handle error
    }
  }
);

export const getStudentData = async (studentId) => {
  try {
    const crn = studentId;
    // console.log(crn);
    const url = `http://localhost:4040/api/admin/students/${crn}/getStudentDetails`
    const token = Cookies.get('admin_token');
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return response.data; // Assuming your API returns student data in JSON format
  } catch (error) {
    console.error('Error fetching student data:', error);
    throw error; // Handle errors in the calling component
  }
};

export const getEnrolledStudents = async (degreeType) => {
  const url = 'http://localhost:4040/api/admin/getEnrolledStudents';
  const token = Cookies.get('admin_token');
  try {
    const response = await axios.get(url,  { headers: { Authorization: `Bearer ${token}` },   params: { degreeType }, },  );
    return response.data; // Return the actual data from the API response
  } catch (error) {
    console.error('Error fetching enrolled students:', error);
    return []; // Return an empty array in case of an error
  }
};


export const useAdminLogin = () => {
  const dispatch = useDispatch();

  const loginHandler = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:4040/api/admin/login', { username, password });

      const { data: { token, admin } } = response;

      // console.log(token, admin);

      // Save the JWT token in a cookie
        Cookies.set('admin_token', token);
      
      dispatch(adminlogin(admin)); // dispatch the response data as the payload
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  return loginHandler;
};


export const useLogin = () => {
    const dispatch = useDispatch();

    const loginHandler = async (crn, password) => {
      try {
        const response = await axios.post('http://localhost:4040/api/user/login', { crn, password });

        const { data: { token, user } } = response;

        // console.log(token, user);

        // Save the JWT token in a cookie
          Cookies.set('token', token);
        
        dispatch(login(user)); // dispatch the response data as the payload

        return user; // Return true to indicate successful login
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    };
  
    return loginHandler;
  };
export const useRegister = () => {
  
  const registerHandler = async (studentData) => {
    try {
      const response = await axios.post('http://localhost:4040/api/system-manager/addStudent', studentData);

      const { data: { student } } = response;

      // console.log( student);

      return true; // Return true to indicate successful login
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  return registerHandler;

}
export const getCoursesByType = createAsyncThunk(
  'courses/getCoursesByType',
  async (type, thunkAPI) => {
    try {
      const url = `http://localhost:4040/api/admin/courses/type/${type}`;
      const token = Cookies.get('admin_token');
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);


// Create an Async Thunk for getting all subjects
export const getAllSubjects = createAsyncThunk(
  'subjects/getAllSubjects',
  async () => {
    const url = 'http://localhost:4040/api/subjects'

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Create an Async Thunk for getting a subject by ID
export const getSubjectByCode = createAsyncThunk(
  'subjects/getSubjectByCode',
  async (subjectCode) => {
    const url = `http://localhost:4040/api/subjects/${subjectCode}`;
  

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
)

export const fetchEnrolledSubjects = createAsyncThunk(
  'subjects/fetchEnrolledSubjects',
  async () => {
    const url = 'http://localhost:4040/api/subjects/enrolledsubjects';
    const token = Cookies.get('token');

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      // handle error
    }
  }
);

export const adminLogout = createAsyncThunk(
  'admin/logout',
  async (_, { dispatch }) => {
    try {
      const url = 'http://localhost:4040/api/admin/logout';
      const token = Cookies.get('admin_token');

      // Make a POST request to the logout endpoint
      await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Dispatch the adminlogout action to update the Redux state
      dispatch(adminlogout());

      // Optionally, you can redirect the user to the login page or perform other actions
    } catch (error) {
      console.error('Admin logout failed', error);
      throw error;
    }
  }
);
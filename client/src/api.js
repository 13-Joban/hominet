import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from './store/slices/studentSlice';
import { adminlogin } from './store/slices/adminSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';


export const getAllCourses = createAsyncThunk(
  'courses/getAllCourses',
  async () => {
    const response = await axios.get('http://localhost:4040/api/courses');
    return response.data;
  }
)
export const getCourseById = createAsyncThunk(
  'courses/getCourseById',
  async (id) => {
    console.log(id);
    const url = `http://localhost:4040/api/courses/${id}`

    const response = await axios.get(url);
    return response.data;
  }
);

export const addNewCourse = createAsyncThunk(
  'courses/addNewCourse',
  async (course) => {
    console.log(course);
    const url = 'http://localhost:4040/api/admin/courses/add'
    const token = Cookies.get('admin_token');
    // console.log(token);
    const response = await axios.post(url, course, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);

    return response.data;
  }
);
export const fetchEnrolledCourses = createAsyncThunk(
  'courses/fetchEnrolledCourses',
  async () => {
    const url = 'http://localhost:4040/api/courses/enrolledcourses';
    const token = Cookies.get('token');
    console.log(token);

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      // handle error
    }
  }
);

export const useAdminLogin = () => {
  const dispatch = useDispatch();

  const loginHandler = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:4040/api/admin/login', { username, password });

      const { data: { token, admin } } = response;

      console.log(token, admin);

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

        console.log(token, user);

        // Save the JWT token in a cookie
          Cookies.set('token', token);
        
        dispatch(login(user)); // dispatch the response data as the payload
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    };
  
    return loginHandler;
  };
  
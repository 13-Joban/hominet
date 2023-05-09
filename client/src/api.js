import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from './store/slices/studentSlice';
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
  
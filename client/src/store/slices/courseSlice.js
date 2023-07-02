import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios';
import {getAllCourses, getCourseById, fetchEnrolledCourses} from '../../api';



const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    allCourses: [],
    selectedCourse: null,
    enrolledCourses: []
  },
  reducers: {
    completeCourse: (state, action) => {
      const courseIndex = state.enrolledCourses.findIndex(course => course.courseId === action.payload);
      if (courseIndex !== -1) {
        state.enrolledCourses[courseIndex].isCompleted = true;
      }
    },
    setAllCourses: (state, action) => {
      state.allCourses = action.payload;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
  },
  extraReducers: {
    [getAllCourses.pending]: (state) => {
      state.status = 'loading';
    },
    [getAllCourses.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.allCourses = action.payload;
    },
    [getAllCourses.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [getCourseById.pending]: (state) => {
      state.status = 'loading';
    },
    [getCourseById.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.selectedCourse = action.payload;
    },
    [getCourseById.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [fetchEnrolledCourses.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchEnrolledCourses.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.enrolledCourses = action.payload;
    },
    [fetchEnrolledCourses.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },


  },

});

export const { setEnrolledCourses, setAllCourses, completeCourse} = coursesSlice.actions;


export default coursesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { getAllCourses, getCourseById, fetchEnrolledCourses } from '../../api';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    allCourses: [],
    selectedCourse: null,
    enrolledCourses: [],
    status: 'idle', // Add the status field to the initial state
    error: null,    // Add the error field to the initial state
  },
  reducers: {
    completeCourse: (state, action) => {
      const courseIndex = state.enrolledCourses.findIndex(
        (course) => course.courseId === action.payload
      );
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
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allCourses = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getCourseById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedCourse = action.payload;
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.enrolledCourses = action.payload;
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setEnrolledCourses, setAllCourses, completeCourse } = coursesSlice.actions;

export default coursesSlice.reducer;

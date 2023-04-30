import { createSlice } from '@reduxjs/toolkit';
import getAllCourses from '../../utils/getAllCourses';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    allCourses: getAllCourses(),
    enrolledCourses: [],
  },
  reducers: {
    enrollCourse: (state, action) => {
      const courseIndex = state.allCourses.findIndex(course => course.courseId === action.payload);
      if (courseIndex !== -1) {
        state.allCourses[courseIndex].isEnrolled = true;
        state.enrolledCourses.push(state.allCourses[courseIndex]);
      }
    },
    completeCourse: (state, action) => {
      const courseIndex = state.enrolledCourses.findIndex(course => course.courseId === action.payload);
      if (courseIndex !== -1) {
        state.enrolledCourses[courseIndex].isCompleted = true;
      }
    },
  },
});

export const { enrollCourse, completeCourse } = coursesSlice.actions;

export default coursesSlice.reducer;

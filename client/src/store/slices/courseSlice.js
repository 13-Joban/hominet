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
  },
});

export const { enrollCourse } = coursesSlice.actions;

export default coursesSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './slices/courseSlice';
import subjectsReducer from './slices/subjectSlice';

export default configureStore({
  reducer: {
    courses: coursesReducer,
    subjects: subjectsReducer
  },
});

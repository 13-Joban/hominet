import { createSlice } from '@reduxjs/toolkit';
import getAllSubjects from '../../utils/getAllSubjects';

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: {
    allSubjects: getAllSubjects(),
    enrolledSubjects: [],
  },
  reducers: {
    enrollSubject: (state, action) => {
      const subjectIndex = state.allSubjects.findIndex(subject => subject.subjectCode === action.payload);
      if (subjectIndex !== -1) {
        state.allSubjects[subjectIndex].isEnrolled = true;
        state.enrolledSubjects.push(state.allSubjects[subjectIndex]);
      }
    },
    completeSubject: (state, action) => {
      const subjectIndex = state.enrolledSubjects.findIndex(subject => subject.subjectCode === action.payload);
      if (subjectIndex !== -1) {
        state.enrolledSubjects[subjectIndex].isCompleted = true;
      }
    },
  },
});

export const { enrollSubject, completeSubject } = subjectsSlice.actions;

export default subjectsSlice.reducer;

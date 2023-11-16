import { createSlice } from '@reduxjs/toolkit';
import { getAllSubjects, getSubjectByCode, fetchEnrolledSubjects } from '../../api';

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: {
    allSubjects: [],
    selectedSubject: null,
    enrolledSubjects: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    completeSubject: (state, action) => {
      const subjectIndex = state.enrolledSubjects.findIndex(
        (subject) => subject.subjectCode === action.payload
      );
      if (subjectIndex !== -1) {
        state.enrolledSubjects[subjectIndex].isCompleted = true;
      }
    },
    setAllSubjects: (state, action) => {
      state.allSubjects = action.payload;
    },
    setSelectedSubject: (state, action) => {
      state.selectedSubject = action.payload;
    },
    setEnrolledSubjects: (state, action) => {
      state.enrolledSubjects = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllSubjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allSubjects = action.payload;
      })
      .addCase(getAllSubjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getSubjectByCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSubjectByCode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedSubject = action.payload;
      })
      .addCase(getSubjectByCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchEnrolledSubjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEnrolledSubjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.enrolledSubjects = action.payload;
      })
      .addCase(fetchEnrolledSubjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  completeSubject,
  setAllSubjects,
  setEnrolledSubjects,
} = subjectsSlice.actions;

export default subjectsSlice.reducer;

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { combineReducers } from 'redux';

import coursesReducer from './slices/courseSlice';
import subjectsReducer from './slices/subjectSlice';
import studentReducer from './slices/studentSlice';
import adminReducer from './slices/adminSlice';

const rootReducer = combineReducers({
  courses: coursesReducer,
  subjects: subjectsReducer,
  student: studentReducer,
  admin: adminReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['student', 'admin']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);





const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware({ serializableCheck: false })], // Add serializableCheck: false to ignore non-serializable values temporarily
});


const persistor = persistStore(store);

export { store, persistor };

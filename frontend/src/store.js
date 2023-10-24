import { configureStore } from '@reduxjs/toolkit';
import songListReducer from './reducers/songListReducer';
export default configureStore({
  reducer: {
    songList: songListReducer,
  }
})
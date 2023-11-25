import { combineReducers, configureStore } from '@reduxjs/toolkit';
import postsReducer from "../features/postslice";
import photoReducer from '../features/photoslice';


const rootReducer = combineReducers({
    photos: photoReducer,
    posts: postsReducer,
  });
  
  const store = configureStore({
    reducer: rootReducer,
  });
  
  export default store;
  
  export type RootState = ReturnType<typeof rootReducer>;
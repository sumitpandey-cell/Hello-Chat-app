//create a redux store
import { configureStore } from '@reduxjs/toolkit';
import userReducers from '../features/userSlice';

export const store = configureStore({
    reducer: userReducers
})

export default store;


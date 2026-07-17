import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './features/taskSlice';
// Note: You would also include an authReducer here for login/registration

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
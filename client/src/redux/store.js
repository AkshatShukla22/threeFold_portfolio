import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './slices/toastSlice';
import settingsReducer from './slices/settingsSlice';
export const store = configureStore({ reducer: { toast: toastReducer, settings: settingsReducer } });

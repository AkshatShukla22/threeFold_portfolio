import { createSlice } from '@reduxjs/toolkit';
const toastSlice = createSlice({
  name:'toast', initialState:{toasts:[]},
  reducers:{
    addToast:(s,a)=>{ s.toasts.push({id:Date.now(),...a.payload}) },
    removeToast:(s,a)=>{ s.toasts=s.toasts.filter(t=>t.id!==a.payload) },
  }
});
export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;

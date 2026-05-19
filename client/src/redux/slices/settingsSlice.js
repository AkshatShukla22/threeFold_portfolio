import { createSlice } from '@reduxjs/toolkit';
const settingsSlice = createSlice({
  name:'settings', initialState:{data:null, loading:false},
  reducers:{
    setSettings:(s,a)=>{ s.data=a.payload },
    setLoading:(s,a)=>{ s.loading=a.payload },
  }
});
export const { setSettings, setLoading } = settingsSlice.actions;
export default settingsSlice.reducer;

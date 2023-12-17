import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    userInfo:null,
    contactInfo:null
  },
  reducers: {
    setuser(state, action) {
      state.userData = action.payload
    },
    setPersonalInfo(state,action){
      state.userInfo = action.payload
    },
    setContactlInfo(state,action){
      state.contactInfo = action.payload
    }
  }
})
export const { setuser, setPersonalInfo,setContactlInfo } = UserSlice.actions;

export default UserSlice.reducer;
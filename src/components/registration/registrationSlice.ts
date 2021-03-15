import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import app from 'firebase/app';
import { User } from "../../interfaces";
import firebaseConfig from './../../config/firebaseConfig'

if (!app.apps.length) {
    app.initializeApp(firebaseConfig);

  }
export const addUser:any = createAsyncThunk(
    "addUser",
    async (user:User) => {
        // const getdata=user
        var db = app.firestore()
   
        await db.doc('users/'+user.uid).set(user)
    }
  );

export const registrationSlice = createSlice({
    name: "counter",
    initialState: { value: 0, isLoading: false },
    reducers: {
         increament: (state, action) => {
        // console.log("state", state.value);
        state.value += 1;
      },
      decreament: (state) => {
        state.value -= 1;
      },
  
      reset: (state) => {
        state.value = 0;
      },
    },
    extraReducers: {
        [addUser.fulfilled]: (state, action) => {
          console.log("api hit the server");
        },
        [addUser.rejected]: (state, action) => {
          console.log("api rejected");
        },
        [addUser.pending]: (state, action) => {
          console.log("pending");
        },
      },

  });
  export const { increament, decreament, reset } = registrationSlice.actions;
  export const counterValue  = (state:any) => ({
    value: state.counter.value,
    isloading: state.counter.isLoading,
  });
  export default registrationSlice.reducer;
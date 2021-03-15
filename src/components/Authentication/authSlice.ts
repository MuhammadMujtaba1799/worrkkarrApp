import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import app from 'firebase/app';
import firebaseConfig from './../../config/firebaseConfig'
import firebase from 'firebase'
import { useHistory } from "react-router";

if (!app.apps.length) {
    app.initializeApp(firebaseConfig);

  }

  export const userAuth = createAsyncThunk(
    "number/fetchRandomNumber",
    async (data, thunkAPI) => {
      const history=useHistory()
     const result= await firebase.auth().onAuthStateChanged( function (user) {
        if (!user) {
          history.push('/')
          return 0
        }
        else{
          return 1
        }
      })
      return result
    }
  );
export const authSlice = createSlice({
    name: "authentication",
    initialState: { auth: 0,isUserLogedIn:0 },
    reducers: {
         handleAuth: (state,action) => {

        state.isUserLogedIn=action.payload
      },
  
    },
    extraReducers: {
      [userAuth.fulfilled.toString()]: (state, action) => {
        state.isUserLogedIn = action.payload;
      },
 
    },


  });
  export const { handleAuth } = authSlice.actions;
  export const authValue  = (state:any) => ({
    state
  });
  export default authSlice.reducer;
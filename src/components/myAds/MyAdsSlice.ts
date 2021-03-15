import { createSlice } from "@reduxjs/toolkit";
import app from 'firebase/app';
import firebaseConfig from './../../config/firebaseConfig'

if (!app.apps.length) {
    app.initializeApp(firebaseConfig);

  }


export const myAdsSlice = createSlice({
    name: "myAdsSlice",
    initialState: { auth: "huzaifa"},
    reducers: {
         fetchAds: () => {
      },
  
    },


  });
  export const { fetchAds } = myAdsSlice.actions;
  export const myAdsValue  = (state:any) => ({
    state,
  });
  export default myAdsSlice.reducer;
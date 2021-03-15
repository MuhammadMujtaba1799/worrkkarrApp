import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import app from 'firebase/app';
import firebaseConfig from './../../config/firebaseConfig'

if (!app.apps.length) {
    app.initializeApp(firebaseConfig);

  }
export const addPost:any = createAsyncThunk(
    "addPost",
    async (post:any) => {
        // const getdata=post
        var db = app.firestore()
   
        await db.doc('duplicate products data/'+post.id).set(post)
    }
  );
  export const getPosterName:any = createAsyncThunk(
    "getPosterName",
    async (Uid:string) => {
        // const getdata=post
        let db=app.firestore()
        // let Data=await db.collection('users').where('uid','==',uid).get().then((data)=>{data.forEach((docs)=>{console.log('get data from firestore',docs.data())})})
       let Data:any=await db.doc('users/' + Uid).get().then((data)=>{return data.data()})
       console.log('data data data', Data.name)
       
       return Data.name
    }
  );


export const CreatePostSlice = createSlice({
    name: "counter",
    initialState: { },
    reducers: {
    },
    extraReducers: {
        [addPost.fulfilled]: (state, action) => {
          console.log("api hit the server");
        },
        [addPost.rejected]: (state, action) => {
          console.log("api rejected");
        },
        [addPost.pending]: (state, action) => {
          console.log("pending");
        },
      },

  });
  export const GetPosterName = createSlice({
    name: "Counter",
    initialState: { value: []},
    reducers: {
    },
    extraReducers: {
        [getPosterName.fulfilled]: (state, action) => {
          console.log("api hit the server");
          // console.log('action.payload',action.payload)
          state.value=action.payload
          console.log('state',state.value)
        },
        [getPosterName.rejected]: (state, action) => {
          console.log("api rejected");
        },
        [getPosterName.pending]: (state, action) => {
          console.log("pending");
        },
      },

  });
  export const counterValue  = (state:any) => ({
    value: state.counter.value,
    // isloading: state.counter.isLoading,
  });
  export const counterV  = (state:any,action:any) => ({
    value :state.Counter.value,})
  export default GetPosterName.reducer
  // default CreatePostSlice.reducer;
  // export default GetPosterName.reducer
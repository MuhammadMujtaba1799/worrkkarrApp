import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import app from 'firebase/app';
import firebaseConfig from './../../config/firebaseConfig'
import {Chat,Message} from '../../interfaces'
if (!app.apps.length) {
    app.initializeApp(firebaseConfig);

  }
  
export const createChat:any= createAsyncThunk(
    "createChat",

      async  (chatDocAndMessage:Chat)=> {
        const newChat:Chat= chatDocAndMessage
        let db: app.firestore.Firestore=app.firestore();
        let chatId:string;
        if(newChat['participantIds'][1]>newChat['participantIds'][0]){
          chatId =newChat['participantIds'][0]+newChat['participantIds'][1]
        }else{
          chatId=newChat['participantIds'][1]+newChat['participantIds'][0]
        } 
        await db.collection('chats').doc(chatId).set(newChat)         
      }  
  );
  export const NewMessage:any= createAsyncThunk(
    "NewMessage",
      async  (NewMessage:Array<any>)=> {
        let db: app.firestore.Firestore=app.firestore();
        const chatId:string= NewMessage[0]
        const newMessage:Message=NewMessage[1]
        await db.collection('chats').doc(chatId).collection('messages').add(newMessage)      
      }  
  );



export var createChatSlice = createSlice({
    name: "counter",
    initialState:{value:[]},
    reducers: { 
    },
    extraReducers: {
        [createChat.fulfilled] :(state,action)=> {
        },
        [createChat.rejected]: (state, action) => {
        },
        [createChat.pending]: (state, action) => {
        },
      },
    

  });  
  export var NewmessageSlice = createSlice({
    name: "counter",
    initialState:{value:[]},
    reducers: { 
    },
    extraReducers: {
        [NewMessage.fulfilled] :(state,action)=> {
          console.log("NewMessage Api Hitting")
          console.log('action payload',action.payload)
        },
        [NewMessage.rejected]: (state, action) => {
          console.log(" NewMessage api rejected");
          console.log()
        },
        [NewMessage.pending]: (state, action) => {
          console.log("NewMessage pending");
        },
      },
    

  });
  export const chatcounter  = (state:any) => ({
    value: state.counter.value,});
  export default NewmessageSlice.reducer;
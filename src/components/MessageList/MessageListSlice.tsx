import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import firebaseConfig from './../../config/firebaseConfig'
import firebase from 'firebase'
import app from 'firebase/app';
if (!app.apps.length) {
    app.initializeApp(firebaseConfig);

  }
export const fetchMyInbox=createAsyncThunk(
    "MyInbox",
    async ()=>{
    }
)

export const MessageSlice=createSlice({
    name:"messageSlice",
    initialState:{},
    reducers:{
        increament:(state)=>{
            let db = app.firestore()
            // let chats
            firebase.auth().onAuthStateChanged(async function name(user) {
                if(user){
                    await db.collection("chats")
                    .get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            state=doc.data()                            
                        });
                        
                        
                    })
                }
            })
        }
    },
    extraReducers:{
        [fetchMyInbox.fulfilled.toString()]:(state,action)=>{
        },
        [fetchMyInbox.rejected.toString()]:(state,action)=>{
        },
        [fetchMyInbox.pending.toString()]:(state,action)=>{
        }

    }

})
export const {increament} = MessageSlice.actions
export const myInboxData=(state:any)=>({
    state
}) 
export default MessageSlice.reducer 
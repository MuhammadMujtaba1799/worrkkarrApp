import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import app from 'firebase/app';
import firebaseConfig from './../../config/firebaseConfig'
import { Product } from "../../interfaces";

if (!app.apps.length) {
    app.initializeApp(firebaseConfig);

  }
  let db: app.firestore.Firestore;  
export const getSubCategoryProduct:any= createAsyncThunk(
    "getSubCategoryProduct",
      async function (getcategories:any) {
        db=app.firestore();
        var getData:Array<Product>=await db
      .collection('duplicate products data')
      .where('categoryId', '==', getcategories.categoryId)
      .where('subcategoryId', '==', getcategories.subcategory.name)
      .get()
      .then((querySnapshot) => {
        var data: Array<Product> = [];
        querySnapshot.forEach((docs) => {
          data.push({
            id: docs.data().id,
            posterId: docs.data().posterId,
            categoryId: docs.data().categoryId,
            subcategoryId: docs.data().subcategoryId,
            title: docs.data().title,
            forHire: docs.data().forHire,
            city: docs.data().city,
            area: docs.data().area,
            description: docs.data().description,
            price: docs.data().price,
            phoneNumber: docs.data().phoneNumber,
            name:docs.data().name,
            urls:docs.data().urls,
          });
        });
        return data
        
      });
      return getData
  });


export var subCategorySlice = createSlice({
    name: "counter",
    initialState:{ value: [] },
    
      

    reducers: { 
    },
    extraReducers: {
        [getSubCategoryProduct.fulfilled] :(state,action)=> {
          state.value=action.payload       
        },
        [getSubCategoryProduct.rejected]: (state, action) => {
        },
        [getSubCategoryProduct.pending]: (state, action) => {
        },
      },
    

  });
  
  export const counterV  = (state:any) => ({
    value: state.value});
  export default subCategorySlice.reducer;
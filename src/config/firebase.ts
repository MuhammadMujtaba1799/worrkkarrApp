import app from 'firebase/app';

import firebaseConfig  from './firebaseConfig'
import {User} from './../interfaces'
import { Product } from "./../interfaces";




  if (!app.apps.length) {
    app.initializeApp(firebaseConfig);

  }




export const addUser = async (user:any) => {
  
    var db = app.firestore()
   
    await db.doc('users/'+user.uid).set(user)
  };
  
  
  
  export const getPosterName=  async (Uid:any) => {
     let db=app.firestore()
    let Data=await db.doc('users/' + Uid).get().then((data)=>{return data.data()})
    }
  
  export const getSubCategoryProduct=async (getcategories:any)=> {
    var db=app.firestore();
 var getData=await db
  .collection('duplicate products data')
  .where('categoryId', '==', getcategories.categoryId)
  .where('subcategoryId', '==', getcategories.subCategoryName)
  .get()
  // let val="huzaifa"
  .then((querySnapshot) => {
    var data: Array<Product> = [];
    querySnapshot.forEach((docs) => {
      data.push({
        id: docs.data().id,
        posterId: docs.data().posterId,
        categoryId: docs.data().categoryId,
        // categoryName:docs.data().categoryName,
        subcategoryId: docs.data().subcategoryId,
        title: docs.data().title,
        forHire: docs.data().forHire,
        city: docs.data().city,
        area: docs.data().area,
        description: docs.data().description,
        price: docs.data().price,
        phoneNumber: docs.data().phoneNumber,
        name: docs.data().name,
        urls:docs.data().urls,
      });
    });
    return data
  });
  return getData
}
  
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IonLoading,
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonItem,
  IonButton,
  IonLabel,
  IonCard,
  IonIcon,
  IonCardContent,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { categories } from "../../constants/services";
import { Product } from "../../interfaces";
import "firebase/firestore";
import "firebase/storage";
import { IsLogedIn } from "./../../utility/utility";
import { useSelector} from "react-redux";
import firebaseConfig from "./../../config/firebaseConfig";
import app from "firebase/app";
// import { getPosterName } from "../Post/CreatePostSlice";
// import firebase from "firebase";
if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}

const SubCategory:React.FC = (props: any) => {
  // const storage = firebase.storage();
  // const dispatch = useDispatch();
  const [products, setproducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState(true);
  // const [Uid, setUid] = useState<string>();
  var product: Array<Product>;
  const { categoryId, subCategoryName }: any = useParams();
  let db: app.firestore.Firestore = app.firestore();
  IsLogedIn();
  var subCategoryValues: any = useSelector((counterV) => counterV);
  var subcategoryData = [subCategoryValues][0]["subcategory"].value;
  product = subcategoryData;
  // useEffect(() => {
  //   // var aaaa:any=db.collection('users').get().then((docs)=>{docs.forEach((doc)=>{
  //   // db.collection('users').doc(doc.data().uid).set({email:doc.data().email,fullName:doc.data().fullName,number:doc.data().number,uid:doc.data().uid,extra:'extra'})
  //   // db.collection('posts').get().then((dcs)=>{dcs.forEach((dd)=>{db.collection('posts').doc(dd.id).set({area:dd.data().area,categoryId:dd.data().categoryId,city:dd.data().city,description:dd.data().description,forHire:dd.data().forHire,id:dd.data().id,name:dd.data().name,phoneNumber:dd.data().phoneNumber,posterId:dd.data().posterId,price:dd.data().price,subcategoryId:dd.data().subcategoryId,title:dd.data().title,urls:dd.data().urls,extraname:doc.data().fullName})})})
  //   // })})
  //   const getProductImageUrls = async (proId: string) => {
  //     const urls: Array<string> = [];
  //     for (let i = 0; i < 3; i++) {
  //       try {
  //         const url = await storage
  //           .ref("images/" + proId + "/" + i)
  //           .getDownloadURL();
  //         urls.push(url);
  //       } catch (error) {
  //         // console.log(error)
  //       }
  //     }
  //     // console.log('==========>',urls)
  //     return urls;
  //   };
  //   var xxx = db
  //     .collection("duplicate post data")
  //     .get()
  //     .then((docs) => {
  //       docs.forEach((doc) => {
  //         var c = getProductImageUrls(doc.data().id);
  //         c.then((doc2) => {
  //           // db.collection('products').get().then((dics)=>{dics.forEach(()=>{})})
  //           // db.collection('posts').doc(doc.id).set({area:doc.data().area,categoryId:doc.data().categoryId,city:doc.data().city,description:doc.data().description,forHire:doc.data().forHire,id:doc.data().id,name:doc.data().name,phoneNumber:doc.data().phoneNumber,posterId:doc.data().posterId,price:doc.data().price,subcategoryId:doc.data().subcategoryId,title:doc.data().title,urls:doc.data().urls,extraname:doc.data().extraname,urls2:doc2})
  //           db.collection("duplicate post data").doc(doc.id).set({
  //             area: doc.data().area,
  //             categoryId: doc.data().categoryId,
  //             city: doc.data().city,
  //             description: doc.data().description,
  //             forHire: doc.data().forHire,
  //             id: doc.data().id,
  //             name: doc.data().name,
  //             phoneNumber: doc.data().phoneNumber,
  //             posterId: doc.data().posterId,
  //             price: doc.data().price,
  //             subcategoryId: doc.data().subcategoryId,
  //             title: doc.data().title,
  //             urls: doc.data().urls,
  //             extraname: doc.data().extraname,
  //             urls2: doc2,
  //           });
  //         });

  //         // console.log(c)
  //         // for (let i = 0; i < 3; i++) {
  //         // const urll= storage.ref("images/"+ doc.data().id +"/" + i).getDownloadURL()
  //         // console.log(i,'=====>',urll)
  //         // const urls: Array<string> = [];
  //         //     for (let i = 0; i < 3; i++) {
  //         //       try {
  //         //         const url:any = storage
  //         //           .ref('images/' + doc.data().id + '/' +0)
  //         //           .getDownloadURL();
  //         //         urls.push(url);
  //         //         console.log(urls)
  //         //       } catch (error) {
  //         //         console.log(error);
  //         //       }
  //         //     }
  //         // }
  //       });
  //     });
  // }, []);

  useEffect(() => {
    if (product.length === 0) {
      db.collection("duplicate products data")
        .where("categoryId", "==", categoryId)
        .where("subcategoryId", "==", subCategoryName)
        .get()
        .then((querySnapshot) => {
          const serverChatsLength = querySnapshot.docs.length;
          if (serverChatsLength === 0) {
            setproducts(product);
            setLoading(false);
          } else {
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
                urls: docs.data().urls,
              });
              if (data.length === serverChatsLength) {
                setproducts(data);
                setLoading(false);
              }
            });
          }
        });
    } else {
      setLoading(false);
      setproducts(product);
    }
  }, [categoryId, subCategoryName, product, db]);
  return (
    <IonPage id="main-content">
      <IonLoading isOpen={loading} message={"Please wait..."} />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={"/category/" + categoryId} />
          </IonButtons>
          <IonButton routerLink="/post" size="small" slot="end">
            Post
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {products.length === 0 ? (
          <IonHeader>No ads found</IonHeader>
        ) : (
          products?.map((product) => (
            <IonCard key={product.id}>
              <IonItem>
                <IonIcon
                  icon={
                    categories.find(
                      (category) => category.id === product.categoryId
                    )?.iconName
                  }
                  slot="start"
                />
                <IonLabel>{product.title}</IonLabel>
                <IonButton
                  routerLink={"/product-details/" + product.id}
                  fill="outline"
                  slot="end"
                  // onClick={()=>setproductetail([product])}
                >
                  View
                </IonButton>
              </IonItem>
              <IonCardContent>{product.description}</IonCardContent>
            </IonCard>
          ))
        )}
      </IonContent>
    </IonPage>
  );
};
export default SubCategory;

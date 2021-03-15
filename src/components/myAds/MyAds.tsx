import React, { useEffect, useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonText,
  IonIcon,
  IonChip,
  IonLabel,
  IonCol,
  IonLoading,
  IonSlides,
  IonSlide,
} from '@ionic/react';
import './myAds.css'
import { cash, pin, location } from 'ionicons/icons';
import firebaseConfig from './../../config/firebaseConfig';
import app from 'firebase/app';
import 'firebase/storage';
import firebase from 'firebase';
import { Product } from '../../interfaces';
if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}
const MyAds:React.FC = () => {
  const [ads, setAds] = useState<Array<Product>>();
  const [showLoading] = useState(true);
  let myAds: Array<any> = [];
  let db = app.firestore();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        await db
          .collection('duplicate products data')
          .where('posterId', '==', user.uid)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              myAds.push(doc.data());
            });

            setAds(myAds);
          })
          .catch(function (error) {
          });
      } else {
        // No user is signed in.
      }
    });
  }, [db,myAds]);

  if (!ads) {
    return (
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        //    onDidDismiss={() => setShowLoading(false)}
        message={'Please wait...'}
        //    duration={5000}
      />
    );
  }
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    // height: 400,
  };
  const setImages=(item:Product,index:number)=>{
    if(!item.urls){
      return(<h6>no images</h6>)
    }else if(item.urls.length<1){
      return(<h6>no images</h6>)
    }else{
      return(<IonSlides
      options={slideOpts}
      scrollbar={true}
      pager={true}
      >
        {item.urls.map((photo,index)=>(
          <IonSlide key={index}>
            <img src={photo} alt={'Image no: ' + (index + 1)}/>
          </IonSlide>
        ))}

      </IonSlides>)
    }
  }
  return (
    <IonPage id="main-content" >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Your Ads</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent  >
        {ads?.map((item: Product,index:number) => {
          return (
            <IonCard key={item.id} class="ion-border-class">
              {/* <IonCard href={'/product-details/' + ad.id} key={ad.id}> */}
              <IonCardHeader  color={"primary"}>
                <h4 className={"title"}> {item.title} </h4>
              </IonCardHeader>
              {setImages(item,index)}
              <IonText color="primary">
                <IonChip color="blue">
                  <IonIcon icon={location} />
                  <IonLabel>
                    {item.city},{item.area}
                  </IonLabel>
                </IonChip>
              </IonText>

              <IonText color="dark">
                <IonChip>
                  <IonIcon icon={pin} />
                  <IonLabel>
                    {item.categoryId},{item.subcategoryId}
                  </IonLabel>
                </IonChip>
              </IonText>

              <IonText color="success">
                <IonCol size="2">
                  <IonChip color="green">
                    <IonIcon icon={cash} />
                    <IonLabel> {item.price} </IonLabel>
                  </IonChip>
                </IonCol>
              </IonText>
              {/* <Slider itemID={item.id} /> */}
              {/* {setImages(item,index)} */}
            </IonCard>
          );
        })}
      </IonContent>
    </IonPage>
  );
};
export default MyAds;

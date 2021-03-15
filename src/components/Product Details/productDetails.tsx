import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Product } from "../../interfaces";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonText,
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonIcon,
  IonLabel,
  IonCol,
  IonFooter,
  IonRow,
  IonSlides,
  IonSlide,
  IonLoading,
} from "@ionic/react";
import { cash, pin, phonePortraitSharp } from "ionicons/icons";
import { IsLogedIn } from "./../../utility/utility";
// import auth from '../Authentication/authSlice'
import app, { firestore } from "firebase/app";
import firebase from "firebase";
// import { IsLogedIn } from './../../utility/utility';

const ProductDetails: React.FC = (props: any) => {
  // const [username, setusername] = useState<Array<User>>();
  // const [userID, setUserID] = useState<any>();
  const history = useHistory();
  const [chatId, setchatId] = useState<string>();
  // var user=  firebase.auth().currentUser;
  let db: app.firestore.Firestore = app.firestore();
  const [loading, setLoading] = useState(true);
  const [productss, setproductss] = useState<Product>({
    id: "",
    posterId: "",
    categoryId: "",
    // categoryName:"",
    subcategoryId: "",
    title: "",
    forHire: false,
    city: "",
    area: "",
    description: "",
    price: 0,
    phoneNumber: "",
    name: "",
    urls: [""],
  });
  IsLogedIn();
  var productId: any = useParams();
  var selector: any = useSelector((counterV) => counterV);
  var product: Array<Product>;
  product = [selector][0]["subcategory"].value;
  useEffect(() => {
    if (product.length === 0) {
      db.collection("duplicate products data")
        .doc(productId["id"])
        .get()
        .then((doc) => {
          const serverChatsLength = doc.data.length;
          if (serverChatsLength === 0) {
            setLoading(false);
          } else {
            var products: Array<Product> = [];
            products.push(doc.data() as Product);
            if (products.length === serverChatsLength)
              setproductss(products[0]);
            setLoading(false);
          }
        });
    } else {
      for (var i = 0; i < product.length; i++) {
        if (product[i].id === productId.id as string) {
          setproductss(product[i]);
          setLoading(false);
          break;
        }
      }
    }
  }, [productId,product,db]);
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    // height: 400,
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        db.collection("users")
          .doc(user?.uid)
          .get()
          .then((docs) => {
            var userdata: any = docs.data();
            // setusername(userdata.name);
            // setUserID(userdata.uid);
            if (userdata.uid > productss.posterId) {
              setchatId(productss.posterId + userdata.uid);
            } else {
              setchatId(userdata.uid + productss.posterId);
            }
          });
      }
    });
  });
  var check: boolean;
  async function onClick(e: React.FormEvent<HTMLIonButtonElement>) {
    db.collection("chats")
      .get()
      .then((doc) => {
        doc.forEach((docs) => {
          if (chatId === docs.id as string) {
            //  var posterName='huzaifa'
            history.push("/chat/" + chatId);
            check = false;
          }
          if (check !== false) {
            history.push("/CreateChat/" + productss.posterId);
          }
        });
      });
  }
  const setImages = () => {
    if (!productss.urls) {
      return <h6>no photos</h6>;
    } else if (productss.urls.length < 1) {
      return <h6>no photos</h6>;
    }
    if (productss.urls.length > 0) {
      return (
        <IonSlides
          options={slideOpts}
          scrollbar={true}
          pager={true}
          //  style={{ display: 'inline-flex' }}
        >
          {productss?.urls.map((photo, index) => (
            <IonSlide key={index}>
              <img src={photo} alt="" />
            </IonSlide>
          ))}
        </IonSlides>
      );
    }
  };
  return (
    // <div><h1>dsds</h1></div>
    <>
      <IonPage>
        <IonLoading isOpen={loading} message={"Please wait..."} />
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>{productss.title}</IonTitle>
            <a slot="end" href={"tel:" + productss.phoneNumber}>
              <IonIcon slot="end" icon={phonePortraitSharp} />
              <h6>call</h6>
              {/* <IonText>
                <h6>call</h6>
              </IonText> */}
            </a>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {setImages()}
          <IonToolbar>
            <IonToolbar>
              <IonCard>
                <IonRow class="ion-text-center">
                  <IonText color="primary">
                    <IonChip color="blue">
                      <IonIcon icon={pin} />
                      <IonLabel>
                        {productss.area}, {productss.city}
                      </IonLabel>
                    </IonChip>
                  </IonText>

                  <IonText color="success">
                    <IonCol size="2">
                      <IonChip color="green">
                        <IonIcon icon={cash} color="success" />
                        <IonLabel> {productss.price} </IonLabel>
                      </IonChip>
                    </IonCol>
                  </IonText>
                </IonRow>

                <IonText>
                  <IonCardContent>
                    <h2>{productss.description}</h2>
                  </IonCardContent>
                </IonText>
                {/* <Slider itemID={productss.id} /> */}
                {/* {setImages()} */}
              </IonCard>
            </IonToolbar>
          </IonToolbar>
        </IonContent>
        <IonFooter>
          <IonButton
            expand="full"
            disabled={firebase.auth().currentUser?.uid! === productss.posterId}
            // routerLink={'/CreateChat/'+productss.posterId}
            onClick={onClick}
          >
            Send Message
          </IonButton>
        </IonFooter>
      </IonPage>
    </>
  );
};
export default ProductDetails;

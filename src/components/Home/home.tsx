import React, { useEffect, useState } from "react";
import app from "firebase/app";
import "./home.css";
import { useDispatch } from "react-redux";
import { categories } from "../../constants/services";
import firebase from "firebase";
import {
  handleAuth,
  userAuth,
} from "../Authentication/authSlice";
import firebaseConfig from "../../config/firebaseConfig";
import {
  IonMenu,
  IonHeader,
  IonCardContent,
  IonMenuToggle,
  IonToolbar,
  IonPage,
  IonMenuButton,
  IonCard,
  IonText,
  IonIcon,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
} from "@ionic/react";
import { Plugins, Capacitor } from "@capacitor/core";
import { useHistory } from "react-router-dom";
if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}
const HomeC: React.FC = () => {
  useEffect(() => {
    // SplashScreen.hide()
    if (Capacitor.isNative) {
      Plugins.App.addListener("backButton", (e) => {
        if (window.location.pathname === "/") {
          // Show A Confirm Box For User to exit app or not
          let ans = window.confirm("Are you sure");
          if (ans) {
            Plugins.App.exitApp();
          }
        } else if (window.location.pathname === "/home") {
          // Show A Confirm Box For User to exit app or not
          let ans = window.confirm("Are you sure");
          if (ans) {
            Plugins.App.exitApp();
          }
        }
      });
    }
  }, []);

  const dispatch = useDispatch();
  // const value = useSelector(authValue);
  const history = useHistory();
  // const [showLoading, setShowLoading] = useState(true);

  // verifying user
  const [uid, setUid] = useState<string>();
  // const [logedIn] = useState(value.state.authSlice.isUserLogedIn);
  useEffect(() => {
    dispatch(userAuth());

    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        await setUid(user.uid);
      }
    });
  }, [uid,dispatch]);


  return (
    <>
      <IonMenu side="start" type="push" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle className="cursor">
            </IonTitle>
            <IonTitle className="floatLeft">Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem routerLink={`/inbox/${uid}`}>Inbox</IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/myads">My Ads</IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem
                routerLink="/"
                onClick={() => {
                  app.auth().signOut();
                  dispatch(handleAuth(0));
                  history.push("/");
                }}
              >
                SignOut
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start" color="primary" />
            <IonTitle>WorkKarr</IonTitle>
            <IonButton routerLink="post" size="small" slot="end">
              Post
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {categories.map((category) => (
            <IonCard
              style={{ margin: "16px 48px" }}
              className="ion-margin-horizontal"
              key={category.id}
              routerLink={"category/" + category.id}
            >
              <IonCardContent className="ion-text-center" color="success">
                {/* <IonIcon
                 className='ion-margin-horizontal'
                 icon={category.categorieName.iconName}
               /> */}
                {/* <IonIcon className>{categorie.iconName}</IonIcon> */}
                <IonIcon icon={category.iconName} />
                <IonText className="wordCapitalize">{category.title}</IonText>
              </IonCardContent>
            </IonCard>
          ))}
        </IonContent>
      </IonPage>
    </>
  );
};

export default HomeC;

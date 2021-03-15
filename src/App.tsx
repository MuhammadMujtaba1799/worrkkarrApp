import React from "react";
import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import firebaseConfig from "./config/firebaseConfig";
import app from "firebase/app";

import { SingInView, home, Register } from "./pages/index";
import { Category, ProductDetails, SubCategory } from "./components";
import { IonReactRouter } from "@ionic/react-router";


/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import './theme/variables.css';
import Post from './pages/Post';
import CreateChat from './pages/CreateChat';
import { MyAds, MyInbox } from './pages';
import ContactChat from './pages/contactchat';

if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}
const App: React.FC = () => {
  // const [signedIn, setSignedIn] = useState<boolean>(false);
  // firebase.auth().onAuthStateChanged(async function (user) {
  //   if (user) {
  //     setSignedIn(true);
  //   }
  // });
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/chat/:chatId" component={ContactChat} exact={true} />

          <Route path="/home" component={home} exact={true} />
          <Route path="/register" component={Register} exact={true} />
          <Route path="/post" component={Post} exact={true} />

          <Route
            path="/category/:categoryId"
            component={Category} /// this is main category page
            exact={true}
          />
          <Route
            path="/category/:categoryId/:subCategoryName"
            component={SubCategory} /// this is main subCategory page
            exact={true}
          />
          <Route
            path="/inbox/:uid"
            component={MyInbox} /// this is Inbox page
            exact={true}
          />
          <Route path="/myads" component={MyAds} exact={true} />
          <Route
            path="/category/:categoryId/:subCategoryName"
            component={SubCategory} /// this is main category page
            exact={false}
          />
          <Route
            path="/product-details/:id"
            component={ProductDetails}
            exact={true}
          />
          <Route
            path="/CreateChat/:posterid"
            component={CreateChat}
            exact={true}
          />

          <Route
            path="/"
            component={SingInView}
            exact={true}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

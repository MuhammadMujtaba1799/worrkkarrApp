import { useEffect } from "react";
import firebaseConfig from "../config/firebaseConfig";
import app from "firebase/app";
import { useHistory } from "react-router";
import firebase from "firebase";
if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}
export const IsLogedIn: any = () => {
  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        history.push("/");
      }
    });
  }, [history]);
};
// if user logged in and trying to visit sign in page
export const IsNotLogedIn = () => {
  const history = useHistory();
  useEffect(() => {
    async function FetchData() {
      await firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var db = app.firestore();
          db.collection("users")
            .where("phoneNumber", "==", user.phoneNumber)
            .where("uid", "==", user.uid)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                if (doc.data()) {
                  history.replace("/home");
                } else {
                  history.push("/register");
                }
              });
            })
            .catch(function (error) {});
        } else {
          history.replace("/");
        }
      });
    }
    FetchData();
  }, [history]);
};
export default IsNotLogedIn;

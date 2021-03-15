import React, { useState, useEffect } from "react";
import {
  IonIcon,
  IonButton,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonFooter,
  IonBackButton,
  IonButtons,
  IonTextarea,
} from "@ionic/react";
import { send } from "ionicons/icons";
import app, { firestore } from "firebase/app";
import { createChat, NewMessage } from "../components/chat/ChatSlice";
import { useParams, useHistory } from "react-router-dom";
import { User} from "../interfaces";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { IsLogedIn } from "./../utility/utility";

const CreateChat: React.FC = (props: any) => {
  // verifying user
  IsLogedIn();
  let auth: app.auth.Auth = app.auth();
  const [text, setText] = useState<string>("");
  const [posterName, setPosterName] = useState<User>();
  const history = useHistory();
  const [chatId, setchatId] = useState<string>();
  const [username, setusername] = useState<string>();
  const [userID, setUserID] = useState<any>();
  const { posterid }: any = useParams();
  const dispatch = useDispatch();
  let db: app.firestore.Firestore = app.firestore();

  var selectttoorrr: any = useSelector((state) => state);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        db.collection("users")
          .doc(user?.uid)
          .get()
          .then((docs) => {
            var userdata: any = docs.data();
            setusername(userdata.fullName);
            setUserID(userdata.uid);
          });
      }
    });
    if (userID > posterid) {
      setchatId(posterid + userID);
    } else {
      setchatId(userID + posterid);
    }
    for (let i = 0; i < selectttoorrr["subcategory"].value.length; i++) {
      if (posterid as string === selectttoorrr["subcategory"].value[i].posterId as string) {
        setPosterName(selectttoorrr["subcategory"].value[i].name);
        break;
      }
    }
  },[userID, posterid, db, selectttoorrr]);
  async function onClick(e: React.FormEvent<HTMLIonButtonElement>) {
    const sender = auth.currentUser!;
    const now = new Date();
    const newMessage = {
      messageContent: text,
      senderId: sender.uid!,
      timestamp: firestore.Timestamp.fromDate(now),
    };
    let createChatParameters: any = {
      participantIds: [sender.uid, posterid],
      participants: [
        {
          name: posterName,
          uid: posterid,
        },
        {
          name: username,
          uid: userID,
        },
      ],
    };
    dispatch(createChat(createChatParameters));
    dispatch(NewMessage([chatId, newMessage]));
    history.replace("/chat/" + chatId);
  }
  return (
    <IonPage>
      <IonHeader slot="fixed">
        <IonToolbar>
          <IonTitle>{posterName}</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/inbox" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonFooter slot="fixed">
        <IonToolbar>
          <IonItem>
            <IonTextarea
              rows={10}
              value={text}
              onIonChange={(e) => setText(e.detail.value ?? "")}
            ></IonTextarea>
            <IonButton disabled={!text} onClick={onClick}>
              <IonIcon icon={send}> </IonIcon>
            </IonButton>
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default CreateChat;
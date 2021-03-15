import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
  IonButton,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonList,
  IonFooter,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { send} from "ionicons/icons";
import { useParams } from "react-router";
import { useDispatch} from "react-redux";
import app, {firestore } from "firebase/app";
import firebase from "firebase";
import { NewMessage } from "../../components/chat/ChatSlice";
import {Message } from "../../interfaces";
import { IsLogedIn } from "./../../utility/utility";

export const Chatpage: React.FC = (props: any) => {
  //verifying user
  IsLogedIn();
  const [messagess, setMessages] = useState<Array<Message>>([]);
  const [text, setText] = useState<string>("");
  const {chatId }: any = useParams();
  const [recievername, setrecievername] = useState();
  const dispatch = useDispatch();
  let auth: app.auth.Auth = app.auth();
  let db: app.firestore.Firestore = app.firestore();
  const uid = firebase.auth().currentUser?.uid;
  // getsendername
  useEffect(() => {
    async function fetchData() {
      await db
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(function (doc) {
          var messages: Array<Message> = [];
          doc.forEach((docs) => {
            messages.push({
              messageContent: docs.data().messageContent,
              senderId: docs.data().senderId,
              timestamp: docs.data().timestamp,
            });
          });
          setMessages(messages);
        });
      //getting receiever name
      await db
        .collection("chats")
        .doc(chatId)
        .get()
        .then((docs) => {
          var chats: any = docs.data();
          setrecievername(chats.participants[0].name);
        });
    }
    fetchData();
  }, [chatId,db]);

  async function onClick(e: React.FormEvent<HTMLIonButtonElement>) {
    var sender: any = auth.currentUser?.uid;
    const now = new Date();
    const newMessage = {
      messageContent: text,
      senderId: sender,
      timestamp: firestore.Timestamp.fromDate(now),
    };
    dispatch(NewMessage([chatId, newMessage]));
    setText("");
  }

  return (
    <IonPage>
      <IonHeader slot="fixed">
        <IonToolbar>
          <IonTitle>{recievername}</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref={"/inbox/" + uid} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {messagess.map((message, index) => (
            <IonCard
              key={index}
              color={message.senderId === uid ? "secondary" : "primary"}
            >
              <IonCardContent>{message.messageContent}</IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
      <IonFooter slot="fixed">
        <IonToolbar>
          <IonItem>
            <IonInput
              value={text}
              onIonChange={(e) => setText(e.detail.value ?? "")}
            ></IonInput>
            <IonButton disabled={!text} onClick={onClick}>
              <IonIcon icon={send}> </IonIcon>
            </IonButton>
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
export default Chatpage;

import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonItem,
  IonBackButton,
  IonButtons,
  IonTitle,
  IonIcon,
  IonText,
  IonLoading,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { person, chatbubbleOutline } from "ionicons/icons";
import firebaseConfig from "./../../config/firebaseConfig";
import { Chat, Message } from "./../../interfaces";
import firebase from "firebase";
import app from "firebase/app";
import { IsLogedIn } from "./../../utility/utility";
if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}

interface LocalChat extends Chat {
  id: string;
  latestMessage: Message;
}
const MessageList: React.FC = (props: any) => {
  //verifying user
  IsLogedIn();
  const { uid }: any = useParams();
  const [userID, setUserID] = useState<any>();
  const [chats, setChats] = useState<Array<LocalChat>>([]);
  const [loading, setLoading] = useState(true);
  let db = app.firestore();
  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      await setUserID(user.uid);
    }
  });
  useEffect(() => {
    const getChats = async (userid: any) =>
      await db
        .collection("chats")
        .where("participantIds", "array-contains", uid)
        .get();

    const getLatestMessage = async (chatId: string) =>
      await db
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .limit(1)
        .get();
    // Get user all chats
    getChats(userID).then((result) => {
      const serverChatsLength = result.docs.length;
      if (serverChatsLength === 0) {
        setLoading(false);
      } else {
        const localChats: Array<any> = [];
        // Loop through each chat
        result.docs.forEach(async (chatDoc) => {
          // Get latest message for chat
          const messageDoc = await getLatestMessage(chatDoc.id);
          // Update inbox
          localChats.push({
            id: chatDoc.id,
            latestMessage: messageDoc.docs[0].data() as Message,
            ...(chatDoc.data() as Chat),
          });
          if (localChats.length === serverChatsLength) {
            setChats(localChats);
            setLoading(false);
          }
        });
      }
    });
  }, [userID, db, uid]);

  return (
    <IonPage>
      <IonLoading isOpen={loading} message={"Please wait..."} />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>
            Inbox <IonIcon icon={chatbubbleOutline} />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {chats
          .sort(
            (a, b) =>
              b.latestMessage.timestamp.seconds -
              a.latestMessage.timestamp.seconds
          )
          .map((chat) => (
            <IonCard key={chat.id} href={`chat/${chat.id}`}>
              <IonCardHeader>
                <IonIcon className="ion-margin-horizontal" icon={person} />
                {/* {chat.receiverName} */}
                {userID! === chat.participants[0].uid
                  ? chat.participants[1].name
                  : chat.participants[0].name}
              </IonCardHeader>
              <IonItem>
                <IonText slot="start">
                  {chat.latestMessage.messageContent}
                </IonText>
                <IonText slot="end">
                  {/* {chat.latestMessage.timestamp.toDate().getDate()} */}
                  {/* {chat.latestMessage.timestamp.toDate().getDate() +
                    "/" +
                    chat.latestMessage.timestamp.toDate().getMonth() +
                    "/" +
                    chat.latestMessage.timestamp.toDate().getFullYear()} */}
                </IonText>
              </IonItem>
            </IonCard>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default MessageList;

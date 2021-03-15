import React, { FC, useState, useEffect } from 'react';
import {
  IonContent,
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonPage,
  IonLoading,
  IonList,
} from '@ionic/react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import firebase from 'firebase';
import { useHistory } from 'react-router';
// import { addUser } from './../../config/firebase'
import { useDispatch } from 'react-redux';
import './Registration.css';
import { addUser } from './registrationSlice';
import firebaseConfig from './../../config/firebaseConfig';
import IsNotLogedIn from '../../utility/utility';

if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}

const Registration: FC = (props: any) => {
  IsNotLogedIn()
  const dispatch = useDispatch();
  const [phoneNumber, setNumber] = useState<any>();
  const [uid, setuid] = useState<string>();
  const [isFormFilled, setIsFormFilled] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

  let history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        var db = app.firestore();
        db.collection('users')
          .where('phoneNumber', '==', user.phoneNumber)
          .where('uid','==',user.uid)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              if(doc.data()){
              history.push('/home');}
            });
          })
          .catch(function (error) {
          });
        setNumber(user.phoneNumber);
        setuid(user.uid);
      } else {
      }
    });
  },[history]);

  const INITIAL_STATE = {
    fullName: '',
    email: '',
  };
  const [formFields, setFormFields] = useState({ ...INITIAL_STATE });

  const handleChange = (e: any) => {
    if (e.currentTarget.value) {
      setIsFormFilled(false);
    } else {
      setIsFormFilled(true);
    }
    setFormFields(prevField => ({
      ...prevField,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  const onClick = (e: React.FormEvent<HTMLIonButtonElement>) => {
    dispatch(addUser({ ...formFields, uid, phoneNumber }));

    history.push('/home');
  };

  const handleCancel = () => {
    history.push('/');
  };
  if (showLoading) {
    return (
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Please wait...'}
        duration={2000}
      />
    );
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Registration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonList>
            <IonItem>
              <IonLabel position='floating'>Full Name</IonLabel>
              <IonInput
                required={true}
                name="fullName"
                onIonChange={handleChange}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position='floating'>Email</IonLabel>
              <IonInput
                required={true}
                name="email"
                onIonChange={handleChange}
              ></IonInput>
            </IonItem>
          </IonList>
          <IonRow className="ion-justify-content-center">
          <IonCol className="ion-text-center">
          <IonButton
              color="danger"
              className="ion-margin"
              onClick={handleCancel}
            >
              Cancel
            </IonButton>
            <IonButton 
              className="ion-margin"
              disabled={isFormFilled} 
              onClick={onClick}>
              Register
            </IonButton>
          </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Registration;

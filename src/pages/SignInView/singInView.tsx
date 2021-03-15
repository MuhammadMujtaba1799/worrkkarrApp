import React, {useState } from 'react';
import firebaseConfig from './../../../src/config/firebaseConfig';
import { useHistory } from 'react-router-dom';
import {
  userAuth,
} from './../../components/Authentication/authSlice';
import { useDispatch} from 'react-redux';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonButton,
  IonLabel,
  IonGrid,
  IonCol,
  IonRow,
  IonPage,
} from '@ionic/react';
import app from 'firebase/app';
import * as firebase from 'firebase/app';
import { IsNotLogedIn } from './../../utility/utility';
import {Capacitor } from '@capacitor/core';
import { SplashScreen1 } from '../SplashScreen/splashScreen';
if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

window.recaptchaVerifier = window.recaptchaVerifier || {};

const SingInView:React.FC = () => {
  //if user logged in and trying to visit sign in page
  IsNotLogedIn();
  
  let [phone, setPhone] = useState<any>();
  let [Pin, setpin] = useState<any>();
  let [verifyPhone, setVerifyPhone] = useState<any>(false);
  let [confirmResult, setConfirmResult] = useState<any>();
  let [isSendPin, setIsSendPin] = useState<any>(true);
  let [phoneNumber, setPhoneNumber] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const codeVerification = () => {
    var code = Pin;

    confirmResult
      .confirm(code)
      .then(function (result: any) {
        // User signed in successfully.

        // dispatch(handleAuth(1))
        dispatch(userAuth());
        history.push('/register');
        // ...
      })
      .catch(function (error: any) {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  const onSignInSubmit = () => {
    setUpRecaptcha();
    var appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phone, appVerifier)

      .then(function (confirmationResult) {
        // setIsSendPin(false);
        setPhoneNumber(true);
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setConfirmResult(confirmationResult);
      })
      .catch(function (error: any) {
        // Error; SMS not sent
        // ...
      });
  };

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: function (response: any) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      }
    );
  };
  const countNumber = (phoneNumber: any) => {
    if (phoneNumber.length === 13) {
      setPhoneNumber(false);
    } else {
      setPhoneNumber(true);
    }
  };

  const countPin = (pinCode: any) => {
    if (pinCode.length === 6) {
      setIsSendPin(false);
    } else {
      setIsSendPin(true);
    }
  };

if(!Capacitor.isNative || Capacitor.isNative){
  if(showLoading){
      setTimeout(() => {
        setShowLoading(false)
      }, 4000);
      return(<SplashScreen1/>);
    }
}
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login in WorkKarr</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ position: 'relative' }}>
        <div id="sign-in-button"></div>
        <IonGrid
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: 0,
            right: 0,
          }}
        >
          <IonItem>
            <IonLabel position="floating">Enter Number</IonLabel>
            <IonInput
              placeholder="3360900786"
              onIonChange={e => {
                const target = e.target as HTMLInputElement;
                const phoneNumber = '+92' + target.value;
                countNumber(phoneNumber);
                setPhone(phoneNumber);
              }}
            >
              +92
            </IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Enter Pin</IonLabel>
            <IonInput
              // value={Pin}
              onIonChange={e => {
                const target = e.target as HTMLInputElement;
                countPin(target.value);
                setpin(target.value);
              }}
            ></IonInput>
          </IonItem>

          <IonRow>
            <IonCol size="12">
              <IonButton
                disabled={phoneNumber}
                onClick={e => {
                  e.preventDefault();
                  setVerifyPhone(true);
                  // sendCode();
                  onSignInSubmit();
                }}
                expand="full"
              >
                {verifyPhone ? 'Code is being sent' : 'Send code'}
              </IonButton>

              <IonButton
                disabled={isSendPin}
                onClick={e => {
                  e.preventDefault();
                  // userConfirmation();
                  codeVerification();
                }}
                expand="full"
                // disabled={!pin || isVerifyingPin}
              >
                Verify
              </IonButton>
            </IonCol>
            <IonCol size="3"> </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SingInView;

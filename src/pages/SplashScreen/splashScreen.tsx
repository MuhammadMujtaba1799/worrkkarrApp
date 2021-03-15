import React from 'react';
import{IonPage,IonImg,IonText} from '@ionic/react'
import './splashScreen.css'


export const SplashScreen1:React.FC=()=>{
    return(
        <IonPage className='ionpage'>
            <IonImg className='ionimg' src="images/icon/icon-192x192.png"/>
            <IonText className='iontext'><h1 >Workkarr</h1></IonText>
        </IonPage>
    );
}

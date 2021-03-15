import React from 'react';
import Chat from '../components/chat/chat';
import {IsLogedIn} from './../utility/utility'

const ContactChat = () =>{ 
    // verifying user
   IsLogedIn()
    return (
        <Chat />

    
    
);
}

export default ContactChat;
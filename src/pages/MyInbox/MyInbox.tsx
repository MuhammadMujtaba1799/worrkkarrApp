import React from 'react'
import MessageList from '../../components/MessageList/MessageList'
import {IsLogedIn} from './../../utility/utility'

 const MyInbox=()=> {
   // verifying user
   IsLogedIn()
   
    return (
      <MessageList/>
    )
}
export default MyInbox

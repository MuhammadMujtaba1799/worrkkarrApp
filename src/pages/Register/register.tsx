import React from 'react'
import {Registration} from '../../components/index'
import {IsLogedIn} from './../../utility/utility'


const Register=()=> {
     //verifying user
  IsLogedIn()
  return (
  <Registration/>
  )
}
export default Register
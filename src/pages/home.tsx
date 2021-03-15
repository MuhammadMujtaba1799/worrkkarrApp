import React from 'react'
import {HomeC} from './../components/index'
import {IsLogedIn,IsNotLogedIn} from './../utility/utility'

const home=()=> {
    //verifying userz
    IsNotLogedIn()
    IsLogedIn()
 
 return (
 <HomeC/>
 )
}
export default home
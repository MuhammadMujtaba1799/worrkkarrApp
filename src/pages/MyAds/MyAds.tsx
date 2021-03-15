import React from 'react'
import MyAds from './../../components/myAds/MyAds'
import {IsLogedIn} from './../../utility/utility'

const MyAdsPage=()=> {
    // verifying user
    IsLogedIn()
    return (
        <MyAds/>
    )
}
export default MyAdsPage

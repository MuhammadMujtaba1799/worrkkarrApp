import React from 'react';
import CreateNewPost from '../components/Post/CreatePost'
import {IsLogedIn} from './../utility/utility'

const Post = () =>{
 // verifying user
 IsLogedIn()
return  (
   
    <CreateNewPost />
   
);
  
}
  export default Post;
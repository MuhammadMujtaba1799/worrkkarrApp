import { combineReducers } from '@reduxjs/toolkit';
import registration from './../components/registration/registrationSlice';
import authSlice from './../components/Authentication/authSlice';
import subcategory from './../components/subCategory/subCategorySlice';
import posterName from './../components/Post/CreatePostSlice';
import myAdsReducer from './../components/myAds/MyAdsSlice';
import myInboxReducer from './../components/MessageList/MessageListSlice';
import CreateChatSlice from './../components/chat/ChatSlice';
import NewmessageSlice from './../components/chat/ChatSlice';
const rootReducer = combineReducers({
  registration,
  authSlice,
  subcategory,
  posterName,
  myAdsReducer,
  myInboxReducer,
  CreateChatSlice,
  NewmessageSlice,
});

//   export type RootState=ReturnType<typeof rootReducer>
export default rootReducer;

export interface User{
    fullName:string, 
    email :string, 
    uid  : Number,
    phoneNumber: Number,
}

export interface Category {
    id: string;
    title: string;
    iconName: string;
  }
  
  export interface Area {
    name: string;
    cityName: string;
  }
  
  export interface City {
    name: string;
  }
  
  export interface Subcategory {
    categoryId: string;
    categoryName:string
    name: string;
  }
  
  export interface Product {
    id: string;
    posterId: string;
    categoryId: string;
    // categoryName:string
    subcategoryId: string;
    title: string;
    forHire: boolean;
    city: string;
    area: string;
    description: string;
    price: number;
    phoneNumber: string;
    name : string;
    urls:Array<string>;
  }
  
  
  export interface Chat {
    participantIds: Array<string>;
    participants: Array<Participant>;
  }
  
  export interface Participant {
    name: string;
    uid: string;
  }
    
  export interface InboxChat {
    messageContent: string;
    receiverName: string;
    chatId:string
    timestamp: firebase.firestore.Timestamp;
  }
  export interface Message {
    senderId: string;
    messageContent: string;
    timestamp: firebase.firestore.Timestamp;
  }
  


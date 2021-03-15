import React, { useState } from "react";
import {
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonListHeader,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonBackButton,
  IonButtons,
  IonInput,
  IonRadioGroup,
  IonRadio,
  IonSlides,
  IonSlide,
  IonLoading,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  categories,
  subcategories,
  cities,
  areas,
} from "../../constants/services";
import { CameraResultType } from "@capacitor/core";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebase from "firebase";
import { addPost } from "./CreatePostSlice";
import { useDispatch } from "react-redux";
import { IsLogedIn } from "./../../utility/utility";
import firebaseConfig from "./../../config/firebaseConfig";
import app from "firebase/app";
import { useCamera } from "@ionic/react-hooks/camera";
import { CameraSource } from "@capacitor/core";
import "./CreatePost.css";
export interface Photo {
  filepath: number;
  webviewPath?: string;
  blob?: Blob;
}

if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}
export const CreateNewPost = () => {
  //verifying user
  IsLogedIn();
  const storage = firebase.storage();
  const [photos, setPhotos] = useState<any>([]);
  let blob: any;
  const fileName = new Date().getTime() + ".jpeg";
  const { getPhoto } = useCamera();
  const [postername, setpostername] = useState<string>();
  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 100,
    });
    if (!cameraPhoto.webPath) {
      alert("Path error occurred");
      return;
    }
    blob = await fetch(cameraPhoto.webPath).then((r) => r.blob());
    setPhotos([
      {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
        blob,
      },
      ...photos,
    ]);
  };
  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      let db = app.firestore();
      let Data: any = await db
        .doc("users/" + user.uid)
        .get()
        .then((data) => {
          return data.data();
        });
      setpostername(Data.fullName);
    }
  });

  const dispatch = useDispatch();
  const [title, setTitle] = useState<any>("");
  const [postType, setPostType] = useState("Work");
  const [categoryId, setCategoryId] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [city, setCity] = useState<string>("Karachi");
  const [isPosting, setIsPosting] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const [number, setNumber] = useState<any>();
  const [posterid, setposterid] = useState<any>();
  const urls: Array<string> = [];
  var imgcount = 0;
  const history = useHistory();
  const id = Math.random() * 100000000000000000;
  firebase.auth().onAuthStateChanged(function (user) {
    setNumber(user?.phoneNumber);
    setposterid(user?.uid);
  });
  const uploadImage: any = async () => {
    photos.map((item: any, index: any) => {
      storage.ref(`/images/${String(id)}/${index}`).put(item.blob!);
      imgcount = index + 1;
      return imgcount;
    });
  };

  // fetching images start
  const getProductImageUrls = async () => {
    for (let i = 0; i < imgcount; i++) {
      try {
        const url: string = await storage
          .ref("images/" + id + "/" + i)
          .getDownloadURL();
        urls.push(url);
      } catch (error) {
        i = i - 1;
      }
    }
    return urls;
  };

  async function onClick(e: React.FormEvent<HTMLIonButtonElement>) {
    // setLoading(false);
    setIsPosting(true);
    await uploadImage();
    await getProductImageUrls();
    const productId = {
      id: id,
      categoryId,
      // categoryName,
      posterId: posterid,
      subcategoryId: subcategory,
      title,
      area,
      city,
      description,
      forHire: postType === "Work" ? false : true,
      price,
      phoneNumber: number,
      name: postername,
      urls: urls,
    };

    dispatch(addPost(productId, id));
    setIsPosting(false);
    history.push("/product-details/" + id);
  }

  const slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  return (
    <IonPage>
      <IonLoading isOpen={isPosting} message="Posting Ad, Wait" />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Post New Item</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Title</IonLabel>
              <IonInput
                maxlength={27}
                onIonChange={(e) => setTitle(e.detail.value)}
              ></IonInput>
            </IonItem>

            <IonButton
              disabled={photos.length === 3 ? true : false}
              expand={"full"}
              onClick={takePhoto}
            >
              Add Images
            </IonButton>
            <br />
            <IonSlides
              options={slideOpts}
              scrollbar={true}
              pager={true}
              //  style={{ display: 'inline-flex' }}
            >
              {photos.map((photo: any, index: any) => (
                <IonSlide key={index}>
                  <img src={photo.webviewPath} alt="" />
                </IonSlide>
              ))}
            </IonSlides>

            <IonRadioGroup
              value={postType}
              onIonChange={(e) => setPostType(e.detail.value)}
            >
              <IonListHeader>
                <IonLabel>Are you looking for Work or to Hire?</IonLabel>
              </IonListHeader>

              <IonItem>
                <IonLabel>Work</IonLabel>
                <IonRadio slot="start" value="Work" />
              </IonItem>

              <IonItem>
                <IonLabel>Hire</IonLabel>
                <IonRadio slot="start" value="Hire" />
              </IonItem>
            </IonRadioGroup>
          </IonList>

          <IonItem>
            <IonLabel>Category</IonLabel>
            <IonSelect
              value={categoryId}
              placeholder="Select One"
              onIonChange={(e) => {
                setCategoryId(e.detail.value);
              }}
              // onIonChange={(e)=>setCategoryId(e.detail.value)}
            >
              {categories.map((category) => (
                <IonSelectOption key={category.id} value={category.id}>
                  {category.title}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Sub Categories</IonLabel>
            <IonSelect
              value={subcategory}
              disabled={!categoryId}
              placeholder="Select One"
              onIonChange={(e) => {
                setSubcategory(e.detail.value);
                // if(e.detail.value){
                // setSubcategory(e.detail.value);
                // // setcategorynams(e.detail.value[1]);
                // // setcategorynams(e.detail.value.categoryName)
                // }else{
                //   setSubcategory(e.detail.value)
                // }
              }}
            >
              {subcategories
                .filter((subcategory) => subcategory.categoryId === categoryId)
                .map((subcategory) => (
                  <IonSelectOption
                    key={subcategory.categoryId + subcategory.name}
                    value={subcategory.name}
                  >
                    {subcategory.name}
                  </IonSelectOption>
                ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Area</IonLabel>
            <IonSelect
              value={area}
              placeholder="Select One"
              onIonChange={(e) => setArea(e.detail.value)}
            >
              {areas.map((area) => (
                <IonSelectOption key={area.name} value={area.name}>
                  {area.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>City</IonLabel>
            <IonSelect
              value={city}
              placeholder="Select One"
              onIonChange={(e) => setCity(e.detail.value)}
            >
              {cities.map((city) => (
                <IonSelectOption key={city.name} value={city.name}>
                  {city.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Price</IonLabel>
            <IonInput
              type="number"
              min="0" //was b
              value={price}
              onIonChange={(e) => setPrice(Number(e.detail.value))}
              placeholder="Whats the price?"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonTextarea
              maxlength={250}
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
            ></IonTextarea>
          </IonItem>

          <IonRow>
            <IonCol size="4">
              <IonButton href="/homepage" color="danger">
                Cancel
              </IonButton>
            </IonCol>
            <IonCol size="4"></IonCol>
            <IonCol size="4">
              <IonButton
                disabled={
                  !title ||
                  !categoryId ||
                  !subcategory ||
                  !area ||
                  !price ||
                  !description
                }
                onClick={onClick}
              >
                Post It!
              </IonButton>
              {/* <IonButton onClick={handleUpload}>images</IonButton> */}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default CreateNewPost;

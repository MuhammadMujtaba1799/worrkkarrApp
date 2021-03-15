import React from 'react';
import { subcategories, categories } from '../../constants/services';
import { useDispatch } from 'react-redux';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonButton,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
} from '@ionic/react';
import { getSubCategoryProduct } from './subCategorySlice';
import { IsLogedIn } from './../../utility/utility';

const Category: React.FC = (props: any) => {
  //verifying user
  IsLogedIn();
  const dispatch = useDispatch();
  const {
    match,
  }: {
    match: { params: { categoryId: string } };
  } = props;

  const {
    params: { categoryId },
  } = match;
  const categoryTitle = categories.find(category => category.id === categoryId)
    ?.title;

  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle size="small">{categoryTitle}</IonTitle>
            <IonButton
              routerLink="/post"
              size="small"
              slot="end"
            >
              Post
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {subcategories
            .filter(subcategory => subcategory.categoryId === categoryId)
            .map(subcategory => (
              <IonCard
                key={subcategory.categoryId + subcategory.name}
                routerLink={categoryId + '/' + subcategory.name}
              >
                <IonCardHeader
                  onClick={() =>
                    dispatch(getSubCategoryProduct({ categoryId, subcategory }))
                  }
                >
                  {subcategory.name}
                </IonCardHeader>
              </IonCard>
            ))}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Category;

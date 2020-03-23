import firebase from 'react-native-firebase'
import { appConfig } from '../dummy/appConfig';
import moment from "moment";
const Now: number = Number(moment(new Date()).format(`YYYYMMDD`));
const db = firebase.firestore();
export function searchRef() {

    return db.collection("content")
}
export function categoryRef(){
    return db.collection('category')
}
export function contactRef(){
  return db.collection('contact')
}



export function ContentRef() {
    return db.collection("content");
  }

  export function linkRef(){
    return db.collection('setting')
  }
  
  
  export function enviromentUpdateRef() {
    return db.collection("environment");
  }

  export function AdsRef() {
    return db
      .collection("mobile_advertisement")
      .where("expireDateKey", ">=", Now);
  }

  export function RelatedcontentRef() {
    return db
      .collection("content")
  }

export function ContentRefLoad(lastVisible?: any, categoryKey?: string) {
    console.log('ContentRefLoad',ContentRefLoad)
    if (lastVisible) {
      if (categoryKey) {
        return db
          .collection("content")
          .where("category.key", "==", categoryKey)
          .orderBy("page_key", "DESC")
          .startAfter(lastVisible.page_key)
          .limit(appConfig.size);
      } else {
        return db
          .collection("content")
          .orderBy("page_key", "DESC")
          .startAfter(lastVisible.page_key)
          .limit(appConfig.size);
      }
    } else {
      if (categoryKey) {
        return db
          .collection("content")
          .where("category.key", "==", categoryKey)
          .orderBy("page_key", "DESC")
          .limit(appConfig.size);
      } else {
        return db
          .collection("content")
          .orderBy("page_key", "desc")
          .limit(appConfig.size);
      }
    }



  }

  export function updatecontentRef() {
    return db.collection("content");
  }








import * as firebase from 'firebase';
import { REACT_APP_FIREBASE_APIKEY, REACT_APP_FIREBASE_AUTH_DOMAIN, REACT_APP_FIREBASE_DATABASE_URL, REACT_APP_FIREBASE_PROJECT_ID, REACT_APP_FIREBASE_STORAGE_BUCKET } from 'react-native-dotenv'


const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_APIKEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET
};

firebase.initializeApp(firebaseConfig);

export default firebase

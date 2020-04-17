import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAzabBnkUQKbj4dyD5GLy1tPGWYptHYAKM ",
  authDomain: "react-finder.firebaseapp.com",
  databaseURL: "https://react-finder.firebaseio.com",
  projectId: "react-finder",
  storageBucket: "react-finder.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export default firebase

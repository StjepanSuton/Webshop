import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCucVBTeeA0H6jU1N0E7mgGV5jG6XsRnRk",
  authDomain: "webshop-aec1c.firebaseapp.com",
  projectId: "webshop-aec1c",
  storageBucket: "webshop-aec1c.appspot.com",
  messagingSenderId: "438843647438",
  appId: "1:438843647438:web:2ba09e05644b4a4010379f",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;

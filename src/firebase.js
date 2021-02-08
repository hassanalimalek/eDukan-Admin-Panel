import firebase from 'firebase/app'
import "firebase/database"
import "firebase/storage"
import "firebase/auth"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDI10h-qzV2U89Gcj3HylZ3TU1c40xhkHo",
  authDomain: "edukan-856f6.firebaseapp.com",
  databaseURL: "https://edukan-856f6-default-rtdb.firebaseio.com",
  projectId: "edukan-856f6",
  storageBucket: "edukan-856f6.appspot.com",
  messagingSenderId: "196505660455",
  appId: "1:196505660455:web:76b1514a76e10f4f423202",
  measurementId: "G-BZBX9EN17Z"
};

firebase.initializeApp(firebaseConfig);
export let db = firebase.database();
export let storage = firebase.storage();
export let auth = firebase.auth();

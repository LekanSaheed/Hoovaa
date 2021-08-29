import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBpnO89sx2tz55Q3r8KusYLKQEs6h7b2cY",
    authDomain: "hoovaa-1.firebaseapp.com",
    projectId: "hoovaa-1",
    storageBucket: "hoovaa-1.appspot.com",
    messagingSenderId: "297978361550",
    appId: "1:297978361550:web:d8313dd400d3ecea51c29f",
    measurementId: "G-MF9Y16X01N"
  };
firebase.initializeApp(firebaseConfig)
const firebaseStorage = firebase.storage()
const db = firebase.firestore()

  export {firebaseStorage, db, firebase}
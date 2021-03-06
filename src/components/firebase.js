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
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
else{
  firebase.app();
}
const firebaseStorage = firebase.storage()
const db = firebase.firestore()

const stateChange = () => {
  return firebase.auth().onAuthStateChanged(user => {
    if (user){
     localStorage.setItem('user', JSON.stringify(user))


    }
    else{
      localStorage.removeItem('user')
      console.log('not logged in')
    }
  })
    
}

  export {firebaseStorage, db, firebase, stateChange}

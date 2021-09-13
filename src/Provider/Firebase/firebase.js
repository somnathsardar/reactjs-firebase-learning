import { initializeApp } from "firebase/app";

class Firebase{
  firebaseConfig = {
    apiKey: "AIzaSyAsrzaeqhaTeWBPFbPrdm91U99OBiTSY7E",
    authDomain: "react-firebase-9b3ba.firebaseapp.com",
    projectId: "react-firebase-9b3ba",
    storageBucket: "react-firebase-9b3ba.appspot.com",
    messagingSenderId: "285014604815",
    appId: "1:285014604815:web:ea27fab919451d91f3f77a",
    measurementId: "G-3YH6ZM9NNG"
  };

  init(){
    return initializeApp(this.firebaseConfig);
  }
}

export default Firebase;
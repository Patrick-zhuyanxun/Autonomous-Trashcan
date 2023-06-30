// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRL6MqI0o7sPsB4_EDXCToRe3_KQo0ilo",
  authDomain: "react-trashcan.firebaseapp.com",
  projectId: "react-trashcan",
  storageBucket: "react-trashcan.appspot.com",
  messagingSenderId: "1047747609266",
  appId: "1:1047747609266:web:032a7c10fd90d3bcf6ffab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);

export const provide=new GoogleAuthProvider();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyRC29lFvG8w-DCwYPgeK60jtgucM4taM",
  authDomain: "dm23p46-615ec.firebaseapp.com",
  projectId: "dm23p46-615ec",
  storageBucket: "dm23p46-615ec.appspot.com",
  messagingSenderId: "857598470720",
  appId: "1:857598470720:web:87913621081f3ab0b58da5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); 
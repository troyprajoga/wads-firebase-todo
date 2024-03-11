// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcozd8d_R5BNCCR5OkYZj7j7Gfsw_ZEws",
  authDomain: "todo-app-a3d3f.firebaseapp.com",
  projectId: "todo-app-a3d3f",
  storageBucket: "todo-app-a3d3f.appspot.com",
  messagingSenderId: "843900629392",
  appId: "1:843900629392:web:b3508d3872348b9ef20315",
  measurementId: "G-K9X3TD8M5C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
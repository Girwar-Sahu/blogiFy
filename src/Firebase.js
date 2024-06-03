import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig ={
   apiKey:"AIzaSyD6-Uw5Y9OwKEF5axc1-R_iCyKj1Ztkpg4",
   authDomain: "blogify-b7f67.firebaseapp.com",
   projectId: "blogify-b7f67",
   storageBucket:"blogify-b7f67.appspot.com",
   messagingSenderId:  "236166918466",
   appId: "1:236166918466:web:199f3a4d11f986fd6998db",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)

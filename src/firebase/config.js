// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSN7V6Yku4IHKc_vtiRW0pxz5TqayUqRo",
    authDomain: "e-commerce-lm.firebaseapp.com",
    projectId: "e-commerce-lm",
    storageBucket: "e-commerce-lm.firebasestorage.app",
    messagingSenderId: "134003585556",
    appId: "1:134003585556:web:92fceafb22278b309e6d01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
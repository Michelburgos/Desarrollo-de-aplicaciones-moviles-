// Import the functions you need from the SDKs you need
import {getAuth} from "firebase/auth"; 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCYO9Dm6qi1RTjc8gBg4lQwuVcqvp10sU",
  authDomain: "proyecto-moviles-be16a.firebaseapp.com",
  projectId: "proyecto-moviles-be16a",
  storageBucket: "proyecto-moviles-be16a.firebasestorage.app",
  messagingSenderId: "1049368573437",
  appId: "1:1049368573437:web:7dfce6b51108e216c99594",
  measurementId: "G-J3F15TW1PJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()

export {auth, analytics, app}

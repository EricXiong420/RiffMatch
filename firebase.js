// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEuozp6nlxR_bzhynD-DK45QMoDiYH82c",
  authDomain: "riffmatch-c7463.firebaseapp.com",
  projectId: "riffmatch-c7463",
  storageBucket: "riffmatch-c7463.appspot.com",
  messagingSenderId: "774297545230",
  appId: "1:774297545230:web:a5916cade25b0f44912a5f",
  measurementId: "G-H4LC95VVD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export default app;
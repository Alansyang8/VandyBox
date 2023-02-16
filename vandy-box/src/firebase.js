// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoP3bm6dodT4LqVsq1vOrW_V7jmwCXqr8",
  authDomain: "vandy-box.firebaseapp.com",
  projectId: "vandy-box",
  storageBucket: "vandy-box.appspot.com",
  messagingSenderId: "1035851981271",
  appId: "1:1035851981271:web:fa83e8aaada928e3a46b92",
  measurementId: "G-1JCC28M3GF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
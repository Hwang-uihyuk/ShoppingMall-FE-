
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBBb-gKqqhu-tdMBy3-A-rz8eCHTUT-vBM",
  authDomain: "shoppy-final.firebaseapp.com",
  databaseURL: "https://shoppy-final-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shoppy-final",
  storageBucket: "shoppy-final.appspot.com",
  messagingSenderId: "334299885394",
  appId: "1:334299885394:web:b0a9d1a5f535baef86948b",
  measurementId: "G-98TTSZ5ZYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
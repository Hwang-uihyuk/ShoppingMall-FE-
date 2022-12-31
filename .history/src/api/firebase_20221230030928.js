
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBBb-gKqqhu-tdMBy3-A-rz8eCHTUT-vBM",
  authDomain: "shoppy-final.firebaseapp.com",
  databaseURL: "https://shoppy-final-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shoppy-final",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

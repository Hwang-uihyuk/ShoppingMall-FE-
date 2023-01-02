
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";

import { v4 as uuid } from "uuid";
import { getAuth, signInWithPopup,GoogleAuthProvider,signOut,onAuthStateChanged } from "firebase/auth";
import {getDatabase ,ref,get,set} from "firebase/database"



const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);



export  function login(){
   signInWithPopup(auth, provider)
  .catch(error => console.error(error));
}

export  function logout(){
    signOut(auth).catch(console.error);
  }

  export function onUserStateChange(callback) {
    onAuthStateChanged(auth, async (user) => {
      console.log(user)
      const updatedUser = user ? await adminUser(user) : null;
      callback(updatedUser);
    });
  }

  
  //admin 유저인지 판별하는 함수
async function adminUser(user) {
    return get(ref(database, 'admins')) //
      .then((snapshot) => {
        if (snapshot.exists()) {
          const admins = snapshot.val();
          const isAdmin = admins.includes(user.uid);
          return { ...user, isAdmin };
        }
        return user;
      });
  }

  //제품관련
  export async function addNewProduct(product,imageURL){
    //제품마다 고유 아이디
    const id = uuid();
    set(ref(database,`products/${id}`),{
      ...product,
      id,
      price: parseInt(product.price),
      image:imageURL,
      options: product.options.split(',')
    })
  }
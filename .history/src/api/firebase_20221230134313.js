
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";


import { getAuth, signInWithPopup,GoogleAuthProvider,signOut,onAuthStateChanged } from "firebase/auth";



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



export  function login(){
   signInWithPopup(auth, provider)
  .catch(error => console.error(error));
}

export  function logout(){
    signOut(auth).catch(console.error);
  }

export function onUserStateChange(callback){
    onAuthStateChanged(auth, (user) => {
        // 사용자가 로그인 했을 때 admin인지 확인해야 한다.
        // 사용자가 어드민 권한을 가지고 있는지 확인한다.
        // {...user, isAdmin : true/false}
        user && adminUser(user);
        console.log(user);
        callback(user);
      });
      
}

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
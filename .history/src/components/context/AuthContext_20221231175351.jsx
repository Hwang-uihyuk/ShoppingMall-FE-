import {createContext, useContext, useEffect, useState } from "react";
import { logout, onUserStateChange } from "../../api/firebase";
import { login } from '../../../.history/src/api/firebase_20221230032648';

const AuthContext = createContext();

export function AuthContextProvier({children}){
    const [user, setUser] = useState();

    useEffect(()=>{
      onUserStateChange((user) => {
          setUser(user);
      })
    },[]) //사용자가 있는지 확인해준다. 새로고침 방지 onUserStateChange

    
    return <AuthContext.Provider value={{user, login:login, logout:logout}}>
        {children}
    </AuthContext.Provider>
}

export function useAuthContext(){
    return useContext(AuthContext)
}
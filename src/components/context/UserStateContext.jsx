import { createContext, useContext,useState,useEffect } from 'react';
import { PostLogin,LogOut } from '../../api/api';

const UserStateContext = createContext();

export function UserStateProvider({ children }) {
    const [user, setUser] = useState();
    console.log('asdf')
    return <UserStateContext.Provider value={{ user,setuser : setUser,login : PostLogin, logout:LogOut}}>
        {children}
    </UserStateContext.Provider>
}

export function useAxiosAuthContext(){
    return useContext(UserStateContext);
}
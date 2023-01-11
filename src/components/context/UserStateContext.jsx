import { createContext, useState } from 'react';
export const UserStateContext = createContext();

export function UserStateProvider({ children }) {
    const [user, setUser] = useState(false);

    return <UserStateContext.Provider value={{ user }}>
        {children}
    </UserStateContext.Provider>
}

// export function useAuthContext(){
//     return useContext()
// }
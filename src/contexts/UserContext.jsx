import { createContext, useState } from 'react';

export const UserContext = createContext({
    user: '',
    setUser: () => {}
});

export function UserProvider({children}){
    const [user, setUser] = useState('');

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
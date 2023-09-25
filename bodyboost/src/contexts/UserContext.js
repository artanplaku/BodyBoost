import { useState, createContext, useEffect } from 'react';

const initialUserState = {
    firstName: null,
    startingWeight: null,
    goalWeight: null
};

export const UserContext = createContext({
    userData: initialUserState,
    setUserData: () => {}
});

export const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(initialUserState);

    //  load initial data from local storage or an API
    // useEffect(() => {
    //     
    // }, []);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};
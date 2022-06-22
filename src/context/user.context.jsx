import { createContext, useState, useEffect, useReducer } from 'react';
import { onAuthStateChangedListener, signOutUser, createUserDocFromAuth } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

export const UserReducer = (state, action) => {
    console.log('dispatched');
    console.log(action);
    const {type, payload} = action;

    switch(type){
        case 'SET_CURRENT_USER':
            return{
                ...state,
                currentUser: payload
            }
        default:
            throw new Error (`Unhandled type ${type} in userReducer`);
    }
};

export const INITIAL_STATE = {
    currentUser: null,

}

export const UserProvider = ({children}) => {
    //const [currentUser, setCurrentUser] = useState(null);
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
    const { currentUser } = state;
    console.log(currentUser);
    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
    } 
    const value = {currentUser, setCurrentUser};
    
    //signOutUser();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener( async (user) => {
            if (user){
                await createUserDocFromAuth(user);
            }
            //console.log(user);
            setCurrentUser(user);            
        })
        return unsubscribe
    }, [])

    return <UserContext.Provider value = {value}>{children}</UserContext.Provider>
}


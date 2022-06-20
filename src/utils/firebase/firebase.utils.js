// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAuzJX9DVJ_Yn4QJwEpbTYmjal4eoZ0WE",
  authDomain: "crwn-clothing-db-b33a6.firebaseapp.com",
  projectId: "crwn-clothing-db-b33a6",
  storageBucket: "crwn-clothing-db-b33a6.appspot.com",
  messagingSenderId: "582005478861",
  appId: "1:582005478861:web:e51faba911fd7d8ffca084"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    const userExists = userSnapshot.exists();
    console.log(userExists);

    if (!userExists){
        const {displayName , email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...additionalInfo,
            })
        }
        catch (err){
            console.log("Error creating user ", err.message);
        }
    }
    
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}
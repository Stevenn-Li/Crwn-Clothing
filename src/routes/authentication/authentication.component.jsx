//import { auth, signInWithGooglePopup, signInWithGoogleRedirect,createUserDocFromAuth } from '../../utils/firebase/firebase.utils';
//import { useEffect } from 'react';
//import { getRedirectResult } from 'firebase/auth';
import './authentication.styles.scss';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
const Authentication = () => {
  
    {/*

    useEffect(() => {
        (async () => {
          const response = await getRedirectResult(auth);
          if (response) {
            const userDocRef = await createUserDocFromAuth(response.user);
          }
        })();
      }, []);

    
    const logGoogleRedirectUser = async () => {
        const {user} = await signInWithGoogleRedirect();
        //console.log(user);
    } */}

    return(
        <div className = "authentication-container">
            {/*
            <button onClick = {logGoogleUser}> Sign in with Google </button>
            <button onClick = {logGoogleRedirectUser}> Sign in with Google Redirect</button> 
            */}
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;
import { useState, useContext } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss'; 
import Button from '../button/button.component';
import { UserContext } from '../../context/user.context';
const defaultFormFields = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;

    //const { setCurrentUser } = useContext(UserContext);
    //console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //confirm passwords match
        if (password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }
        //see if user is authenticated
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocFromAuth(user, {displayName});
            //setCurrentUser(user);            
            //console.log(user);
            resetFormFields();
        }
        catch (err){
            if (err === 'auth/email-already-in-use'){
                alert('User account creatio unsuccessful, e-mail already in use');
            }
            else{
                console.log("Error ", err);
            }
        }
        //create user doc
    } 

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name] : value});
    }

    return (
        <div className = 'sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit = {handleSubmit}>
                <FormInput label = "Display Name" type = "text" required onChange = {handleChange} name = "displayName" value = {displayName}/>

                <FormInput label = "Email" type = "email" required onChange = {handleChange} name = "email" value = {email}/>

                <FormInput label = "Password" type = "password" required onChange = {handleChange} name = "password" value = {password}/>

                <FormInput label = "Confirm Password" type = "password" required onChange = {handleChange} name = "confirmPassword" value = {confirmPassword}/>
                <Button type = "submit"> Sign Up </Button>
            </form>
        </div>
    )
}

export default SignUpForm;
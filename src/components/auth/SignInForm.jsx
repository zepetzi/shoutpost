import { React, useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
// import { auth } from '../../firebase';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom'; 
import { auth } from '../../firebase';



export default function SignInForm() {

    const navigate = useNavigate();

    const { signIn, currentUser } = useAuth()

    const [signInData, setSignIn] = useState({email:"", password:""});

    const formHandle = (evt) => {
        const newName = evt.target.name
        const newValue = evt.target.value

        setSignIn(currFormData => {
            currFormData[newName] = newValue;
            return {...currFormData};
        })
    }

    const authUser = async (evt) => {
        evt.preventDefault();
        try {
            await signIn(signInData.email, signInData.password);
            
        } catch (error) {
            window.alert(error);
            console.error(error);
        }
    }
    
    useEffect( () => {
        if (currentUser) {
            window.alert(`${currentUser} signed In`);
            navigate('/profile');
        }
    },[currentUser, navigate]);
    

    const handleSignOut = async (evt) => {
        evt.preventDefault();
        try {
            signOut(auth);
            window.alert(`${currentUser} signed out`);

        } catch (error) {
            window.alert(error);
            console.error(error);
        }
    }



    return (
    <>
    <div className="signin-div">
            <h1>
                Log In
            </h1>
        <form onSubmit={authUser}>

            <input 
                type='email'
                placeholder='Email'
                value={signInData.email}
                onChange={formHandle}
                name='email'
            />   

            <input
                type='password'
                placeholder='Password'
                value={signInData.password}
                onChange={formHandle}
                name='password'
            />

            <button type="submit">Sign In</button> 
        
            <p>{currentUser ? <>Logged In</> : <>Logged Out</>}</p>
        </form>    
        <button type="submit" onClick={handleSignOut}>Log Out</button>
    </div>
    </>
    )    
}

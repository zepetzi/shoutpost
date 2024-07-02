import { React, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../firebase';

export default function SignIn() {

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
            const userCredential = await signInWithEmailAndPassword(auth, signInData.email, signInData.password);
            if (userCredential) {
                //signed in
                const user = userCredential.user;
                console.log(`${user} signed In`);
            }
        } catch (error) {
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

            <p>{<>Logged In</>}</p>
        </form>    
    </div>
    </>
    )    
}

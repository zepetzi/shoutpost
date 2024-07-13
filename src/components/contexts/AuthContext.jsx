import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

//function to create a context (obviously)
const AuthContext = createContext()

//doing useContext(Whatever context) means you want to use that context in the component you type it in
//"packaging" it as useAuth here means we can import useAuth into other components to use the states/state functions
export default function useAuth() {
    return useContext(AuthContext)
} 

//
export const AuthProvider = ({ children }) => {
    
    //make a state and state function for the child components to use later
    const [currentUser, setCurrentUser] = useState(null);

    //use useEffect so that the first time AuthContext is rendered,
    //a listener is added to auth to monitor if the user is signed in.
    //OASC returns an unsub function, that is returned within useEffect
    //which also returns it.
    useEffect(() => {
        const unsubscribeFunc = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return unsubscribeFunc;
    //[] means effect is ran only first time on component mounting
    //aka listener is only added the first time. 
    }, []);

    //create shortcut version to sign in
    function signIn(email, password) {
        signInWithEmailAndPassword(auth, email, password)
    }


    return (
        <AuthContext.Provider value={{ signIn, currentUser }}>
            { children }
        </AuthContext.Provider>
    )

}




import { useRef, useState } from 'react';
import { auth, imgStorage, imgStorageRef, functions } from '../firebase'; //firebase.js file
import { v4 as uuid} from "uuid" 
import { uploadBytes, ref } from "firebase/storage";
import { useAuth } from "./contexts/AuthContext";
import { signOut } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';


export default function CreateCanvas({  }) {

    const { signIn, currentUser } = useAuth()

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

    const handleButtonClick = async () => {
        
        if (selectedFile) {
            try {

                try{
                    
                    if (currentUser) {

                        //download user_data, check if owns canvas already
                        
                        const newCanvasID = `${uuid()}_canvas`
                
                        const newCanvasData = {
                            uploadedBy: currentUser.uid,
                            imageName: imageName,
                            thumbName: disassembledImgRef.thumbName,
                            imageWidth: returnedstatus.data.data.width,
                            imageHeight: returnedstatus.data.data.height
                        }

                        const metaRes = await imagemetagen(imgmetadata);
                        if (metaRes.data.status === 'success') {
                            window.alert(`new canvas created`)
                        }
                        

                    } else {
                        window.alert('not signed in');
                    }

                } catch (error) {
                    window.alert(error);        
                }

            } catch (error) {
                window.alert(error);      
            }
        } else {
            window.alert("No file selected");
        }

    }

    return (
        <>
        <button onClick={handleButtonClick}>Create Canvas!</button>
        <button type="submit" onClick={handleSignOut}>Log Out</button>
        </>

    )
};

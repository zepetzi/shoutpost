import { useRef, useState } from 'react';
import { auth, imgStorage, imgStorageRef, functions } from '../firebase'; //firebase.js file
import { v4 as uuid} from "uuid" 
import { useAuth } from "./contexts/AuthContext";
import { httpsCallable } from 'firebase/functions';


export default function CreateCanvas() {

    const { signIn, currentUser } = useAuth()

    const canvasgen = httpsCallable(functions, 'canvasgen');

    const handleButtonClick = async () => {

        try{
            
            if (currentUser) {

                //download user_data, check if the user owns a canvas already
                
                const newCanvasID = `${uuid()}_canvas`
        
                const newCanvasData = {
                    owner: currentUser.uid,
                    canvas_id: newCanvasID,
                }

                const canvasRes = await canvasgen(newCanvasData);
                if (canvasRes.data.status === 'success') {
                    window.alert(`new canvas created`)
                }
                

            } else {
                window.alert('not signed in');
            }

        } catch (error) {
            window.alert(error);        
        }
    }

    return (
        <>
        <button onClick={handleButtonClick}>Create Canvas!</button>
        </>

    )
};

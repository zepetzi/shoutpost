import { useRef, useState } from 'react';
import { auth, imgStorage, imgStorageRef, functions } from '../firebase'; //firebase.js file
import { v4 as uuid} from "uuid" 
import { uploadBytes, ref } from "firebase/storage";
import { useAuth } from "./contexts/AuthContext";
import { signOut } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
// import { imgmetagen } from '../../functions/src/imageMetaGen';



export default function UploadForm({ canvasID }) {

    const [selectedFile, setSelectedFile] = useState(null);
    const { signIn, currentUser } = useAuth()

    const imgmetagen = httpsCallable(functions, 'imgmetagen');

    const handleSelectFile = (evt) => {
        const addedFile = evt.target.files[0] 
        setSelectedFile(addedFile)
    };

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
                //make file URL for image preview later
                const selectedFileURL = URL.createObjectURL(selectedFile);

                try{
                    
                    if (currentUser) {
                        const newImgFileName = uuid()

                        //reference is like a pointer to a location including the name of the file, like a explorer address
                        const uploadedImgPostRef = await ref(imgStorage, `post_images/${newImgFileName}.jpg`);

                        //uplaods using a reference and the state 
                        uploadBytes(uploadedImgPostRef, selectedFile);
                        window.alert(`img uploaded! file#: ${newImgFileName}.jpg/png`)

                        //extract some data with sharp
                        const metadata = await sharp(selectedFile).metadata();


                        const data = {
                            uploadedBy: currentUser.uid,
                            imageRef: uploadedImgPostRef,
                            imageID: newImgFileName,
                            imageName: `${newImgFileName}.jpg`,
                            imageThumb: `${newImgFileName}_200x200.jpg`,
                            imageWidth: metadata.width,
                            imageHeight: metadata.height,
                            canvasID: canvasID
                        }

                        const result = imgmetagen(data);
                            

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
        <input type="file" onChange={handleSelectFile}/>
        <button onClick={handleButtonClick}>Upload</button>
        <button type="submit" onClick={handleSignOut}>Log Out</button>
        </>

    )
};

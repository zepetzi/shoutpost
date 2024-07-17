import { useRef, useState } from 'react';
import { auth, imgStorage, imgStorageRef, functions } from '../firebase'; //firebase.js file
import { v4 as uuid} from "uuid" 
import { uploadBytes, ref } from "firebase/storage";
import { useAuth } from "./contexts/AuthContext";
import { signOut } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import  sharp  from 'sharp';
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

//--------------------- need remake since sharp needs to be on server side


    const handleButtonClick = async () => {
        
        if (selectedFile) {
            try {
                //make file URL for image preview later
                const selectedFileURL = URL.createObjectURL(selectedFile);

                try{
                    
                    if (currentUser) {
                        const newImgFileName = uuid()

                        //extract some data on img with sharp
                        const metadata = await sharp(selectedFile).metadata();

                        const fullImageName =`${newImgFileName}.${metadata.format}`

                        //reference is like a pointer to a location including the name of the file, like a explorer address
                        const uploadedImgRef = ref(imgStorage, fullImageName);
                        
                        //uploads using a reference and the state 
                        uploadBytes(uploadedImgRef, selectedFile);
                        window.alert(`img uploaded! file#: ${fullImageName}`)

                        //use sharp to resize and make thumbnail
                        const createdThumb = await sharp(selectedFile).resize(200,200, {fit: 'outside'}).toBuffer()

                        //takes that same image and its ref to make a thumbnail in the thumb bucket
                        const fullThumbName = `${newImgFileName}_200x200.${metadata.format}`
                        const uploadedThumbRef = ref(thumbStorage, fullThumbName);

                        //upload thumbnail
                        uploadBytes(uploadedThumbRef, createdThumb);
                        window.alert(`thumb uploaded! file#: ${fullThumbName}`)

                        const data = {
                            uploadedBy: currentUser.uid,
                            imageRef: uploadedImgRef,
                            thumbRef: uploadedThumbRef,
                            imageID: newImgFileName,
                            imageName: fullImageName,
                            imageThumbName: fullThumbName,
                            imageWidth: metadata.width,
                            imageHeight: metadata.height,
                            canvasID: canvasID
                        }


                        // const result = imgmetagen(data);
                            

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

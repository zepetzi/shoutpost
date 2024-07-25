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

    // const imgmetagen = httpsCallable(functions, 'imgmetagen');
    const thumbnailgen = httpsCallable(functions, 'thumbnailgen');

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
                        //get file type
                        const imageType = selectedFile.type.split('/')[1];
                        
                        const newImgID = uuid()

                        //extract some data on img with sharp
                        // const metadata = await sharp(selectedFile).metadata();
                        

                        const imageName =`${newImgID}.${imageType}`

                        //reference is like a pointer to a location including the name of the file, like a explorer address

                        //    storageRef     = ref(firebase Storage Instance, path or imagename)
                        const uploadedImgRef = ref(imgStorage, imageName);

                        console.log(`${uploadedImgRef.bucket} - client`);
                        console.log(`${imageName} - client`);
                        console.log(`${uploadedImgRef.fullPath} - client`);
                        
                        //uploads using a reference and the state 
                        await uploadBytes(uploadedImgRef, selectedFile);
                        window.alert(`img uploaded! file#: ${imageName}`)

                        //disassemble the image ref into an object and send to thumbnail generator cloud function
                        const disassembledImgRef = {
                            bucketName: uploadedImgRef.bucket,
                            imageName: imageName,
                            imageRef: uploadedImgRef.fullPath, 
                            thumbName: `${newImgID}_200x200.${imageType}`
                        }
                        
                        // const uploadedThumbRef = await thumbnailgen(uploadedImgRef);
                        const uploadedThumbRef = await thumbnailgen(disassembledImgRef);
                        window.alert(`cloud function completed`)

                        
                        const imgData = {
                            uploadedBy: currentUser.uid,
                            thumbRef: uploadedThumbRef,
                            imageID: newImgID,
                            imageName: imageName,
                            // imageWidth: metadata.width,
                            // imageHeight: metadata.height,
                            canvasID: canvasID
                        }

                        // const result = imgmetagen(imgData);
                            

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
        <input type="file" onChange={handleSelectFile} accept="image/*"/>
        <button onClick={handleButtonClick}>Upload</button>
        <button type="submit" onClick={handleSignOut}>Log Out</button>
        </>

    )
};

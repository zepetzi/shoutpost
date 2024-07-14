import { useRef, useState } from 'react';
import { auth, storageRef, storage } from '../firebase';
import { v4 as uuid} from "uuid" 
import { uploadBytes, ref } from "firebase/storage";
import { useAuth } from "./contexts/AuthContext";



export default function UploadForm() {

    const [selectedFile, setSelectedFile] = useState(null);

    const { signIn, currentUser } = useAuth()

    const handleSelectFile = (evt) => {
        const addedFile = evt.target.files[0] 
        setSelectedFile(addedFile)
    };

    const handleButtonClick = async () => {
        
        if (selectedFile) {
            try {
                //make file URL for image preview
                const selectedFileURL = URL.createObjectURL(selectedFile);

                try{
                    
                    if (currentUser) {
                        const newImgFileName = uuid()
                        const uploadedImgPostRef = await ref(storage, `post_images/${newImgFileName}.jpg`);
                        uploadBytes(uploadedImgPostRef, selectedFile);
                        window.alert(`img uploaded! file#: ${newImgFileName}.jpg/png`)
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
        </>
    )
};

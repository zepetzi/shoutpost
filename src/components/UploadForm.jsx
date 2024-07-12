import { useRef, useState } from 'react';
import { auth, storageRef, storage } from '../firebase';
import { v4 as uuid} from "uuid" 
import { uploadBytes, ref } from "firebase/storage";



export default function UploadForm() {

    const [selectedFile, setSelectedFile] = useState(null);

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

                    const uploadedImgPostRef = await ref(storage, `post_images/${uuid()}.jpg`);
                    uploadBytes(uploadedImgPostRef, selectedFile);

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

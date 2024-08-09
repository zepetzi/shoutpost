import { useRef, useState } from 'react';
import { auth, imgStorage, imgStorageRef, functions } from '../firebase'; //firebase.js file
import { v4 as uuid} from "uuid" 
import { uploadBytes, ref } from "firebase/storage";
import { useAuth } from "./contexts/AuthContext";
import { signOut } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import CreateCanvas from './CreateCanvas';


const THUMB_SUFFIX = '_thumb';
const TEST_CANVAS = 'eb86254b-cfc9-4b20-9b21-21b8af518b58_canvas';

//temporary globals for testing
const canvas_id = '123123123123123'
const canvas_depth = '20'

export default function UploadForm({ canvasID }) {

    const [selectedFile, setSelectedFile] = useState(null);
    const { signIn, currentUser } = useAuth()

    const imagemetagen = httpsCallable(functions, 'imagemetagen');
    const thumbnailgen = httpsCallable(functions, 'thumbnailgen');
    const postgen = httpsCallable(functions, 'postgen')
    

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

                        const imageName =`${newImgID}.${imageType}`

                        const uploadedImgRef = ref(imgStorage, imageName);

                        //uploads using a reference and the state 
                        await uploadBytes(uploadedImgRef, selectedFile);
                        window.alert(`img uploaded! file#: ${imageName}`)

                        //disassemble the image ref into an object and send to thumbnail generator cloud function
                        const disassembledImgRef = {
                            imageName: imageName,
                            thumbName: `${newImgID}${THUMB_SUFFIX}.${imageType}`
                        }
                        
                        const thumbRes = await thumbnailgen(disassembledImgRef);
                        if (thumbRes.data.status === 'success') {
                            window.alert(`thumbnail cloud function completed`)
                        }

                        const imgmetadata = {
                            uploadedBy: currentUser.uid,
                            imageName: imageName,
                            thumbName: disassembledImgRef.thumbName,
                            imageWidth: thumbRes.data.data.width,
                            imageHeight: thumbRes.data.data.height
                        }

                        const metaRes = await imagemetagen(imgmetadata);
                        if (metaRes.data.status === 'success') {
                            window.alert(`metagen cloud function completed`)
                        } else {
                            window.alert(`error in metagen cloud function`)
                        }
                        
                        // window.alert(`postgen cloud function start`);

                        const postdata = {...imgmetadata,
                            postID: metaRes.data.data.post_id,
                            canvasID: TEST_CANVAS,
                            postCaption: "cool post brah",
                            isPromoted: false,                               
                        }
                        
                        const postRes = await postgen(postdata);
                        if (postRes.data.status === 'success') {
                            window.alert(`postgen cloud function completed`);
                        } else {
                            window.alert(`error in postgen cloud function`)
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
        <input type="file" onChange={handleSelectFile} accept="image/*"/>
        <button onClick={handleButtonClick}>Upload</button>
        <button type="submit" onClick={handleSignOut}>Log Out</button>
        <CreateCanvas></CreateCanvas>
        </>

    )
};

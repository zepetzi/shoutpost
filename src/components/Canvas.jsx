import { useEffect, useRef, useState } from 'react';
import { auth, fsdb } from '../firebase';
import { Stage, Layer, Image } from 'react-konva';
import { doc, onSnapshot } from "firebase/firestore"
// import './Canvas.css' 
import useImage from 'use-image';

//https://storage.googleapis.com/{bucket}/{name}

const TEST_CANVAS = '761ee601-074d-41a3-a417-f864abe78fc1_canvas';

export default function Canvas(){

const [posts, setPosts] = useState([]);
const [testImage] = useImage('../../public/vite.svg'); 


    useEffect(()=> { 
        try {    
            //setup listener for RT updates on image posts
            const unsub = onSnapshot(doc(fsdb, "canvases", `${TEST_CANVAS}`), (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const currentImages = docSnapshot.data().current_posts;
                    setPosts(currentImages)
                    
                }
            });
            return unsub;

        } catch(error) {
            //add error handling
        }
        
        

    }, []);

    
    
    return(
    <>
        
        <Stage width={1470} height={770}>
            <Layer>
                <Image image={testImage}></Image>
            </Layer>
        </Stage>    
        
    </>
    )

};

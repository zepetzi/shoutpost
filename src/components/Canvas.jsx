import { useRef, useState } from 'react';
import { auth, fsdb } from '../firebase';
import { Stage, Layer, Image } from 'react-konva';
import { doc, onSnapshot } from "firebase/firestore"
// import './Canvas.css' 
import useImage from 'use-image';


const TEST_CANVAS = '761ee601-074d-41a3-a417-f864abe78fc1_canvas';

export default function Canvas(){

    //setup listener for RT updates on image posts
    const unsub = onSnapshot(doc(fsdb, "canvases", `${TEST_CANVAS}`), (doc) => {
        console.log("Current data: ", doc.data().owner);
    });

    // const testURL = URL.createObjectURL('../../public/vite.svg')
    const [testImage] = useImage('../../public/vite.svg'); 

    

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

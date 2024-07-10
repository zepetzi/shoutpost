import { useRef, useState } from 'react';
import { auth } from '../firebase';
import { Stage, Layer, Image } from 'react-konva';
// import './Canvas.css' 
import useImage from 'use-image';



export default function Canvas(){

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

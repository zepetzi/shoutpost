import { useRef, useState } from 'react';
import { auth } from '../firebase';
import { Stage, Layer, Image } from 'react-konva';
import './Canvas.css' 
import useImage from 'use-image';



export default function Canvas(){

    // const testURL = URL.createObjectURL('../../public/vite.svg')
    const [testImage] = useImage('../../public/vite.svg'); 

    return(
    <>
    <div id='container'>
        <Stage width={1366} height={768}>
            <Layer>
                <Image image={testImage}></Image>
            </Layer>
        </Stage>
    </div>    
    </>
    )

};

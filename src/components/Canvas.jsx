import { useRef, useState } from 'react';
import { auth } from '../firebase';
import { Stage, Layer, Image } from 'react-konva';
import './Canvas.css' 
// import useImage from 'use-image';



export default function Canvas(){

    return(
    <>
    <div id='container'>
        <Stage width={1600} height={900}>
            {/* <Layer>
                const [image] = useImage('../../../../../../Desktop/shoutpost.jpg');
                <Image image={''}></Image>
            </Layer> */}
        </Stage>
    </div>    
    </>
    )

};

import { useRef, useState } from 'react';
import { auth } from '../firebase';
import UploadForm from '../components/UploadForm';
import Canvas from '../components/Canvas';


export default function CanvasPage() {

    return(
        <>
        <Canvas></Canvas>
        <UploadForm></UploadForm>
        </>
    )
}

import { useRef, useState } from 'react';
import { auth } from '../firebase';
import UploadForm from '../components/UploadForm';
import Canvas from '../components/Canvas';
import ScrollPosts from '../components/ScrollPosts';
import './CanvasPage.css'


export default function CanvasPage() {

    return(
        <>
        <div id='full-container'>
        
            <div id='canv-container'>
                <Canvas></Canvas>
                    <div id='upload-form'>
                    <UploadForm></UploadForm>
                    </div>
            </div>
            
            <div id='scroll-container'>
                <ScrollPosts></ScrollPosts>
            </div>

        </div>
        </>
    )
}

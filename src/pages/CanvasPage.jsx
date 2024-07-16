import { useRef, useState } from 'react';
import { auth } from '../firebase';
import UploadForm from '../components/UploadForm';
import Canvas from '../components/Canvas';
import ScrollPosts from '../components/ScrollPosts';
import NavBar from '../components/NavBar';
import CanvasTitle from '../components/CanvasTitle';
// import './CanvasPage.css'
import '../index.css';


export default function CanvasPage() {

    const canvasID = "123";

    return(
        <>
        <div id='full-container'className="border-solid border border-rose-500"> Full

            <div id='top-container'>

                <div id='nav-container' className="border-dashed border border-amber-50"><NavBar></NavBar></div>

                <div id='title-container' className="border-dashed border border-amber-50"><CanvasTitle></CanvasTitle></div>

            </div>

            <div id='bottom-container' className="border-solid border border-sky-500">

                <div id='canv-container'>
                    <Canvas></Canvas>
                        <div id='upload-form'>
                            <UploadForm canvasID={canvasID} />
                        </div>
                </div>
                
                <div id='scroll-container'>
                    <ScrollPosts></ScrollPosts>
                </div>

            </div>

        </div>


        
        </>
    )
}

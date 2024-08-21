import { useEffect, useRef, useState } from 'react';
import { auth, fsdb } from '../firebase';
import { Stage, Layer, Image } from 'react-konva';
import { doc, onSnapshot } from "firebase/firestore"
// import './Canvas.css' 
import useImage from 'use-image';
import { update } from 'firebase/database';

//https://storage.googleapis.com/{bucket}/{name}

const TEST_CANVAS = 'eb86254b-cfc9-4b20-9b21-21b8af518b58_canvas';

export default function Canvas(){

const [postArray, setPostArray] = useState([]);
const [testImage] = useImage('../../public/vite.svg'); 

const [posts, setPosts] = useState([]);
const [currPostTemp, setCurrPostTemp] = useState([]);


    useEffect(()=> { 
        try {    
            
            // do an initial grab of the current state of the canvas
            const fetchCanvas = async () => {
                //fetch the canvas doc specifically
                const canvasDoc = await doc(fsdb, "canvases", `${TEST_CANVAS}`).get();
                //then just get the current_posts array
                const postIDArray = canvasDoc.data().current_posts;
                //map through that array if of postIDs and get the post document for each one
                postIDArray.map(async(postID) => {
                    
                    const postDoc = await doc(fsdb, "posts", `${postID}`).get();

                    //add an object of the postID, thumbnail, and image to the posts state array
                    setPosts((currPosts)=>{

                        const postData = postDoc.data();
                        
                        //first create the object
                        const newPost = {
                            id: postID,
                            image: postData.image_url,
                            thumb: postData.image_thumb
                        };

                        //create new array to set the state
                        const updatedPosts = [...currPosts, newPost];

                        //now return the new array to set the state to that array
                        return updatedPosts;
                    });
                })
            }
            
            //call the fetchCanvas function to do the initial grab
            fetchCanvas();

            //now, set up the real-time listener to listen for updates
            const unsub = onSnapshot(canvasSnap(doc(fsdb, "canvases", `${TEST_CANVAS}`), (canvasSnap) => {
                if (canvasSnap.exists()) { 
                    //get the array of postIDs if it exists
                    const postIDArray = canvasSnap.data().current_posts;
                    
                    //compare new postIDArray snapshot with current array and filter out only the new posts
                    const newPostIDs = postIDArray.filter((postID) => !currPostTemp.includes(postID))
                    //compare the array of the current posts (currPostTemp) and see which posts are not in newPostIDs
                    const removedPostIDs = currPostTemp.filter((postID) => !newPostIDs.includes(postID))

                    //go through each postID and get the image and thumb url for each new one and add it to the posts state
                    newPostIDs.forEach(async(postID) => {

                        const postSnap = await doc(fsdb, "posts", `${postID}`).get();

                        const postData = postSnap.data()

                        const newPost = {
                            id: postID,
                            image: postData.image_url,
                            thumb: postData.image_thumb
                        }
                        setPosts((prevPosts) => [...prevPosts, newPost])
                    })

                    //now do the same for the removed ones:

                    //so for each postID in removedPostIDs...
                    removedPostIDs.forEach((postID) => {

                        //set the post state to...
                        setPosts((prevPosts) => {
                            //the array we get back from filtering out the removed post
                            return prevPosts.filter((postObject) => postObject.id !== postID)
                        })
                    })


                    setCurrPostTemp(postIDArray)


                }
            }));

            

            return unsub;

        } catch(error) {
            //add error handling
        }
        
        

    }, []);

    
    
    return(
    <>
        
        <Stage width={1470} height={770}>
            <Layer>
                {/* {posts.map((imageFB, index) => {
                    const [imagy] = useImage(`https://storage.googleapis.com/shoutpost-17849.appspot.com/${imageFB}`);
                    return <Image key={index}image={imagy}></Image>
                })}
                 */}
            </Layer>
        </Stage>    
        
    </>
    )

};

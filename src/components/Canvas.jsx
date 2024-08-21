import { useEffect, useRef, useState } from 'react';
import { auth, fsdb } from '../firebase';
import { Stage, Layer, Image } from 'react-konva';
import { getDoc, doc, onSnapshot } from "firebase/firestore"
// import './Canvas.css' 
import useImage from 'use-image';
import { update } from 'firebase/database';

//https://storage.googleapis.com/{bucket}/{name}

const TEST_CANVAS = 'eb86254b-cfc9-4b20-9b21-21b8af518b58_canvas';

//image rendering
const PostImage = ({ src, x_pos, y_pos }) => {
    const [image] = useImage(src);
    return <Image 
                image={image}
                x={x_pos}
                y={y_pos}
            />;
}


export default function Canvas(){

// const [testImage] = useImage('../../public/vite.svg'); 

const [posts, setPosts] = useState([]);
const [currPostTemp, setCurrPostTemp] = useState([]);


    useEffect(()=> { 
        try {    
            
            // do an initial grab of the current state of the canvas
            const fetchCanvas = async () => {
                //fetch the canvas doc specifically
                const canvasDoc = await getDoc(doc(fsdb, "canvases", TEST_CANVAS));
                //then just get the current_posts array
                const postIDArray = canvasDoc.data().current_posts;
                //map through that array if of postIDs and get the post document for each one
                postIDArray.map(async(postID) => {
                    
                    const postDoc = await getDoc(doc(fsdb, "posts", postID));

                    //add an object of the postID, thumbnail, and image to the posts state array
                    setPosts((currPosts)=>{

                        const postData = postDoc.data();
                        
                        //first create the object
                        const newPost = {
                            id: postID,
                            image: postData.image_url,
                            thumb: postData.thumb_url,
                            x: postData.x_pos,
                            y: postData.y_pos 
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

            //now, set up the real-time listener to listen for updates ------------
            const unsub = onSnapshot(doc(fsdb, "canvases", TEST_CANVAS), (canvasSnap) => {
                if (canvasSnap.exists()) { 
                    //get the array of postIDs if it exists
                    const postIDArray = canvasSnap.data().current_posts;
                    
                    //compare new postIDArray snapshot with current array and filter out only the new posts
                    const newPostIDs = postIDArray.filter((postID) => !currPostTemp.includes(postID))
                    //compare the array of the current posts (currPostTemp) and see which posts are not in newPostIDs
                    const removedPostIDs = currPostTemp.filter((postID) => !newPostIDs.includes(postID))

                    //go through each postID and get the image and thumb url for each new one and add it to the posts state
                    newPostIDs.forEach(async(postID) => {

                        const postSnap = await getDoc(doc(fsdb, "posts", postID));

                        const postData = postSnap.data()

                        const newPost = {
                            id: postID,
                            image: postData.image_url,
                            thumb: postData.image_thumb,
                            x: postData.x_pos,
                            y: postData.y_pos
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

                    //set the most recent update to the temp state to use it on the next update
                    setCurrPostTemp(postIDArray)
                }
            });

            return unsub;
            //---------------------------

        } catch(error) {
            //add more error handling
            window.alert(error);
        }
        
        

    }, []);

    return(
    <>
        
        <Stage width={1470} height={770}>
            <Layer>
                {posts.map((post) => (
                    <PostImage
                        key={post.id}
                        src={post.thumb}
                        // src={"https://storage.googleapis.com/shoutpost-17849.appspot.com/3672cefa-d21a-4a00-9af9-58ef72c8dad9.png"}
                        x_pos={post.x}
                        y_pos={post.y}
                    />
                ))}
            </Layer>
        </Stage>    
        
    </>
    )

};

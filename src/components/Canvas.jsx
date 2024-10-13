import { useEffect, useRef, useState } from 'react';
import { auth, fsdb } from '../firebase';
import { Stage, Layer, Image } from 'react-konva';
import { getDoc, doc, onSnapshot } from "firebase/firestore"
// import './Canvas.css' 
import useImage from 'use-image';

// Hardcoded canvas ID for testing purposes
const TEST_CANVAS = 'eb86254b-cfc9-4b20-9b21-21b8af518b58_canvas';

// Component to render individual post images
const PostImage = ({ src, x_pos, y_pos }) => {
    const [image] = useImage(src);
    return <Image 
                image={image}
                x={x_pos}
                y={y_pos}
            />;
}

export default function Canvas(){
    // State to store all posts
    const [posts, setPosts] = useState([]);

    useEffect(() => { 
        // Function to fetch the current posts array from the canvas document
        const fetchCanvas = async () => {
            const canvasDoc = await getDoc(doc(fsdb, "canvases", TEST_CANVAS));
            return canvasDoc.data().current_posts;
        };

        // Function to fetch detailed post data for an array of post IDs
        const fetchPosts = async (postIDs) => {
            const postPromises = postIDs.map(async(postID) => {
                const postDoc = await getDoc(doc(fsdb, "posts", postID));
                const postData = postDoc.data();
                return {
                    id: postID,
                    image: postData.image_url,
                    thumb: postData.thumb_url,
                    x: postData.x_pos,
                    y: postData.y_pos 
                };
            });
            return Promise.all(postPromises);
        };

        // Function to perform the initial data fetch
        const initialFetch = async () => {
            const initialPostIDs = await fetchCanvas();
            const initialPosts = await fetchPosts(initialPostIDs);
            setPosts(initialPosts);
        };

        // Perform initial fetch
        initialFetch();

        // Set up real-time listener for canvas updates
        const unsubscribe = onSnapshot(doc(fsdb, "canvases", TEST_CANVAS), async (canvasSnap) => {
            if (canvasSnap.exists()) {
                // Get the updated array of post IDs
                const newPostIDs = canvasSnap.data().current_posts;
                // Fetch the updated post data
                const newPosts = await fetchPosts(newPostIDs);
                // Update the posts state with the new data
                setPosts(newPosts);
            }
        });

        // Clean up function to unsubscribe from the listener when component unmounts
        return () => unsubscribe();
    }, []);

    return(
        <>
            <Stage width={1470} height={770}>
                <Layer>
                    {/* Map through posts array and render each post as a PostImage component */}
                    {posts.map((post) => (
                        <PostImage
                            key={post.id}
                            src={post.thumb}
                            x_pos={post.x}
                            y_pos={post.y}
                        />
                    ))}
                </Layer>
            </Stage>    
        </>
    )
}

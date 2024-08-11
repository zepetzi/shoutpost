const { onObjectFinalized } = require("firebase-functions/v2/storage");
const { getFirestore, app, fsdb } = require("./firebase-admin");
const { v4: uuid } = require('uuid'); 
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");
const { FieldValue } = require('firebase-admin/firestore');

const IMAGE_BUCKET_NAME = 'shoutpost-17849.appspot.com'
const THUMB_BUCKET_NAME = 'post_thumbs'





const postgen = onCall(async (request) => {
    
    console.log ("post test 1 -------------------------------------------------")

    try {

        console.log ("post test 2 -------------------------------------------------")    

        const { postID, canvasID, uploadedBy, postCaption, isPromoted, thumbName, imageName } = request.data;

        const currentCanvRef = fsdb.collection('canvases').doc(canvasID);

        postData = {
            post_id: postID,
            canvas_id: canvasID,
            user_id: uploadedBy,
            post_caption: postCaption,
            is_promoted: isPromoted,
            image_name: imageName,
            image_url: `https://storage.googleapis.com/${IMAGE_BUCKET_NAME}/${imageName}`,
            thumb_name: thumbName,
            thumb_url: `https://storage.googleapis.com/${THUMB_BUCKET_NAME}/${thumbName}`,
            created_at: FieldValue.serverTimestamp(),
            x_pos: Math.floor(Math.random() * (1300 - 0) + 0),
            y_pos: Math.floor(Math.random() * (720 - 0) + 0),
            post_comments: [],
            post_likes: [],
            post_depth: 0,
            by_canv_owner: false
        }

        //need to download document or make a snapshot and check if uploading user is canvas owner

        const postRes = await fsdb.collection('posts').doc(postID).set(postData);

        console.log ("post test 3 -------------------------------------------------")

        const unionRes = await currentCanvRef.update({
            current_posts: FieldValue.arrayUnion(`${postID}`)
        });

        return {
            status: 'success',
            message: 'post created successfully'
            };

    } catch(error) {

        console.error('Error in post data upload:', error);
        if (error instanceof HttpsError) {
            throw error;
        } else {
            throw new HttpsError('internal', 'post metadata generation failed', { originalError: error.message });
        }
    }
});

module.exports = { postgen };

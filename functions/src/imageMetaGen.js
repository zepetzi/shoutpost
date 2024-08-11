const { onObjectFinalized } = require("firebase-functions/v2/storage");
const { getFirestore, app, fsdb } = require("./firebase-admin");
const { v4: uuid } = require('uuid'); 
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");
const { FieldValue } = require('firebase-admin/firestore');

const IMAGE_BUCKET_NAME = 'shoutpost-17849.appspot.com'
const THUMB_BUCKET_NAME = 'post_thumbs'

const imagemetagen = onCall(async (request) => {

    try {

        console.log ("test 1 -------------------------------------------------"); 
    
        const { uploadedBy, imageName, thumbName, imageWidth, imageHeight } = request.data;
        if (!uploadedBy || !imageName || !thumbName || !imageWidth || !imageHeight) {
            throw new HttpsError('invalid metadata', 'one or more fields are invalid')
        }

        const data = {
            user_id: uploadedBy,
            image_name: imageName,
            image_url: `https://storage.googleapis.com/${IMAGE_BUCKET_NAME}/${imageName}`,
            thumb_name: thumbName,
            thumb_url: `https://storage.googleapis.com/${THUMB_BUCKET_NAME}/${thumbName}`,
            width: imageWidth,
            height: imageHeight,
            post_id: `${uuid()}_post`
        }

        console.log ("test 2 -------------------------------------------------"); 
        const res = await fsdb.collection('images').doc(imageName).set(data);

        return {
            status: 'success',
            message: 'img metadata created and uploaded successfully',
            data: { post_id: data.post_id }
            };

    } catch(error) {

        console.error('Error in metadata upload:', error);
        if (error instanceof HttpsError) {
            throw error;
        } else {
            throw new HttpsError('internal', 'image metadata generation failed', { originalError: error.message });
        }
    }

});

module.exports = { imagemetagen };
